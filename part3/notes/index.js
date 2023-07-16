require('dotenv').config()
require('./myip')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Note = require('./models/notes')
const app = express()
const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI.replace('[[DB]]', 'noteApp')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (_, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.route('/api/notes').post(({ body }, response) => {
  if (!body.content) return response.status(400).json({ error: 'content is missing' })

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(result => response.json(result))
}).get((_, response) => {
  Note.find({}).then(notes => response.json(notes))
})

app.route('/api/notes/:id').get(({ params }, response, next) => {
  Note.findById(params.id).then(note => {
    if (note) response.json(note)
    else next()
  }).catch(error => next(error))
}).put(({ body, params }, response, next) => {
  const note = {
    content: body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(params.id, note, { new: true }).then(updated => {
    response.json(updated)
  }).catch(error => next(error))
}).delete(({ params }, response, next) => {
  Note.findByIdAndRemove(params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

app.use((error, _, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed Id' })
  }

  next(error)
})

app.use((_, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
})

mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI).then((_) => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}).catch(error => {
  console.error('Error connecting to MongoDB:', error.message)
})
