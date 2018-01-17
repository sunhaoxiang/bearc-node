const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({
  username: String,
  password: String
})

module.exports = function () {
  return mongoose.model('users', usersSchema)
}
