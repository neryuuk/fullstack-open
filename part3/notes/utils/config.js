require('dotenv').config()

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI.replace('[[DB]]', 'noteApp')

module.exports = {
  MONGODB_URI,
  PORT
}
