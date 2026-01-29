import { usePageContext } from 'vike-react/usePageContext'

// Mock posts data for demo
const POSTS: Record<string, Record<string, { title: string; content: string; date: string }>> = {
  tech: {
    'hello-vike': {
      title: 'Getting Started with Vike',
      content: 'Vike is a modern SSR framework built on Vite. It provides file-based routing, server-side rendering, and seamless React integration.',
      date: '2025-01-15'
    },
    'react-tips': {
      title: 'React Performance Tips',
      content: 'Learn how to optimize your React applications with memoization, lazy loading, and efficient state management.',
      date: '2025-01-20'
    }
  },
  life: {
    'my-journey': {
      title: 'My Developer Journey',
      content: 'A reflection on my path from learning to code to building production applications.',
      date: '2025-01-10'
    },
    'work-life-balance': {
      title: 'Finding Balance',
      content: 'Tips for maintaining a healthy work-life balance as a software developer.',
      date: '2025-01-25'
    }
  }
}

export default function Page() {
  const pageContext = usePageContext()
  const { category, slug } = pageContext.routeParams as { category: string; slug: string }

  const categoryPosts = POSTS[category]
  const post = categoryPosts?.[slug]

  // Flatten all posts for prev/next navigation
  const allPosts = Object.entries(POSTS).flatMap(([cat, posts]) =>
    Object.entries(posts).map(([s, p]) => ({ category: cat, slug: s, ...p }))
  )
  const currentIndex = allPosts.findIndex((p) => p.category === category && p.slug === slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  return (
    <header className="relative h-screen bg-gray-950 overflow-hidden">
      {/* Spotlight background */}
      <div className="absolute inset-0 grid grid-cols-2">
        <div
          className="animate-gradientMove min-h-[120vmax] min-w-[120vmax] -translate-x-1/4 -translate-y-1/4 opacity-60 blur-[90px]"
          style={{
            background: 'radial-gradient(ellipse 70% 70% at 50% 50%, #2cc2f0 0%, #1f6986 35%, transparent 65%)'
          }}
          aria-hidden
        />
        <div
          className="animate-gradientMove2 min-h-[120vmax] min-w-[120vmax] translate-x-1/4 -translate-y-1/4 opacity-60 blur-[90px]"
          style={{
            background: 'radial-gradient(ellipse 70% 70% at 50% 50%, #02ffee 0%, #277752 35%, transparent 65%)'
          }}
          aria-hidden
        />
      </div>

      <main className="relative z-10 h-full px-6 pt-28 pb-10 flex items-center text-white">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-[#0debd8] mb-3 text-shadow-cyan">
              Posts
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto">
              Dynamic routing example: <code className="text-white/90">/posts/@category/@slug</code> renders different
              content based on URL parameters.
            </p>
            <p className="text-sm text-white/70 mt-3">
              Current path: <code className="text-[#0debd8]">/posts/{category}/{slug}</code>
            </p>
          </div>

          {/* Post content card */}
          <div className="card-glow p-6 rounded-[2rem] border border-[#0debd8]/40 bg-gray-950/40 backdrop-blur">
            {post ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-[#0debd8]/20 text-[#0debd8] border border-[#0debd8]/30">
                    {category}
                  </span>
                  <span className="text-xs text-white/50">{post.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-[#0debd8] mb-3">{post.title}</h2>
                <p className="text-white/85 leading-relaxed">{post.content}</p>

                {/* Prev / Next navigation */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                  {prevPost ? (
                    <a
                      href={`/posts/${prevPost.category}/${prevPost.slug}`}
                      className="flex items-center gap-2 text-sm text-white/70 hover:text-[#0debd8] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="hidden sm:inline">{prevPost.title}</span>
                      <span className="sm:hidden">Prev</span>
                    </a>
                  ) : (
                    <span />
                  )}
                  {nextPost ? (
                    <a
                      href={`/posts/${nextPost.category}/${nextPost.slug}`}
                      className="flex items-center gap-2 text-sm text-white/70 hover:text-[#0debd8] transition-colors"
                    >
                      <span className="hidden sm:inline">{nextPost.title}</span>
                      <span className="sm:hidden">Next</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  ) : (
                    <span />
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-white/70 mb-2">Post not found</p>
                <p className="text-sm text-white/50">
                  Category: <code>{category}</code> / Slug: <code>{slug}</code>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </header>
  )
}
