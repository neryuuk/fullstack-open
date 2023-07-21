const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const { SECRET } = require('../utils/config')
const User = require('../models/user')

router.post('/', async ({ body }, response) => {
  const { username, password } = body
  const user = await User.findOne({ username })
  const passwordCorrect = user && await bcrypt.compare(password, user.passwordHash)
  if (!passwordCorrect) return response.status(401).json({ error: 'invalid username or password' })
  const tokenOptions = [{
    username: user.username,
    id: user._id,
  }, SECRET, {
    expiresIn: 60 * 60,
  }]

  response.status(200).send({
    token: jwt.sign(...tokenOptions),
    username: user.username,
    name: user.name,
  })
})

module.exports = router
