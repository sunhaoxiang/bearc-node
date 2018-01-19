const express = require('express')
const router = express.Router()
const jwt = require('../../../jwt/jwt')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')

module.exports = function () {
  router.post('/', (req, res, next) =>{
    let verifyToken = jwt.verify(req.headers.token)
    if (verifyToken === 'invalid') {
      statusHandler(res, -1, '登录超时')
    } else {
      statusTokenHandler(res, verifyToken, '验证成功', {
        username: verifyToken.username
      })
    }
  })

  return router
}
