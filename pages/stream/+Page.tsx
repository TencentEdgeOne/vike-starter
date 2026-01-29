import React, { Suspense, useEffect, useState } from 'react'

// Simple Suspense resource to simulate a slower chunk
type DelayResource = {
  read(): void
}

function createDelayResource(delayMs: number): DelayResource {
  let done = false
  let promise: Promise<void> | null = null
  return {
    read() {
      if (done) return
      if (!promise) {
        promise = new Promise<void>((resolve) => {
          setTimeout(() => {
            done = true
            resolve()
          }, delayMs)
        })
      }
      throw promise
    }
  }
}

const STREAM_DELAY_MS = 1500
// Simulated size of streamed content (for demo metrics only)
const STREAM_SIZE_KB = 256

function SlowSection({ resource, onDone }: { resource: DelayResource; onDone: (t: number) => void }) {
  // Suspend until the simulated slow chunk resolves, then just signal completion
  resource.read()
  useEffect(() => {
    onDone(Date.now())
  }, [onDone])
  return null
}

function StreamingFallback({ onStart }: { onStart: (t: number) => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const duration = STREAM_DELAY_MS // match slowChunk delay for the demo
    onStart(start)
    const id = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min(99, Math.round((elapsed / duration) * 100))
      setProgress(pct)
      if (pct >= 99) {
        clearInterval(id)
      }
    }, 100)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="text-sm text-white/70">
      <p>Preparing streamed section… {progress}%</p>
      <div className="mt-3 h-1.5 w-full bg-gray-800/80 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#0debd8] via-[#02ffee] to-[#0debd8]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default function Page() {
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)

  // Per-page resource so that each visit / reload replays the streaming Suspense sequence
  const [resource] = useState<DelayResource>(() => createDelayResource(STREAM_DELAY_MS))

  const durationMs = startTime && endTime ? endTime - startTime : null
  const durationSec = durationMs != null ? durationMs / 1000 : null
  const approxSpeed =
    durationSec && durationSec > 0 ? `${(STREAM_SIZE_KB / durationSec).toFixed(1)} KB/s` : null

  return (
    <header className="relative h-screen bg-gray-950 overflow-hidden">
      {/* Same spotlight background as other pages */}
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

      <main className="relative z-10 h-full px-6 pt-28 pb-10 flex items-center">
        <div className="w-full max-w-5xl mx-auto text-white">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-[#0debd8] mb-3 text-shadow-cyan">
              Streaming
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto">
              This page is configured with HTML streaming. The top content is sent first, while slower sections are
              progressively streamed to the browser.
            </p>
            <p className="text-sm text-white/70 mt-3">
              Open this page and watch how the progress bar is sent first, then replaced once the streamed section
              finishes rendering.
            </p>
          </div>

          {/* Single card area with progress + streamed content */}
          <div className="card-glow mt-8 p-6 rounded-[2rem] border border-[#0debd8]/40 bg-gray-950/40 backdrop-blur">
            <h3 className="text-lg font-semibold text-[#0debd8] mb-2">Streaming demo</h3>
            <p className="text-sm text-white/85 mb-4">
              The progress bar below is sent with the initial HTML. The final streamed content replaces the placeholder
              once the server finishes the slow section.
            </p>
            <p className="text-xs text-white/60 mb-4">
              Streamed size (simulated): {STREAM_SIZE_KB} KB
              {durationSec != null && (
                <>
                  {' · '}total time: {durationSec.toFixed(2)} s
                </>
              )}
              {approxSpeed && <> · avg speed: {approxSpeed}</>}
            </p>

          <Suspense
            fallback={
              <StreamingFallback
                onStart={(t) => {
                  setStartTime(t)
                  setEndTime(null)
                }}
              />
            }
          >
            <SlowSection
              resource={resource}
              onDone={(t) => {
                setEndTime(t)
                setStartTime((prev) => (prev == null ? t - STREAM_DELAY_MS : prev))
              }}
            />
          </Suspense>
          </div>
        </div>
      </main>
    </header>
  )
}

