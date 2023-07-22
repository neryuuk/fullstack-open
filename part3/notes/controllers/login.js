const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')
const { SECRET } = require('../utils/config')

router.post('/', async ({ body }, response) => {
  const { username, password } = body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const payload = { username: user.username, id: user._id }
  const options = { expiresIn: 60 * 60 }
  response.status(200).send({
    token: jwt.sign(payload, SECRET, options),
    username: user.username,
    name: user.name,
  })
})

module.exports = router
