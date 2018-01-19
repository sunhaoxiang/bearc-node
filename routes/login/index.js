const express = require('express')
const router = express.Router()
const users = require('../../models/users')
const jwt = require('../../jwt/jwt')
const md5 = require('../../md5/md5')
const { statusHandler } = require('../../lib/statusHandler')

module.exports = function () {
  router.post('/', (req, res, next) => {
    users().find({username: req.body.username}, (err, doc) => {
      if (err) {
        statusHandler(res, -1, err.message)
      } else {
        if (doc.length === 0) {
          statusHandler(res, -1, '账号不存在')
        } else {
          let password = md5(req.body.password)
          if (password !== doc[0].password) {
            statusHandler(res, -1, '密码错误')
          } else {
            let signToken = jwt.sign(req.body.username)
            statusHandler(res, 0, '登陆成功', {
              username: doc[0].username,
              token: signToken
            })
          }
        }
      }
    })
  })

  return router
}
