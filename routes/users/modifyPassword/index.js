const express = require('express')
const router = express.Router()
const users = require('../../../models/users')
const md5 = require('../../../md5/md5')
const { statusHandler } = require('../../../lib/statusHandler')
const { verifyTokenPostHandler } = require('../../../lib/verifyTokenHandler')

module.exports = function () {
  router.post('/', (req, res, next) => {
    verifyTokenPostHandler(req, res, next, (verifyToken) => {
      users().find({username: verifyToken.username}, (err, doc) => {
        if (err) {
          statusHandler(res, 500, err.message)
        } else {
          let oldPassword = md5(req.body.oldPassword)
          let newPassword = md5(req.body.newPassword)
          if (doc.length === 0) {
            statusHandler(res, 401, 'invalid')
          } else if (doc[0].password !== oldPassword) {
            statusHandler(res, -1, '旧密码错误')
          } else {
            users().update({
              username: verifyToken.username
            },{
              password: newPassword
            }, (err) => {
                if (err) {
                  statusHandler(res, 500, err.message)
                } else {
                  statusHandler(res, 0, '修改成功')
                }
            })
          }
        }
      })
    })
  })

  return router
}
