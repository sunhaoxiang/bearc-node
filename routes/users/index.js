const express = require('express')
const router = express.Router()
const register = require('./register')
const login = require('./login')
const verifyToken = require('./verifyToken')

module.exports = function () {
  // 注册
  router.use('/register', register())

  // 登录
  router.use('/login', login())

  // 验证token
  router.use('/verifyToken', verifyToken())

  return router
}
