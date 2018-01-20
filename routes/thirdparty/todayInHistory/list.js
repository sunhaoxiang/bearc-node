const express = require('express')
const router = express.Router()
const request = require('request')
const { todayInHistoryAppKey } = require('../../../config/config')
const jwt = require('../../../jwt/jwt')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')

module.exports = function () {
  router.get('/', (req, res, next) =>{
    let verifyToken = jwt.verify(req.query.token)
    if (verifyToken === 'invalid') {
      statusHandler(res, -1, '登录超时')
    } else {
      request({
        url: 'http://v.juhe.cn/todayOnhistory/queryEvent.php',
        qs: {
          key: todayInHistoryAppKey,
          date: '1/20'
        }
      }, (err, response, body) => {
        if (err) {
          statusHandler(res, -1, err)
        } else {
          let sendData = JSON.parse(body)
          if (sendData.error_code === 0) {
            statusTokenHandler(res, verifyToken, sendData.reason, sendData.result)
          } else {
            statusHandler(res, -1, sendData.reason)
          }
        }
      })
    }
  })

  return router
}
