require('dotenv').config()

const PORT = process.env.PORT || 3003
const NODE_ENV = (process.env.NODE_ENV || 'development')
const DB = NODE_ENV === 'test' ? 'testNoteApp' : 'noteApp'
const MONGODB_URI = process.env.MONGODB_URI.replace('[[DB]]', DB)

module.exports = { MONGODB_URI, PORT, NODE_ENV }
