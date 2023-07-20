const jwt = require('jsonwebtoken')
const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  return (authorization && authorization.startsWith('Bearer '))
    ? authorization.replace('Bearer ', '')
    : null
}

router.route('/').post(async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (!request.body.content) return response.status(400).json({ error: 'content is missing' })

  const user = await User.findById(request.body.userId)
  const result = await new Note({
    content: request.body.content,
    important: request.body.important || false,
    user: user.id,
  }).save()
  user.notes = user.notes.concat(result._id)
  await user.save()
  response.status(201).json(result)
}).get(async (_, response) => {
  const notes = await Note
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(notes)
})

router.route('/:id').get(async ({ params }, response) => {
  const note = await Note.findById(params.id)
  if (note) response.json(note)
  else response.status(404).end()
}).put(async ({ body, params }, response) => {
  const note = {
    content: body.content,
    important: body.important,
  }
  const options = {
    new: true,
    runValidators: true,
    context: 'query',
  }

  const updated = await Note.findByIdAndUpdate(params.id, note, options)
  response.json(updated)
}).delete(async ({ params }, response) => {
  await Note.findByIdAndRemove(params.id)
  response.status(204).end()
})

module.exports = router
