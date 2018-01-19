const express = require('express')
const router = express.Router()
const jwt = require('../../../jwt/jwt')
const goods = require('../../../models/goods')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')

module.exports = function () {
  // 修改商品
  router.post('/', (req, res, next) =>{
    let verifyToken = jwt.verify(req.body.token)
    if (verifyToken === 'invalid') {
      statusHandler(res, -1, '登录超时')
    } else {
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
          statusHandler(res, -1, err.message)
        } else {
          statusTokenHandler(res, verifyToken, '修改成功')
        }
      })
    }
  })

  return router
}
