import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = database.select('tasks')
      res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body
      if (title && description) {
        const task = {
          id: randomUUID(),
          title: title,
          description: description,
          completed_at: null,
          created_at: Date.now(),
          updated_at: Date.now()
        }
        database.insert('tasks', task)
        return res.writeHead(201).end()
      } else {
        return res.writeHead(400).end(
          JSON.stringify({message: 'title and description are required'})
        )
      }
    } 
  },{
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      if(!database.isValidID('tasks', id)) {
        return res.writeHead(400).end(
          JSON.stringify({message: 'ID invalid'})
        )
      }

      if (title && description) {
        database.update('tasks', id, {
          title,
          description,
          updated_at: Date.now()
        })

        return res.writeHead(201).end()
      } else {
        return res.writeHead(400).end(
          JSON.stringify({message: 'title and description are required'})
        )
      }
    } 
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      if(!database.isValidID('tasks', id)) {
        return res.writeHead(400).end(
          JSON.stringify({message: 'ID invalid'})
        )
      }
      
      database.delete('tasks', id)

      return res.writeHead(200).end()
    }, 
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      if(!database.isValidID('tasks', id)) {
        return res.writeHead(400).end(
          JSON.stringify({message: 'ID invalid'})
        )
      }
      
      database.toggleCompletedAt('tasks', id, {
        completed_at: Date.now()
      })

      return res.writeHead(200).end()
    }, 
  },
]