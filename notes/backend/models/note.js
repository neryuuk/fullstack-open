const mongoose = require('mongoose')

module.exports = mongoose.model('Note', new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}).set('toJSON', {
  transform: (_, result) => {
    result.id = result._id.toString()
    if (result?.user) result.user = JSON.parse(JSON.stringify(result.user))
    delete result._id
    delete result.__v
  },
}))
