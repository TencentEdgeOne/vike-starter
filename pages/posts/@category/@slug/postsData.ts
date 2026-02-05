export interface PostItem {
  title: string
  content: string
  date: string
}

export interface PostWithRoute extends PostItem {
  category: string
  slug: string
}

export const POSTS: Record<string, Record<string, PostItem>> = {
  tech: {
    'hello-vike': {
      title: 'Getting Started with Vike',
      content:
        'Vike is a modern SSR framework built on Vite. It provides file-based routing, server-side rendering, and seamless React integration.',
      date: '2025-01-15'
    },
    'react-tips': {
      title: 'React Performance Tips',
      content:
        'Learn how to optimize your React applications with memoization, lazy loading, and efficient state management.',
      date: '2025-01-20'
    }
  },
  life: {
    'my-journey': {
      title: 'My Developer Journey',
      content:
        'A reflection on my path from learning to code to building production applications.',
      date: '2025-01-10'
    },
    'work-life-balance': {
      title: 'Finding Balance',
      content: 'Tips for maintaining a healthy work-life balance as a software developer.',
      date: '2025-01-25'
    }
  }
}

export function getAllPosts(): PostWithRoute[] {
  return Object.entries(POSTS).flatMap(([cat, posts]) =>
    Object.entries(posts).map(([s, p]) => ({ category: cat, slug: s, ...p }))
  )
}

export function getPostData(category: string, slug: string): {
  post: PostItem | null
  prevPost: PostWithRoute | null
  nextPost: PostWithRoute | null
} {
  const categoryPosts = POSTS[category]
  const post = categoryPosts?.[slug] ?? null
  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.category === category && p.slug === slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  return { post, prevPost, nextPost }
}
