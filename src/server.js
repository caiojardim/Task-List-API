import http from 'node:http'
import { routes } from './routes.js'

const server = http.createServer((req, res) => {

  const route = routes.find(route => {
    return route.method === req.method & route.path === req.url
  })

  if (route) {
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)

