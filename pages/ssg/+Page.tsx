import { useData } from 'vike-react/useData'

const SSG_CARDS = [
  {
    title: 'Pre-rendering',
    description: 'Pre-render pages at build time for fast, CDN-friendly delivery. No server required at runtime.',
    href: 'https://vike.dev/pre-rendering'
  },
  {
    title: 'Static hosts',
    description: 'Deploy to GitHub Pages, Netlify, Cloudflare Pages, or any static host.',
    href: 'https://vike.dev/github-pages'
  }
]

export default function Page() {
  const data = useData<{ buildTime: string }>()
  const buildTimeIso = data?.buildTime ?? ''
  const buildTime = buildTimeIso
    ? new Date(buildTimeIso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'long' })
    : '—'

  return (
    <header className="relative h-screen bg-gray-950 overflow-hidden">
      {/* Same spotlight background as the SSR home hero */}
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

      {/* Match the SSR hero layout: top padding for fixed navbar + vertical centering */}
      <main className="relative z-10 h-full px-6 pt-28 pb-10 flex items-center">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-7xl font-bold text-[#0debd8] mb-3 text-shadow-cyan">
              SSG
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto">
              This page is statically generated — a Vike SSG example for EdgeOne Pages.
            </p>
            <p className="text-sm text-white/70 mt-2">
              Generated at:{' '}
              <time dateTime={buildTimeIso}>{buildTime}</time>
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {SSG_CARDS.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-glow block p-6 rounded-[2rem] border border-[#0debd8]/40 bg-gray-950/40 backdrop-blur hover:border-[#0debd8]"
              >
                <h3 className="text-lg font-semibold text-[#0debd8] mb-2">{card.title}</h3>
                <p className="text-sm text-white/85">{card.description}</p>
                <span className="inline-block mt-4 text-sm text-[#0debd8]">Read on vike.dev →</span>
              </a>
            ))}
          </div>
        </div>
      </main>
    </header>
  )
}
