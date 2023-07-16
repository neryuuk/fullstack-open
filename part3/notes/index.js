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
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('build'))

app.get('/', (_, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.route('/api/notes').post(({ body }, response, next) => {
  if (!body.content) return response.status(400).json({ error: 'content is missing' })

  new Note({
    content: body.content,
    important: body.important || false,
  }).save()
    .then(result => response.json(result))
    .catch(error => next(error))
}).get((_, response, next) => {
  Note.find({})
    .then(notes => response.json(notes))
    .catch(error => next(error))
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
  const options = {
    new: true,
    runValidators: true,
    context: 'query'
  }

  Note.findByIdAndUpdate(params.id, note, options)
    .then(updated => response.json(updated))
    .catch(error => next(error))
}).delete(({ params }, response, next) => {
  Note.findByIdAndRemove(params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

app.use((error, _, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed Id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
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
    console.log('Server running on port', PORT)
  })
}).catch(error => {
  console.error('Error connecting to MongoDB:', error.message)
})
