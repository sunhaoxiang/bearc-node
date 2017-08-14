//     ┏┓     ┏┓
//    ┏┛┻━━━━━┛┻┓
//    ┃         ┃
//    ┃    ━    ┃
//    ┃  ┳┛ ┗┳  ┃
//    ┃         ┃
//    ┃    ┻    ┃
//    ┃         ┃
//    ┗━┓     ┏━┛
//      ┃     ┃
//      ┃     ┃
//      ┃     ┗━━━━━┓
//      ┃           ┣┓
//      ┃           ┏┛
//      ┗┓┓┏━━━━━┳┓┏┛
//       ┃┫┫     ┃┫┫
//       ┗┻┛     ┗┻┛
//   神兽保佑,永无BUG
//   Code is far away from bug with the animal protecting

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const http = require('http')
const url = require('url')
const querystring = require('querystring')
const goods = require('./routes/goods')
const countries = require('./routes/countries')

// 搭建服务
const app = express()
app.listen(8888, () => {
  console.log('Bearc 服务已启动')
})

// 连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/bearc', {useMongoClient: true})
// 连接成功
mongoose.connection.on('connected', () => {
  console.log('MongoDB 连接成功')
})
// 连接异常
mongoose.connection.on('error', () => {
  console.log('MongoDB 连接失败')
})
// 连接断开
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB 连接断开')
})

// 允许跨域
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  if(req.method == "OPTIONS") {
    /*让options请求快速返回*/
    res.send(200)
  }
  else {
    next()
  }
})

// 解析POST数据
app.use(bodyParser.urlencoded())

// goods模块路由
app.use('/goods', goods)

// countries模块路由
app.use('/countries', countries)
