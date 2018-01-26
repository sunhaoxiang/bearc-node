const express = require('express')
const router = express.Router()
const countries = require('../../../models/countries')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')
const { verifyTokenPostHandler } = require('../../../lib/verifyTokenHandler')

module.exports = function () {
  // 删除国家
  router.post('/', (req, res, next) =>{
    verifyTokenPostHandler(req, res, next, (verifyToken) => {
      countries().remove({
        _id: req.body._id
      }, (err) => {
        if (err) {
          statusHandler(res, 500, err.message)
        } else {
          statusTokenHandler(res, verifyToken, '删除成功')
        }
      })
    })
  })

  return router
}
