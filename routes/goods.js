const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Goods = require('../models/goods')

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
  // Goods.find({}, (err, doc) => {
  //   if (err) {
  //     res.json({
  //       status: '1',
  //       msg: err.message
  //     })
  //   } else {
  //     res.json({
  //       status: '0',
  //       msg: '',
  //       result: {
  //         count: doc.length,
  //         list: doc
  //       }
  //     })
  //   }
  // })
  res.send('aaa')
})

module.exports = router
