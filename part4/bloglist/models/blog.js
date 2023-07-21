const mongoose = require('mongoose')

module.exports = mongoose.model('Blog', new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}).set('toJSON', {
  transform: (_, result) => {
    result.id = result._id.toString()
    delete result._id
    delete result.__v
  },
}))
