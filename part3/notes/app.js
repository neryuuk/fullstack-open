const mongoose = require('mongoose')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const { MONGODB_URI, NODE_ENV } = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const loginRouter = require('./controllers/login')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')

const app = express()

mongoose.set('strictQuery', false)
logger.info('Connecting to MongoDB')
mongoose.connect(MONGODB_URI).then(() => {
  logger.info('Connected to MongoDB')
}).catch(error => {
  logger.error('Error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())
if (NODE_ENV !== 'test') app.use(middleware.requestLogger)
app.use(express.static('build'))

app.use(middleware.tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
