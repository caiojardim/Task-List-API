import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => this.#persist())
  }

  select(table) {
    const data = this.#database[table]
    return data
  }

  insert(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }
    
    this.#persist()
  }

  update(table, id, data) {
    this.#database[table].map(task => {
      if (task.id === id) {
        let newTask = task
        newTask.title = data.title
        newTask.description = data.description
        newTask.updated_at = data.updated_at
        return newTask
      }  
      return task
    })
    this.#persist()
  }

  delete(table, id) {
    const tableWithoutDeletedOne = this.#database[table].filter(task => {
      return task.id !== id
    })
    this.#database[table] = tableWithoutDeletedOne
    this.#persist()
  }

  toggleCompletedAt(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    const rowCompletedAt = this.#database[table][rowIndex].completed_at
    const CompletedAtData = rowCompletedAt === null ? data.completed_at : null
    this.#database[table][rowIndex].completed_at = CompletedAtData
    this.#persist()
  }

  isValidID(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    if (rowIndex > -1) {
      return true
    } else {
      return false
    }
  }
}

