const express = require('express')
const router = express.Router()
const verifyToken = require('./verifyToken')

module.exports = function () {
  // 验证token
  router.use('/verifyToken', verifyToken())

  return router
}
