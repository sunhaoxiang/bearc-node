const express = require('express')
const router = express.Router()
const customers = require('../../../models/customers')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')
const { verifyTokenGetHandler } = require('../../../lib/verifyTokenHandler')

module.exports = function () {
  // 客户列表
  router.get('/', (req, res, next) =>{
    verifyTokenGetHandler(req, res, next, (verifyToken) => {
      customers().find({}, {
        _id: 1,
        customerName: 1,
        customerPhone: 1,
        customerAddress: 1
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

  router.get('/select', (req, res, next) =>{
    verifyTokenGetHandler(req, res, next, (verifyToken) => {
      customers().find({}, {
        _id: 1,
        customerName: 1
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
