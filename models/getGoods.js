const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
  productName: String,
  productImgSrc: String,
  productPrice: Number,
  productDiscountPrice: Number,
  productCountry: String,
  productClass: String,
  hot: Boolean
})

module.exports = function () {
  return mongoose.model('getGoods', productSchema, 'goods')
}
