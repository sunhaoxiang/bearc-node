const express = require('express')
const router = express.Router()
const users = require('../../models/users')
const jwt = require('../../jwt/jwt')

module.exports = function () {
  // 登录
  router.post('/login', (req, res, next) => {
    users().find({username: req.body.username}, (err, doc) => {
      if (err) {
        res.json({
          status: -1,
          msg: err.message
        })
      } else {
        if (doc.length === 0) {
          res.json({
            status: 2,
            msg: '账号不存在'
          })
        } else {
          if (req.body.password !== doc[0].password) {
            res.json({
              status: 3,
              msg: '密码错误'
            })
          } else {
            let signToken = jwt.sign(req.body.username)
            res.json({
              status: 0,
              msg: '登陆成功',
              result: {
                username: doc[0].username,
                token: signToken
              }
            })
          }
        }
      }
    })
  })

  // 验证token
  router.post('/verifyToken', (req, res, next) =>{
    let verifyToken = jwt.verify(req.body.token)
    if (verifyToken === 'invalid') {
      res.json({
        status: 4,
        msg: '登录超时'
      })
    } else {
      // token剩余时间
      let remainTime = verifyToken.exp - Math.round(new Date() / 1000)
      // 如果token剩余时间大于15分钟，则不更新token
      if (remainTime > 900) {
        res.json({
          status: 0,
          msg: '验证成功'
        })
      // 否则更新token
      } else {
        let newToken = jwt.sign(req.body.username)
        res.json({
          status: 1,
          msg: '更新token',
          result: {
            newToken: newToken
          }
        })
      }
    }
  })
  
  return router
}
