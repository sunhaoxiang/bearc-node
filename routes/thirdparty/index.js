const express = require('express')
const router = express.Router()
const todayInHistory = require('./todayInHistory')

module.exports = function () {
  // 历史上的今天
  router.use('/todayinhistory', todayInHistory())

  return router
}
