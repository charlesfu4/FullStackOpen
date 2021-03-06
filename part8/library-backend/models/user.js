const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  favoriteGenre: {
    type: String,
    require: true,
  }
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model('User', schema)