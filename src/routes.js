import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      const tasks = database.select('tasks')
      res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      const task = {
        id: randomUUID(),
        title: req.body.title,
        description: req.body.description,
        completed_at: null,
        created_at: Date.now(),
        updated_at: Date.now()
      }
      database.insert('tasks', task)
      return res.writeHead(201).end()
    } 
  }
]