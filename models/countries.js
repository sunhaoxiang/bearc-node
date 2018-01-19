const mongoose = require('mongoose')
const countrySchema = new mongoose.Schema({
  country: String
})

module.exports = function () {
  return mongoose.model('countries', countrySchema)
}
