const express = require('express')
const router = express.Router()
const random = require('./random')

module.exports = function () {
  // 列表
  router.use('/random', random())

  return router
}
