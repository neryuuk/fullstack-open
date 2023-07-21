const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const logger = require('./logger')

const logHandler = morgan('dev')

const tokenHandler = (request, _, next) => {
  const auth = request.get('authorization')
  if (auth && auth.startsWith('Bearer ')) request.token = auth.replace('Bearer ', '')
  next()
}

const authHandler = (request, response, next) => {
  const decoded = jwt.verify(request.token, process.env.SECRET)
  if (!decoded.id) return response.status(401).json({ error: 'token invalid' })
  request.body.userId = decoded.id
  next()
}

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

module.exports = {
  logHandler,
  tokenHandler,
  authHandler,
  fourOhFourHandler,
  errorHandler,
}
