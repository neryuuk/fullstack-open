require('dotenv').config()
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/people')
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(morgan(function (tokens, request, response) {
  const method = tokens['method'](request, response)
  const status = ((typeof response.headersSent) !== 'boolean' ? Boolean(response.header) : response.headersSent)
    ? response.statusCode
    : undefined
  let color = 0
  if (status >= 500) color = 31
  else if (status >= 400) color = 33
  else if (status >= 300) color = 36
  else if (status >= 200) color = 32

  const log = [method, tokens['url'](request, response)]
  if (status) log.push(`\x1b[${color}m${status}\x1b[0m`)
  if (tokens['response-time'](request, response)) log.push(`${tokens['response-time'](request, response)}ms`)
  if (tokens['res'](request, response, 'content-length')) log.push('-', tokens['res'](request, response, 'content-length'))
  if (['POST', 'PUT'].includes(`${method}`)) log.push(JSON.stringify(request.body))

  return log.join(' ')
}))
app.use(express.static('build'))

app.route('/info').get((_, response, next) => {
  Person.countDocuments({}).then(count => {
    response.send([
      '<!DOCTYPE html><html lang="en">',
      '<head><meta charset="utf-8" /></head>',
      '<body>',
      `<p>Phonebook has info for ${count} people</p>`,
      `<p>${new Date()}</p>`,
      '</body>',
      '</html>'
    ].join(''))
  }).catch(error => next(error))
})

app.route('/api/persons').post(({ body }, response, next) => {
  if (!body.name) return response.status(400).json({ error: 'Name field is empty' })
  if (!body.number) return response.status(400).json({ error: 'Number field is empty' })

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(result => response.json(result))
    .catch(error => next(error))
}).get((_, response, next) => {
  Person.find({})
    .then(people => response.json(people))
    .catch(error => next(error))
})

app.route('/api/persons/:id').get(({ params }, response, next) => {
  Person.findById(params.id).then(person => {
    if (person) response.json(person)
    else response.status(404).end()
  }).catch(error => next(error))
}).put(({ params, body }, response, next) => {
  const person = {
    name: body.name,
    number: body.number
  }
  const options = {
    new: true,
    runValidators: true,
    context: 'query'
  }

  Person.findByIdAndUpdate(params.id, person, options)
    .then(result => response.json(result))
    .catch(error => next(error))
}).delete(({ params }, response, next) => {
  Person.findByIdAndRemove(params.id).then(() => {
    response.status(204).end()
  }).catch(error => next(error))
})

app.use((error, _, response, next) => {
  console.error(error.name, error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed Id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
})

app.use((_, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
