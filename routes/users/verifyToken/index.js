const express = require('express')
const router = express.Router()
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')
const { verifyTokenPostHandler } = require('../../../lib/verifyTokenHandler')

module.exports = function () {
  router.post('/', (req, res, next) =>{
    verifyTokenPostHandler(req, res, next, (verifyToken) => {
      statusTokenHandler(res, verifyToken, '验证成功', {
        username: verifyToken.username
      })
    })
  })

  return router
}
