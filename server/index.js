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

    const { body, statusCode, headers } = httpResponse
    headers.forEach(([name, value]) => res.setHeader(name, value))
    res.status(statusCode).send(body)
  })

  const port = process.env.PORT ? Number(process.env.PORT) : 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}

