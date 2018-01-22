const mongoose = require('mongoose')
const earningSchema = new mongoose.Schema({
  productName: String,
  purchasePrice: Number,
  productPrice: Number,
  sellNumber: Number,
  customerName: String,
  sellDate: Date
})

module.exports = function () {
  return mongoose.model('earnings', earningSchema)
}
