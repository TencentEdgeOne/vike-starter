import { render } from 'svelte/server'
import PostPage from './PostPage.svelte'
import type { PostItem, PostWithRoute } from './postsData'

export interface PostsSvelteProps {
  category: string
  slug: string
  post: PostItem | null
  prevPost: PostWithRoute | null
  nextPost: PostWithRoute | null
}

export function renderPostsSvelte(props: PostsSvelteProps): string {
  const result = render(PostPage, { props })
  return result.body
}
