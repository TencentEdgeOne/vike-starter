export interface SsgCard {
  title: string
  description: string
  href: string
}

export const SSG_CARDS: SsgCard[] = [
  {
    title: 'Pre-rendering',
    description:
      'Pre-render pages at build time for fast, CDN-friendly delivery. No server required at runtime.',
    href: 'https://vike.dev/pre-rendering'
  },
  {
    title: 'Static hosts',
    description: 'Deploy to GitHub Pages, Netlify, Cloudflare Pages, or any static host.',
    href: 'https://vike.dev/github-pages'
  }
]
