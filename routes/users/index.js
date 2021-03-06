const express = require('express')
const router = express.Router()
const verifyToken = require('./verifyToken')
const upload = require('./upload')
const goods = require('./goods')
const types = require('./types')
const countries = require('./countries')
const earnings = require('./earnings')
const customers = require('./customers')
const modifyPassword = require('./modifyPassword')

module.exports = function () {
  // 验证token
  router.use('/verifytoken', verifyToken())

  // 上传
  router.use('/upload', upload())

  // 商品模块
  router.use('/goods', goods())

  // 分类模块
  router.use('/types', types())

  // 国家模块
  router.use('/countries', countries())

  // 收入模块
  router.use('/earnings', earnings())

  // 客户模块
  router.use('/customers', customers())

  // 修改密码模块
  router.use('/modifypassword', modifyPassword())

  return router
}
