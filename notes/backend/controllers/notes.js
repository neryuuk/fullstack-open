const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

router.route('/').post(userExtractor, async ({ body, user }, response) => {
  if (!body.content) return response.status(400).json({ error: 'content is missing' })

  const userFromDB = await User.findById(user)
  const result = await new Note({
    content: body.content,
    important: body.important || false,
    user: userFromDB.id,
  }).save()
  userFromDB.notes = userFromDB.notes.concat(result._id)
  await userFromDB.save()
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
