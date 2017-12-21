const express = require('express')
const router = express.Router()
const users = require('../../models/users')
const md5 = require('../../md5/md5')

module.exports = function () {
  router.post('/', (req, res, next) => {
    users().find({username: req.body.username}, (err, doc) => {
      if (err) {
        res.json({
          status: -1,
          msg: err.message
        })
      } else {
        if (doc.length !== 0) {
          res.json({
            status: -1,
            msg: '账号已存在'
          })
        } else {
          let password = md5(req.body.password)
          users().create({username: req.body.username, password: password}, (err) => {
            res.json({
              status: 0,
              msg: '注册成功'
            })
          })
        }
      }
    })
  })

  return router
}
