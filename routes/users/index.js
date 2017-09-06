const express = require('express')
const router = express.Router()
const verifyToken = require('./verifyToken')
const goodsList = require('./goodsList')

module.exports = function () {
  // 验证token
  router.use('/verifytoken', verifyToken())

  // 商品列表
  router.use('/goodslist', goodsList())

  return router
}
