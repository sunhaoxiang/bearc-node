const express = require('express')
const router = express.Router()
const typesList = require('./typesList')
const addType = require('./addType')
const modifyType = require('./modifyType')
const removeType = require('./removeType')

module.exports = function () {
  // 分类列表
  router.use('/typeslist', typesList())

  // 添加分类
  router.use('/addtype', addType())

  // 修改分类
  router.use('/modifytype', modifyType())

  // 删除分类
  router.use('/removetype', removeType())

  return router
}
