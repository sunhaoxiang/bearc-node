const mongoose = require('mongoose')
const Schema = mongoose.Schema
const countrySchema = new Schema({
  country: String
})

module.exports = mongoose.model('Country', countrySchema, 'countries')
