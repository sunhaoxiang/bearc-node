const express = require('express')
const router = express.Router()
const jwt = require('../../../jwt/jwt')
const types = require('../../../models/types')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')

module.exports = function () {
  // 分类列表
  router.get('/', (req, res, next) =>{
    let verifyToken = jwt.verify(req.headers.token)
    if (verifyToken === 'invalid') {
      statusHandler(res, -1, '登录超时')
    } else {
      types().find({}, {
        _id: 1,
        type: 1
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
