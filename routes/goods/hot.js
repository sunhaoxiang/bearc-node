const express = require('express')
const mongoose = require('mongoose')
const Hot = require('../../models/hot')()

module.exports = function () {
  const router = express.Router()

  // 连接MongoDB数据库
  mongoose.connect('mongodb://127.0.0.1:27017/bearc')

  mongoose.connection.on('connected', () => {
    console.log('MongoDB 连接成功')
  })

  mongoose.connection.on('error', () => {
    console.log('MongoDB 连接失败')
  })

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB 断开')
  })

  router.get('/', (req, res, next) => {
    res.send('123456')
  })

  return router
};
