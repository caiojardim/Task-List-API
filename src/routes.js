export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      res.end('Hello World')
    }
  }
]