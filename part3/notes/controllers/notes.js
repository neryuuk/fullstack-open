const router = require('express').Router()
const Note = require('../models/note')

router.route('/').post(({ body }, response, next) => {
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

router.route('/:id').get(({ params }, response, next) => {
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

module.exports = router
