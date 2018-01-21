const express = require('express')
const router = express.Router()
const random = require('./random')
const detail = require('./detail')

module.exports = function () {
  // 随机获得历史上的今天数据
  router.use('/random', random())

  // 获得某条历史上的今天详细数据
  router.use('/detail', detail())

  return router
}
