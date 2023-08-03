const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const api = require('supertest')(require('../app'))
const Note = require('../models/note')
const User = require('../models/user')

mongoose.set('bufferTimeoutMS', 60 * 1000)

const testNote = {
  content: 'async/await simplifies making async calls',
  important: true,
}

const initialNotes = [{
  content: 'HTML is easy',
  important: false,
}, {
  content: 'Browser can execute only JavaScript',
  important: true,
}]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()
  return note._id.toString()
}

const notesInDb = async () => {
  return (await Note.find({}))
    .map(note => note.toJSON())
}

const usersInDb = async () => {
  return (await User.find({}))
    .map(user => user.toJSON())
}

const resetNotes = async () => {
  await resetUsers()
  const userId = (await usersInDb())[0].id
  await Note.deleteMany({})
  await Note.insertMany(initialNotes.map(note => {
    note.user = userId
    return note
  }))
}

const resetUsers = async () => {
  await User.deleteMany({})
  await new User({
    username: 'root',
    name: 'root',
    passwordHash: await bcrypt.hash('sekret', 10),
  }).save()
}

const login = async () => {
  const loggedIn = await api.post('/api/login').send({
    username: 'root',
    password: 'sekret',
  })
  return loggedIn.body.token
}

const closeConnection = async () => {
  await mongoose.connection.close()
}

module.exports = {
  api,
  testNote,
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
  resetNotes,
  resetUsers,
  login,
  closeConnection,
}
