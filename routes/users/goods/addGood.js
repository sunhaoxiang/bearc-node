const express = require('express')
const router = express.Router()
const jwt = require('../../../jwt/jwt')
const goods = require('../../../models/goods')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')

module.exports = function () {
  // 添加商品
  router.post('/', (req, res, next) =>{
    let verifyToken = jwt.verify(req.headers.token)
    if (verifyToken === 'invalid') {
      statusHandler(res, -1, '登录超时')
    } else {
      goods().create({
        productName: req.body.productName,
        purchasePrice: req.body.purchasePrice,
        productPrice: req.body.productPrice,
        productCountry: req.body.productCountry,
        productType: req.body.productType
      }, (err) => {
        if (err) {
          statusHandler(res, -1, err.message)
        } else {
          statusTokenHandler(res, verifyToken, '添加成功')
        }
      })
    }
  })

  return router
}
