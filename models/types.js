const mongoose = require('mongoose')
const typeSchema = new mongoose.Schema({
  type: String
})

module.exports = function () {
  return mongoose.model('types', typeSchema)
}
