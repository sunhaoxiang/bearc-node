const express = require('express')
const router = express.Router()
const jwt = require('../../../jwt/jwt')
const types = require('../../../models/types')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')

module.exports = function () {
  // 修改分类
  router.post('/', (req, res, next) =>{
    let verifyToken = jwt.verify(req.body.token)
    if (verifyToken === 'invalid') {
      statusHandler(res, -1, '登录超时')
    } else {
      types().update({
        _id: req.body._id
      }, {
        type: req.body.type
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
