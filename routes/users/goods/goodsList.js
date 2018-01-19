const express = require('express')
const router = express.Router()
const jwt = require('../../../jwt/jwt')
const goods = require('../../../models/goods')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')

module.exports = function () {
  // 商品列表
  router.get('/', (req, res, next) =>{
    let verifyToken = jwt.verify(req.params.token)
    if (verifyToken === 'invalid') {
      statusHandler(res, -1, '登录超时')
    } else {
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
    }
  })

  return router
}
