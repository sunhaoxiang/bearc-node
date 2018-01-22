const express = require('express')
const router = express.Router()
const earnings = require('../../../models/earnings')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')
const { verifyTokenPostHandler } = require('../../../lib/verifyTokenHandler')

module.exports = function () {
  // 删除收入
  router.post('/', (req, res, next) =>{
    verifyTokenPostHandler(req, res, next, (verifyToken) => {
      earnings().remove({
        _id: req.body._id
      }, (err) => {
        if (err) {
          statusHandler(res, -1, err.message)
        } else {
          statusTokenHandler(res, verifyToken, '删除成功')
        }
      })
    })
  })

  return router
}
