const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hotSchema = new Schema({
  productName: String,
  productPrice: Number
})

module.exports = function () {
  mongoose.model('Good', hotSchema)
}