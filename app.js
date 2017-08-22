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

const http = require('http')
const url = require('url')
const querystring = require('querystring')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const getGoods = require('./routes/getGoods')
const getCountries = require('./routes/getCountries')
const users = require('./routes/users')

// 搭建服务
const app = express()
app.listen(9999, () => {
  console.log('Bearc service startup.')
})

// 连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/bearc', {useMongoClient: true})
// 连接成功
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected success.')
})
// 连接异常
mongoose.connection.on('error', () => {
  console.log('MongoDB connected fail.')
})
// 连接断开
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connected disconnected.')
})

// 允许跨域
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  if(req.method == "OPTIONS") {
    /*让options请求快速返回*/
    res.sendStatus(200)
  }
  else {
    next()
  }
})

// 解析POST数据
app.use(bodyParser.json())

// getCountries 模块路由
app.use('/getcountries', getCountries())

// getGoods 模块路由
app.use('/getgoods', getGoods())

// users 模块路由
app.use('/users', users())
