import { useEffect, useState } from 'react'
import type { HelloResponse } from '../../shared/api'

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<HelloResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function callHello() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/hello')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = (await res.json()) as HelloResponse
      setData(json)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  // Call API once on load
  useEffect(() => {
    void callHello()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <header className="relative h-screen bg-gray-950 overflow-hidden">
      {/* Spotlight background like other pages */}
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
              Interface
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto">
              Typed API example: <code className="text-white/90">GET /api/hello</code> returns a{' '}
              <code className="text-white/90">HelloResponse</code> object shared between server and client.
            </p>
            <p className="text-sm text-white/70 mt-3">
              Learn more about API routes on{' '}
              <a
                href="https://vike.dev/api-routes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0debd8] hover:underline"
              >
                vike.dev
              </a>
              .
            </p>
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={callHello}
                disabled={loading}
                className="nav-pill w-40 text-[11px] leading-tight disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading…' : 'Call /api/hello'}
              </button>
            </div>
          </div>

          {/* Single card: only shows API response JSON */}          
          <div className="card-glow p-6 rounded-[2rem] border border-[#0debd8]/40 bg-gray-950/40 backdrop-blur min-h-[140px]">
            {error && <p className="text-sm text-red-300">Error: {error}</p>}
            {data && (
              <pre className="text-xs overflow-auto">
{JSON.stringify(data, null, 2)}
              </pre>
            )}
            {!error && !data && (
              <p className="text-sm text-white/70">
                Click the button above to fetch JSON from the server.
              </p>
            )}
          </div>
        </div>
      </main>
    </header>
  )
}
