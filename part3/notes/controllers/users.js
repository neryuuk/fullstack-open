
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.route('/').post(async ({ body }, response) => {
  const { username, name, password } = body

  if (!username) return response.status(400).json({ error: 'username is missing' })
  if (!name) return response.status(400).json({ error: 'name is missing' })
  if (!password) return response.status(400).json({ error: 'password is missing' })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const result = await new User({ username, name, passwordHash }).save()
  response.status(201).json(result)
}).get(async (_, response) => {
  const notes = await User
    .find({})
    .populate('notes', { content: 1, important: 1 })
  response.json(notes)
})

router.route('/:id').get(async ({ params }, response) => {
  const note = await User.findById(params.id)
  if (note) response.json(note)
  else response.status(404).end()
}).put(async ({ body, params }, response) => {
  const user = {
    username: body.username,
    name: body.name,
  }
  const options = {
    new: true,
    runValidators: true,
    context: 'query',
  }

  const updated = await User.findByIdAndUpdate(params.id, user, options)
  response.json(updated)
}).delete(async ({ params }, response) => {
  await User.findByIdAndRemove(params.id)
  response.status(204).end()
})

module.exports = router
