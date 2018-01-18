const express = require('express')
const router = express.Router()
const goodsList = require('./goodsList')
const addGood = require('./addGood')
const modifyGood = require('./modifyGood')
const removeGood = require('./removeGood')

module.exports = function () {
  // 商品列表
  router.use('/goodslist', goodsList())

  // 添加商品
  router.use('/addgood', addGood())

  // 修改商品
  router.use('/modifygood', modifyGood())

  // 删除商品
  router.use('/removeGood', removeGood())

  return router
}
