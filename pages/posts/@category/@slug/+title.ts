import type { PageContext } from 'vike/types'

export function title(pageContext: PageContext) {
  const { category, slug } = pageContext.routeParams as { category: string; slug: string }
  return `${slug} | ${category} - Posts`
}
