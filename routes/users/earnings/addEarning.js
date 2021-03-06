const express = require('express')
const router = express.Router()
const earnings = require('../../../models/earnings')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')
const { verifyTokenPostHandler } = require('../../../lib/verifyTokenHandler')

module.exports = function () {
  // 添加收入
  router.post('/', (req, res, next) =>{
    verifyTokenPostHandler(req, res, next, (verifyToken) => {
      earnings().create({
        productName: req.body.productName,
        purchasePrice: req.body.purchasePrice,
        productPrice: req.body.productPrice,
        sellNumber: req.body.sellNumber,
        expressFee: req.body.expressFee,
        customerName: req.body.customerName,
        sellDate: req.body.sellDate
      }, (err) => {
        if (err) {
          statusHandler(res, 500, err.message)
        } else {
          statusTokenHandler(res, verifyToken, '添加成功')
        }
      })
    })
  })

  return router
}
