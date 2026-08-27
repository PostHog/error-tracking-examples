// Static server for dist/web-angular-sw/browser on http://localhost:8082.
// Serves the files as they are on disk — which is the whole point: the
// service worker hashes what it fetches from here against ngsw.json.
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const root = join(process.cwd(), 'dist', 'web-angular-sw', 'browser')
const port = Number(process.env.PORT ?? 8082)
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.map': 'application/json',
  '.json': 'application/json',
  '.css': 'text/css',
  '.ico': 'image/x-icon',
}

createServer(async (req, res) => {
  const path = req.url === '/' ? '/index.html' : req.url.split('?')[0]
  try {
    const data = await readFile(join(root, normalize(path)))
    res.writeHead(200, {
      'content-type': types[extname(path)] ?? 'application/octet-stream',
      // Never let the browser HTTP cache mask what the service worker sees.
      'cache-control': 'no-store',
    })
    res.end(data)
  } catch {
    res.writeHead(404)
    res.end('not found')
  }
}).listen(port, () => console.log(`serving http://localhost:${port}`))
