const Note = require('../models/note')
const User = require('../models/user')

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

module.exports = { initialNotes, nonExistingId, notesInDb, usersInDb }
