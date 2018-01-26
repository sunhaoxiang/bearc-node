const express = require('express')
const router = express.Router()
const countries = require('../../../models/countries')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')
const { verifyTokenGetHandler } = require('../../../lib/verifyTokenHandler')

module.exports = function () {
  // 国家列表
  router.get('/', (req, res, next) =>{
    verifyTokenGetHandler(req, res, next, (verifyToken) => {
      countries().count((err, count) => {
        if (err) {
          statusHandler(res, -1, err.message)
        } else {
          let limit = Number(req.query.size) || 10
          let skip = (Number(req.query.current) - 1) * limit || 0
          countries().find({}, {
            _id: 1,
            country: 1
          }, (err, doc) => {
            if (err) {
              statusHandler(res, -1, err.message)
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

  router.get('/select', (req, res, next) =>{
    verifyTokenGetHandler(req, res, next, (verifyToken) => {
      countries().find({}, {}, (err, doc) => {
        if (err) {
          statusHandler(res, -1, err.message)
        } else {
          let count = doc.length
          let limit = Number(req.query.size) || 10
          let skip = (Number(req.query.current) - 1) * limit || 0
          countries().find({}, {
            _id: 1,
            country: 1
          }, (err, doc) => {
            if (err) {
              statusHandler(res, -1, err.message)
            } else {
              statusTokenHandler(res, verifyToken, '查询成功', {
                count: doc.length,
                list: doc
              })
            }
          }).skip(skip).limit(limit)
        }
      })
    })
  })

  return router
}
