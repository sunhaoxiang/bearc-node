const mongoose = require('mongoose')
const customerSchema = new mongoose.Schema({
  customerName: String,
  customerPhone: String,
  customerAddress: String
})

module.exports = function () {
  return mongoose.model('customers', customerSchema)
}
