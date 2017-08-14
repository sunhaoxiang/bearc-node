const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
  productName: String,
  productImgSrc: String,
  productPrice: Number,
  productDiscountPrice: Number,
  productCountry: String,
  hot: Boolean
})

module.exports = mongoose.model('Good', productSchema, 'goods')
