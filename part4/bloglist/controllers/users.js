const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.route('/').post(async ({ body }, response) => {
  const { username, name, password } = body

  if (!username) return response.status(400).json({ error: 'username is missing' })
  if (!name) return response.status(400).json({ error: 'name is missing' })
  if (!password) return response.status(400).json({ error: 'password is missing' })
  if (username.length < 3) return response.status(400).json({ error: 'username must be 3 or more characters long' })
  if (password.length < 3) return response.status(400).json({ error: 'password must be 3 or more characters long' })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const result = await new User({ username, name, passwordHash }).save()
  response.status(201).json(result)
}).get(async (_, response) => {
  const result = await User
    .find({})
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(result)
})

module.exports = router
