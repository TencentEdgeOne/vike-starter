import express from 'express'
import { renderPage, createDevMiddleware } from 'vike/server'
import path from 'path'
import { fileURLToPath } from 'url'

const isProduction = process.env.NODE_ENV === 'production'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')
const outDir = 'dist'

startServer()

async function startServer() {
  const app = express()

  // Example API route (interface demo)
  app.get('/api/hello', (req, res) => {
    res.json({
      message: 'Hello from /api/hello',
      now: new Date().toISOString(),
      path: req.path,
      method: req.method,
      random: Math.random()
    })
  })

  // Dev/prod middleware
  if (!isProduction) {
    const { devMiddleware } = await createDevMiddleware({ root })
    app.use(devMiddleware)
  } else {
    app.use(express.static(path.join(root, outDir, 'client')))
  }

  // SSR middleware (catch-all; must be last)
  app.get('*', async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      headersOriginal: req.headers
    }

    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext

    if (!httpResponse) return next()

    const { statusCode, headers } = httpResponse
    headers.forEach(([name, value]) => res.setHeader(name, value))

    // When streaming is enabled, vike-react provides a Node.js stream (pipe()) instead of body.
    if (typeof httpResponse.pipe === 'function') {
      res.status(statusCode)
      httpResponse.pipe(res)
    } else {
      // Non-streaming responses still expose `body`
      const body = httpResponse.body
      res.status(statusCode).send(body)
    }
  })

  const port = process.env.PORT ? Number(process.env.PORT) : 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}

