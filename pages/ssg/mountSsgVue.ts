import type { SsgCard } from './ssgCards'

export interface SsgVueProps {
  buildTimeIso: string
  cards: SsgCard[]
}

declare global {
  interface Window {
    __SSG_VUE_PROPS__?: SsgVueProps
  }
}

export async function mountSsgVue(fallbackProps?: SsgVueProps): Promise<void> {
  const root = document.getElementById('ssg-vue-root')
  if (!root) return

  if (!window.__SSG_VUE_PROPS__) {
    const scriptEl = document.getElementById('ssg-vue-props')
    if (scriptEl?.textContent) {
      try {
        window.__SSG_VUE_PROPS__ = JSON.parse(scriptEl.textContent) as SsgVueProps
      } catch {
        // ignore
      }
    }
  }
  const props = window.__SSG_VUE_PROPS__ ?? fallbackProps
  if (!props) return

  if ((root as unknown as { __vue_app__?: unknown }).__vue_app__) return

  const { createSSRApp } = await import('vue')
  const SsgPage = (await import('./SsgPage.vue')).default
  const app = createSSRApp(SsgPage, props)
  app.mount(root)
}
