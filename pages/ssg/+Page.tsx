/**
 * SSG 页面内容由 Vue (SsgPage.vue) 实现。
 * 本文件是 Vike 默认 React 壳层：仅负责挂载 Vue 的 SSR HTML 并做客户端 hydration。
 * 与 posts 页一致：passToClient、专用 HTML script、恢复逻辑、独立 CSS，避免内容空白。
 */
import React, { useEffect, useMemo, useRef } from 'react'
import { useData } from 'vike-react/useData'
import { usePageContext } from 'vike-react/usePageContext'
import { SSG_CARDS } from './ssgCards'
import { mountSsgVue } from './mountSsgVue'
import './ssg-page.css'

function getSsgVueHtmlFromScript(): string | undefined {
  if (typeof document === 'undefined') return undefined
  try {
    const dedicated = document.getElementById('ssg-vue-html')
    if (dedicated?.textContent) {
      return JSON.parse(dedicated.textContent) as string
    }
    const el = document.getElementById('vike_pageContext')
    if (el?.textContent) {
      const parsed = JSON.parse(el.textContent) as { ssgVueHtml?: string }
      return parsed.ssgVueHtml
    }
  } catch {
    // ignore
  }
  return undefined
}

export default function Page() {
  const pageContext = usePageContext()
  const data = useData<{ buildTime: string }>()
  const fromContext = (pageContext as { ssgVueHtml?: string }).ssgVueHtml
  const fromScript = useMemo(getSsgVueHtmlFromScript, [])
  const ssgVueHtml = fromContext ?? fromScript
  const ssgVueProps = (pageContext as { ssgVueProps?: { buildTimeIso: string; cards: typeof SSG_CARDS } }).ssgVueProps
  const restoredRef = useRef(false)

  useEffect(() => {
    mountSsgVue(
      ssgVueProps ?? (data ? { buildTimeIso: data.buildTime, cards: SSG_CARDS } : undefined)
    )
  }, [ssgVueProps, data])

  // If hydration cleared the root (ssgVueHtml was undefined on first paint), restore from script (same as posts)
  useEffect(() => {
    const root = document.getElementById('ssg-vue-root')
    if (!root || restoredRef.current) return
    if (!root.hasChildNodes() || root.textContent?.trim() === '') {
      const html = getSsgVueHtmlFromScript()
      if (html) {
        root.innerHTML = html
        restoredRef.current = true
      }
    }
  }, [])

  const htmlForScript = fromContext ?? ssgVueHtml
  return (
    <div className="relative h-screen bg-gray-950 overflow-hidden">
      {htmlForScript != null && (
        <script
          type="application/json"
          id="ssg-vue-html"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(htmlForScript).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')
          }}
        />
      )}
      {ssgVueProps != null && (
        <script
          type="application/json"
          id="ssg-vue-props"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ssgVueProps).replace(/</g, '\\u003c')
          }}
        />
      )}
      <div
        id="ssg-vue-root"
        className="h-full min-h-screen"
        suppressHydrationWarning
        dangerouslySetInnerHTML={ssgVueHtml ? { __html: ssgVueHtml } : undefined}
      />
    </div>
  )
}
