const express = require('express')
const router = express.Router()
const goods = require('../../../models/goods')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')
const { verifyTokenGetHandler } = require('../../../lib/verifyTokenHandler')

module.exports = function () {
  // 商品列表
  router.get('/', (req, res, next) =>{
    verifyTokenGetHandler(req, res, next, (verifyToken) => {
      goods().find({}, {
        _id: 1,
        productName: 1,
        purchasePrice: 1,
        productPrice: 1,
        productCountry: 1,
        productType: 1
      }, (err, doc) => {
        if (err) {
          statusHandler(res, -1, err.message)
        } else {
          statusTokenHandler(res, verifyToken, '查询成功', {
            count: doc.length,
            list: doc
          })
        }
      })
    })
  })

  return router
}
