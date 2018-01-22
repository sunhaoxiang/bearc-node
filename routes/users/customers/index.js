const express = require('express')
const router = express.Router()
const customersList = require('./customersList')
const addCustomer = require('./addCustomer')
const modifyCustomer = require('./modifyCustomer')
const removeCustomer = require('./removeCustomer')

module.exports = function () {
  // 客户列表
  router.use('/customerslist', customersList())

  // 添加客户
  router.use('/addcustomer', addCustomer())

  // 修改客户
  router.use('/modifycustomer', modifyCustomer())

  // 删除客户
  router.use('/removecustomer', removeCustomer())

  return router
}
