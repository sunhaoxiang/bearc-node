const express = require('express')
const router = express.Router()
const users = require('../../models/users')
const jwt = require('../../jwt/jwt')

module.exports = function () {
  router.post('/', (req, res, next) => {
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

  return router
}
