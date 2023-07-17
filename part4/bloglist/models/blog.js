const mongoose = require('mongoose')

module.exports = mongoose.model('Blog', new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
}).set('toJSON', {
  transform: (_, result) => {
    result.id = result._id.toString()
    delete result._id
    delete result.__v
  }
}))
