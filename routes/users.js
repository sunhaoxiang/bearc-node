const express = require('express')
const router = express.Router()
const users = require('../models/users')

module.exports = function () {
  // 登录
  router.post('/login', (req, res, next) => {
    console.log(req.session.id)
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
            msg: '账号不存在',
            result: {}
          })
        } else {
          if (req.body.username !== doc[0].password) {
            res.json({
              status: 1,
              msg: '密码错误',
              result: {}
            })
          } else {
            res.json({
              status: 0,
              msg: '登陆成功',
              result: {}
            })
          }
        }
      }
    })
  })
  return router
}
