const express = require('express')
const router = express.Router()
const verifyToken = require('./verifyToken')
const goods = require('./goods')
const upload = require('./upload')

module.exports = function () {
  // 验证token
  router.use('/verifytoken', verifyToken())

  // 上传
  router.use('/upload', upload())

  // 商品模块
  router.use('/goods', goods())

  return router
}
