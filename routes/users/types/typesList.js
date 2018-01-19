const express = require('express')
const router = express.Router()
const jwt = require('../../../jwt/jwt')
const types = require('../../../models/types')

module.exports = function () {
  // 分类列表
  router.get('/', (req, res, next) =>{
    let verifyToken = jwt.verify(req.headers.token)
    if (verifyToken === 'invalid') {
      res.json({
        status: -1,
        msg: '登录超时'
      })
    } else {
      types().find({}, {
        _id: 1,
        type: 1
      }, (err, doc) => {
        if (err) {
          res.json({
            status: -1,
            msg: err.message
          })
        } else {
          // token剩余时间
          let remainTime = verifyToken.exp - Math.round(new Date() / 1000)
          // 如果token剩余时间大于15分钟，则不更新token
          if (remainTime > 900) {
            res.json({
              status: 0,
              msg: '查询成功',
              result: {
                count: doc.length,
                list: doc
              }
            })
          // 否则更新token
          } else {
            let newToken = jwt.sign(verifyToken.username)
            res.json({
              status: 1,
              msg: '查询成功',
              result: {
                newToken: newToken,
                count: doc.length,
                list: doc
              }
            })
          }
        }
      })
    }
  })

  return router
}
