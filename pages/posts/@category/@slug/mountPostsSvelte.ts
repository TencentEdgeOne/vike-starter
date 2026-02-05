import type { PostsSvelteProps } from './renderPostsSvelte'

declare global {
  interface Window {
    __POSTS_SVELTE_PROPS__?: PostsSvelteProps
  }
}

export async function mountPostsSvelte(fallbackProps?: PostsSvelteProps): Promise<void> {
  const root = document.getElementById('posts-svelte-root')
  if (!root) return

  if (!window.__POSTS_SVELTE_PROPS__) {
    const scriptEl = document.getElementById('posts-svelte-props')
    if (scriptEl?.textContent) {
      try {
        window.__POSTS_SVELTE_PROPS__ = JSON.parse(scriptEl.textContent) as PostsSvelteProps
      } catch {
        // ignore
      }
    }
  }
  const props = window.__POSTS_SVELTE_PROPS__ ?? fallbackProps
  if (!props) return

  if ((root as unknown as { _svelte?: unknown })._svelte) return

  // Always load PostPage so its CSS chunk is applied (otherwise SSR HTML has no styles and can look blank).
  const PostPage = (await import('./PostPage.svelte')).default
  const hasSsrContent = root.hasChildNodes()

  if (hasSsrContent) return

  const { mount } = await import('svelte')
  const app = mount(PostPage, { target: root, props })
  ;(root as unknown as { _svelte?: unknown })._svelte = app
}
