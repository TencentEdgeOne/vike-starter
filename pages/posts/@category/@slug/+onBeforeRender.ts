import type { OnBeforeRenderAsync } from 'vike/types'
import { getPostData } from './postsData'
import type { PostsSvelteProps } from './renderPostsSvelte'

export const onBeforeRender: OnBeforeRenderAsync = async (pageContext) => {
  const { category, slug } = (pageContext.routeParams || {}) as { category: string; slug: string }
  const { post, prevPost, nextPost } = getPostData(category, slug)
  const postsSvelteProps: PostsSvelteProps = { category, slug, post, prevPost, nextPost }
  pageContext.postsSvelteProps = postsSvelteProps

  if (import.meta.env.SSR) {
    const { renderPostsSvelte } = await import('./renderPostsSvelte')
    pageContext.postsSvelteHtml = renderPostsSvelte(postsSvelteProps)
  }
}
