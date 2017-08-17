const mongoose = require('mongoose')
const countrySchema = new mongoose.Schema({
  country: String
})

module.exports = mongoose.model('getCountres', countrySchema, 'countries')
