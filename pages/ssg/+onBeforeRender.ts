import type { OnBeforeRenderAsync } from 'vike/types'
import { SSG_CARDS } from './ssgCards'

export const onBeforeRender: OnBeforeRenderAsync = async (pageContext) => {
  const buildTimeIso =
    (pageContext.data as { buildTime?: string } | undefined)?.buildTime ??
    new Date().toISOString()
  const ssgVueProps = { buildTimeIso, cards: SSG_CARDS }
  pageContext.ssgVueProps = ssgVueProps

  if (import.meta.env.SSR) {
    const { renderSsgVue } = await import('./renderSsgVue')
    pageContext.ssgVueHtml = await renderSsgVue(ssgVueProps)
  }
}
