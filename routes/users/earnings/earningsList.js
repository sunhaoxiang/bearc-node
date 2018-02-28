const express = require('express')
const router = express.Router()
const earnings = require('../../../models/earnings')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')
const { verifyTokenGetHandler } = require('../../../lib/verifyTokenHandler')

module.exports = function () {
  // 收入列表
  router.get('/', (req, res, next) =>{
    verifyTokenGetHandler(req, res, next, (verifyToken) => {
      earnings().count((err, count) => {
        if (err) {
          statusHandler(res, 500, err.message)
        } else {
          let limit = Number(req.query.size) || 10
          let skip = (Number(req.query.current) - 1) * limit || 0
          earnings().find({}, {
            _id: 1,
            productName: 1,
            purchasePrice: 1,
            productPrice: 1,
            sellNumber: 1,
            expressFee: 1,
            customerName: 1,
            sellDate: 1
          }, (err, doc) => {
            if (err) {
              statusHandler(res, 500, err.message)
            } else {
              statusTokenHandler(res, verifyToken, '查询成功', {
                count,
                list: doc
              })
            }
          }).skip(skip).limit(limit).sort({
            sellDate: 'desc' // 降序
          })
        }
      })
    })
  })

  router.get('/statistics', (req, res, next) => {
    verifyTokenGetHandler(req, res, next, (verifyToken) => {
      earnings().find({
        sellDate: {
          $gte: req.query.startDate,
          $lte: req.query.endDate
        }
      }, {
        _id: 1,
        productName: 1,
        purchasePrice: 1,
        productPrice: 1,
        sellNumber: 1,
        expressFee: 1
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
