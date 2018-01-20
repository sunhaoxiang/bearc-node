const express = require('express')
const router = express.Router()
const list = require('./list')

module.exports = function () {
  // 列表
  router.use('/list', list())

  return router
}
