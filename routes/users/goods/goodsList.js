const express = require('express')
const router = express.Router()
const goods = require('../../../models/goods')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')
const { verifyTokenGetHandler } = require('../../../lib/verifyTokenHandler')

module.exports = function () {
  // 商品列表
  router.get('/', (req, res, next) =>{
    verifyTokenGetHandler(req, res, next, (verifyToken) => {
      let qs = new RegExp(req.query.search, 'i')
      goods().count({
        productName: qs
      }, (err, count) => {
        if (err) {
          statusHandler(res, 500, err.message)
        } else {
          let limit = Number(req.query.size) || 10
          let skip = (Number(req.query.current) - 1) * limit || 0
          goods().find({
            productName: qs
          }, {
            _id: 1,
            productName: 1,
            purchasePrice: 1,
            productPrice: 1,
            productCountry: 1,
            productType: 1
          }, (err, doc) => {
            if (err) {
              statusHandler(res, 500, err.message)
            } else {
              statusTokenHandler(res, verifyToken, '查询成功', {
                count,
                list: doc
              })
            }
          }).skip(skip).limit(limit)
        }
      })
    })
  })

  // select
  router.get('/select', (req, res, next) =>{
    verifyTokenGetHandler(req, res, next, (verifyToken) => {
      goods().find({}, {
        _id: 1,
        productName: 1
      }, (err, doc) => {
        if (err) {
          statusHandler(res, 500, err.message)
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
