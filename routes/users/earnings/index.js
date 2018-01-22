const express = require('express')
const router = express.Router()
const earningsList = require('./earningsList')
const addEarning = require('./addEarning')
const modifyEarning = require('./modifyEarning')
const removeEarning = require('./removeEarning')

module.exports = function () {
  // 收入列表
  router.use('/earningslist', earningsList())

  // 添加收入
  router.use('/addearning', addEarning())

  // 修改收入
  router.use('/modifyearning', modifyEarning())

  // 删除收入
  router.use('/removeearning', removeEarning())

  return router
}
