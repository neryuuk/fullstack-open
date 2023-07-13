const express = require('express')
const app = express()

app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

const generateId = () => {
  return (notes.length > 0)
    ? Math.max(...notes.map(n => n.id)) + 1
    : 1
}

app.route('/api/notes').post((request, response) => {
  const { body } = request

  if (!body.content) return response.status(400).json({ error: 'content is missing' })

  const note = {
    id: generateId(),
    content: body.content,
    important: body.important || false
  }
  notes = notes.concat(note)

  response.json(note)
}).get((request, response) => {
  response.json(notes)
})

app.route('/api/notes/:id').get((request, response) => {
  const { id } = request.params
  const note = notes.find(note => note.id === +id)
  if (note) response.json(note)
  else response.status(404).end()
}).delete((request, response) => {
  const { id } = request.params
  notes = notes.filter(note => note.id !== +id)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
