const express = require('express')
const router = express.Router()
const goods = require('../../../models/goods')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')
const { verifyTokenPostHandler } = require('../../../lib/verifyTokenHandler')

module.exports = function () {
  // 修改商品
  router.post('/', (req, res, next) =>{
    verifyTokenPostHandler(req, res, next, (verifyToken) => {
      goods().update({
        _id: req.body._id
      }, {
        productName: req.body.productName,
        purchasePrice: req.body.purchasePrice,
        productPrice: req.body.productPrice,
        productCountry: req.body.productCountry,
        productType: req.body.productType
      }, (err) => {
        if (err) {
          statusHandler(res, 500, err.message)
        } else {
          statusTokenHandler(res, verifyToken, '修改成功')
        }
      })
    })
  })

  return router
}
