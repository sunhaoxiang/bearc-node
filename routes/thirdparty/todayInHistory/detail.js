const express = require('express')
const router = express.Router()
const request = require('request')
const { todayInHistoryAppKey } = require('../../../config/config')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')
const { verifyTokenGetHandler } = require('../../../lib/verifyTokenHandler')

module.exports = function () {
  // 获得某条历史上的今天详细数据
  router.get('/', (req, res, next) =>{
    verifyTokenGetHandler(req, res, next, (verifyToken) => {
      request({
        url: 'http://v.juhe.cn/todayOnhistory/queryDetail.php',
        qs: {
          key: todayInHistoryAppKey,
          e_id: req.query.e_id
        }
      }, (err, response, body) => {
        if (err) {
          statusHandler(res, -1, err)
        } else {
          let sendData = JSON.parse(body)
          if (sendData.error_code === 0) {
            statusTokenHandler(res, verifyToken, sendData.reason, sendData.result[0])
          } else {
            statusHandler(res, -1, sendData.reason)
          }
        }
      })
    })
  })

  return router
}
