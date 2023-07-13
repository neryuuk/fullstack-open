const express = require('express')
const app = express()
const PORT = 3001

app.use(express.json())

let persons = [{
  "id": 1,
  "name": "Arto Hellas",
  "number": "040-123456"
}, {
  "id": 2,
  "name": "Ada Lovelace",
  "number": "39-44-5323523"
}, {
  "id": 3,
  "name": "Dan Abramov",
  "number": "12-43-234345"
}, {
  "id": 4,
  "name": "Mary Poppendieck",
  "number": "39-23-6423122"
}]

const newId = () => {
  const id = (Math.floor(1 + (Math.random() * 1024 * 4)))
  return (persons.some(person => person.id === id))
    ? newId()
    : id
}

app.route('/info').get((_, response) => {
  let data = [
    '<!DOCTYPE html><html lang="en">',
    '<head><meta charset="utf-8" /></head>',
    '<body>',
    `<p>Phonebook has info for ${persons.length} people</p>`,
    `<p>${new Date()}</p>`,
    '</body>',
    '</html>'
  ].join('')

  response.send(data)
})

app.route('/api/persons').post((request, response) => {
  const { body } = request

  if (!body.name) return response.status(400).json({ error: 'Name is empty' })
  if (!body.number) return response.status(400).json({ error: 'Number is empty' })

  const person = {
    id: newId(),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)

  response.json(person)
}).get((_, response) => {
  response.json(persons)
})

app.route('/api/persons/:id').get((request, response) => {
  const { id } = request.params
  const person = persons.find(person => person.id === Number(id))

  if (person) response.json(person)
  else response.status(404).end()
}).delete((request, response) => {
  const { id } = request.params
  persons = persons.filter(person => person.id !== Number(id))

  response.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
