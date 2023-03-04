import parse from 'csv-parser'
import fs from 'node:fs'

const csvPath = new URL('./tasks.csv', import.meta.url)

async function read() {
  const csvStream = fs.createReadStream(csvPath)
  .pipe(parse({
    delimiter: ",",
    skipEmptyLines: true,
    fromLine: 2
  }))

   for await(const line of csvStream) {
    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      body: JSON.stringify({
        title: line.title,
        description: line.description
      })
    })
  }
}

read()
