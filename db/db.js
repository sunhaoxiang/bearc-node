const mongoose = require('mongoose')
const { dbUrl } = require('../config/config')

module.exports = function () {
  // 连接MongoDB数据库
  mongoose.connect(dbUrl, {useMongoClient: true})
  // 连接成功
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected success.')
  })
  // 连接异常
  mongoose.connection.on('error', (err) => {
    console.log('MongoDB connected error.')
  })
  // 连接断开
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connected disconnected.')
  })
}
