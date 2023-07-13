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

app.route('/api/persons').get((_, response) => {
  response.json(persons)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
