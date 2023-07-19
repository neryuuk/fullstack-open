const router = require('express').Router()
const Note = require('../models/note')

router.route('/').post(async ({ body }, response) => {
  if (!body.content) return response.status(400).json({ error: 'content is missing' })

  const result = await new Note({
    content: body.content,
    important: body.important || false,
  }).save()
  response.status(201).json(result)
}).get(async (_, response) => {
  const notes = await Note.find({})
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
