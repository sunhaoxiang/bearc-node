const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
  productName: String,
  purchasePrice: Number,
  productPrice: Number,
  productCountry: String,
  productClass: String,
})

module.exports = function () {
  return mongoose.model('goods', productSchema)
}
