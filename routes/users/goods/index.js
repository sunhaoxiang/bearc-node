const express = require('express')
const router = express.Router()
const goodsList = require('./goodsList')
const addGood = require('./addGood')
const modifyGood = require('./modifyGood')

module.exports = function () {
  // 商品列表
  router.use('/goodslist', goodsList())

  // 添加商品
  router.use('/addgood', addGood())

  // 修改商品
  router.use('/modifygood', modifyGood())

  return router
}
