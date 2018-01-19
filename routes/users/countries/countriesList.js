const express = require('express')
const router = express.Router()
const jwt = require('../../../jwt/jwt')
const countries = require('../../../models/countries')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')

module.exports = function () {
  // 国家列表
  router.get('/', (req, res, next) =>{
    let verifyToken = jwt.verify(req.params.token)
    if (verifyToken === 'invalid') {
      statusHandler(res, -1, '登录超时')
    } else {
      countries().find({}, {
        _id: 1,
        country: 1
      }, (err, doc) => {
        if (err) {
          statusHandler(res, -1, err.message)
        } else {
          statusTokenHandler(res, verifyToken, '查询成功', {
            count: doc.length,
            list: doc
          })
        }
      })
    }
  })

  return router
}
