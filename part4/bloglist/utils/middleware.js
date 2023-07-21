const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const logger = require('./logger')

const logHandler = morgan('dev')

const fourOhFourHandler = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed Id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

const authHandler = (request, response, next) => {
  const authorization = request.get('authorization')
  const token = authorization && authorization.startsWith('Bearer ') && authorization.replace('Bearer ', '')
  const decoded = jwt.verify(token, process.env.SECRET)
  if (!decoded.id) return response.status(401).json({ error: 'token invalid' })
  request.body.userId = decoded.id
  next()
}

module.exports = { logHandler, fourOhFourHandler, errorHandler, authHandler }
