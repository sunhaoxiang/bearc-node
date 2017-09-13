const express = require('express')
const router = express.Router()
const verifyToken = require('./verifyToken')
const goodsList = require('./goodsList')
const upload = require('./upload')

module.exports = function () {
  // 验证token
  router.use('/verifytoken', verifyToken())

  // 上传
  router.use('/upload', upload())

  // 商品列表
  router.use('/goodslist', goodsList())

  return router
}
