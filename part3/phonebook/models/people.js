const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI.replace('[[DB]]', 'phonebook')

mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI).then(() => {
  console.log('Connected to MongoDB')
}).catch(error => {
  console.error('Error connecting to MongoDB:', error.message)
})

const schema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'Name field is empty']
  },
  number: {
    type: String,
    validate: {
      validator: data => ((data.length >= 8) && /^\d{2,3}-\d{4,}$/.test(data)),
      message: () => 'Invalid phone number! Number must follow format 00-00000 or 000-0000 (8+ characters)'
    },
    required: [true, 'Number field is empty']
  }
}).set('toJSON', {
  transform: (_, result) => {
    result.id = result._id.toString()
    delete result._id
    delete result.__v
  }
})

module.exports = mongoose.model('Person', schema)
