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
const expressStatic = require('express-static')
const helmet = require('helmet')
const db = require('./db/db')
const bodyParser = require('body-parser')
const { port } = require('./config/config')
const getCountries = require('./routes/getcountries')
const getGoods = require('./routes/getgoods')
const register = require('./routes/register')
const login = require('./routes/login')
const users = require('./routes/users')

// 搭建服务
const app = express()
app.listen(port, () => {
  console.log('Bearc service startup.')
})

// Header保护
app.use(helmet())

// 连接数据库
db()

// 允许跨域
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild, token')
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

// 静态文件 
app.use('/upload', expressStatic('upload'))

// getCountries 模块路由
app.use('/getcountries', getCountries())

// getGoods 模块路由
app.use('/getgoods', getGoods())

// register 模块路由
app.use('/register', register())

// login 模块路由
app.use('/login', login())

// users 模块路由
app.use('/users', users())
