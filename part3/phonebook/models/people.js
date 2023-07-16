const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI.replace('[[DB]]', 'phonebook')

mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI).then((_) => {
  console.log('Connected to MongoDB')
}).catch(error => {
  console.error('Error connecting to MongoDB:', error.message)
})

const schema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: String
}).set('toJSON', {
  transform: (_, result) => {
    result.id = result._id.toString()
    delete result._id
    delete result.__v
  }
})

module.exports = mongoose.model('Person', schema)
