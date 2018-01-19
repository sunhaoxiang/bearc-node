const express = require('express')
const router = express.Router()
const countriesList = require('./countriesList')
const addCountry = require('./addCountry')
const modifyCountry = require('./modifyCountry')
const removeCountry = require('./removeCountry')

module.exports = function () {
  // 分类列表
  router.use('/countrieslist', countriesList())

  // 添加分类
  router.use('/addcountry', addCountry())

  // 修改分类
  router.use('/modifycountry', modifyCountry())

  // 删除分类
  router.use('/removecountry', removeCountry())

  return router
}
