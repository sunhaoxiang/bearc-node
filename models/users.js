const mongoose = require('mongoose')
const loginSchema = new mongoose.Schema({
  username: String,
  password: String
})

module.exports = function () {
  return mongoose.model('users', loginSchema, 'users')
}
