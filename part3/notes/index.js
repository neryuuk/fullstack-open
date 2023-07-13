const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT || 3001

const generateId = () => {
  return (notes.length > 0)
    ? Math.max(...notes.map(n => n.id)) + 1
    : 1
}

const unknown = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('dev'))

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

app.get('/', (_, response) => {
  response.send('<h1>Hello World!</h1>')
})

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
}).get((_, response) => {
  response.json(notes)
})

app.route('/api/notes/:id').get((request, response, next) => {
  const { id } = request.params
  const note = notes.find(note => note.id === +id)
  if (note) response.json(note)
  else next()
}).delete((request, response) => {
  const { id } = request.params
  notes = notes.filter(note => note.id !== +id)
  response.status(204).end()
})

app.use(unknown)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
