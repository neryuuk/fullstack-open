const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
}).set('toJSON', {
  transform: (_, result) => {
    result.id = result._id.toString()
    delete result._id
    delete result.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
