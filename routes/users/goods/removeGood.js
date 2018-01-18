const express = require('express')
const router = express.Router()
const jwt = require('../../../jwt/jwt')
const goods = require('../../../models/goods')

module.exports = function () {
  // 删除商品
  router.post('/', (req, res, next) =>{
    let verifyToken = jwt.verify(req.body.token)
    if (verifyToken === 'invalid') {
      res.json({
        status: -1,
        msg: '登录超时'
      })
    } else {
      goods().remove({
        _id: req.body._id
      }, (err) => {
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
              msg: '删除成功',
            })
          // 否则更新token
          } else {
            let newToken = jwt.sign(verifyToken.username)
            res.json({
              status: 1,
              msg: '删除成功',
              result: {
                newToken: newToken
              }
            })
          }
        }
      })
    }
  })

  return router
}
