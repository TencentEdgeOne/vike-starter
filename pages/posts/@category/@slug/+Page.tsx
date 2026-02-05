import React, { useEffect, useMemo, useRef } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { getPostData } from './postsData'
import { mountPostsSvelte } from './mountPostsSvelte'
import type { PostsSvelteProps } from './renderPostsSvelte'
import './posts-page.css'

function getHtmlFromScript(): string | undefined {
  if (typeof document === 'undefined') return undefined
  try {
    const el = document.getElementById('posts-svelte-html')
    const raw = el?.textContent?.trim()
    return raw ? (JSON.parse(raw) as string) : undefined
  } catch {
    return undefined
  }
}

export default function Page() {
  const pageContext = usePageContext()
  const { category, slug } = (pageContext?.routeParams || {}) as { category: string; slug: string }
  const serverHtml = (pageContext as { postsSvelteHtml?: string }).postsSvelteHtml
  const postsSvelteProps = (pageContext as { postsSvelteProps?: PostsSvelteProps }).postsSvelteProps
  const restoredRef = useRef(false)

  const postsSvelteHtml = useMemo(() => {
    if (serverHtml != null && serverHtml !== '') return serverHtml
    return getHtmlFromScript()
  }, [serverHtml])

  useEffect(() => {
    const fallback =
      postsSvelteProps ??
      (() => {
        const { post, prevPost, nextPost } = getPostData(category, slug)
        return { category, slug, post, prevPost, nextPost }
      })()
    mountPostsSvelte(fallback)
  }, [postsSvelteProps, category, slug])

  // If hydration cleared the root (postsSvelteHtml was undefined on first paint), restore from script
  useEffect(() => {
    const root = document.getElementById('posts-svelte-root')
    if (!root || restoredRef.current) return
    if (!root.hasChildNodes() || root.textContent?.trim() === '') {
      const html = getHtmlFromScript()
      if (html) {
        root.innerHTML = html
        restoredRef.current = true
      }
    }
  }, [])

  // Keep script in client tree when we have HTML so it isn't removed by hydration (needed for restore fallback)
  const htmlForScript = serverHtml ?? postsSvelteHtml
  return (
    <div className="relative h-screen bg-gray-950 overflow-hidden">
      {htmlForScript != null && (
        <script
          type="application/json"
          id="posts-svelte-html"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(htmlForScript).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')
          }}
        />
      )}
      {postsSvelteProps != null && (
        <script
          type="application/json"
          id="posts-svelte-props"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(postsSvelteProps).replace(/</g, '\\u003c')
          }}
        />
      )}
      <div
        id="posts-svelte-root"
        className="h-full min-h-screen"
        suppressHydrationWarning
        dangerouslySetInnerHTML={postsSvelteHtml != null ? { __html: postsSvelteHtml } : undefined}
      />
    </div>
  )
}
