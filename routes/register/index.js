const express = require('express')
const router = express.Router()
const users = require('../../models/users')
const md5 = require('../../md5/md5')
const { invitationCode } = require('../../config/config')
const { statusHandler } = require('../../lib/statusHandler')

module.exports = function () {
  router.post('/', (req, res, next) => {
    if (req.body.invitationCode === invitationCode) {
      users().find({username: req.body.username}, (err, doc) => {
        if (err) {
          statusHandler(res, 500, err.message)
        } else {
          if (doc.length !== 0) {
            statusHandler(res, -1, '账号已存在')
          } else {
            let password = md5(req.body.password)
            users().create({username: req.body.username, password: password}, (err) => {
              if (err) {
                statusHandler(res, 500, err.message)
              } else {
                statusHandler(res, 0, '注册成功')
              }
            })
          }
        }
      })
    } else {
      statusHandler(res, -1, '邀请码不正确')
    }
  })

  return router
}
