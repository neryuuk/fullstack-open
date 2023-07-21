const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

module.exports = mongoose.model('User', new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
  }],
}).set('toJSON', {
  transform: (_, result) => {
    result.id = result._id.toString()
    delete result._id
    delete result.__v
    delete result.passwordHash
  },
}).plugin(uniqueValidator))
