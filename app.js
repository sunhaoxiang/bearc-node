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
const bodyParser = require('body-parser')
const http = require('http')
const url = require('url')
const querystring = require('querystring')

//搭建服务
const app = express()
app.listen(8888, () => {
  console.log('服务已启动')
});

//允许跨域
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

//解析POST数据
app.use(bodyParser.urlencoded())

//goods模块路由
app.use('/goods', require('./routes/goods')())
