const express = require('express')
const router = express.Router()
const request = require('request')
const { todayInHistoryAppKey } = require('../../../config/config')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')
const { verifyTokenGetHandler } = require('../../../lib/verifyTokenHandler')

module.exports = function () {
  // 随机获得历史上的今天数据
  router.get('/', (req, res, next) =>{
    verifyTokenGetHandler(req, res, next, (verifyToken) => {
      let now = new Date()
      let nowMonth = now.getMonth() + 1
      let nowDate = now.getDate()
      let date = `${nowMonth}/${nowDate}`
      request({
        url: 'http://v.juhe.cn/todayOnhistory/queryEvent.php',
        qs: {
          key: todayInHistoryAppKey,
          date
        }
      }, (err, response, body) => {
        if (err) {
          statusHandler(res, 500, err)
        } else {
          let sendData = JSON.parse(body)
          if (sendData.error_code === 0) {
            let index = Math.floor(Math.random()*sendData.result.length)
            statusTokenHandler(res, verifyToken, sendData.reason, sendData.result[index])
          } else {
            statusHandler(res, 500, sendData.reason)
          }
        }
      })
    })
  })

  return router
}
