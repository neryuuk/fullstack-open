require('dotenv').config()
require('./myip')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Note = require('./models/notes')
const app = express()
const PORT = process.env.PORT || 3001

const unknown = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (_, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.route('/api/notes').post((request, response) => {
  const { body } = request

  if (!body.content) return response.status(400).json({ error: 'content is missing' })

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(result => {
    response.json(result)
  })
}).get((_, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.route('/api/notes/:id').get((request, response, next) => {
  Note.findById(request.params.id).then(note => {
    if (note) response.json(note)
    else next()
  })
}).delete((request, response) => {
  const { id } = request.params
  notes = notes.filter(note => note.id !== +id)
  response.status(204).end()
})

app.use(unknown)

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI).then((_) => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}).catch(error => {
  console.error('Error connecting to MongoDB:', error.message)
})
