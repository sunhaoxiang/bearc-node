const express = require('express')
const router = express.Router()
const jwt = require('../../jwt/jwt')
const goods = require('../../models/goods')

module.exports = function () {
  // 获取商品列表
  router.get('/get', (req, res, next) =>{
    let verifyToken = jwt.verify(req.query.token)
    if (verifyToken === 'invalid') {
      res.json({
        status: -1,
        msg: '登录超时'
      })
    } else {
      goods().find({}, {
        _id: 0,
        productName: 1,
        purchasePrice: 1,
        productPrice: 1,
        productDiscountPrice: 1,
        productCountry: 1,
        productClass: 1
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
              msg: '验证成功',
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
              msg: '更新token',
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
