const express = require('express')
const router = express.Router()
const users = require('../../models/users')

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
            status: 6,
            msg: '账号已存在'
          })
        } else {
          users().create({username: req.body.username, password: req.body.password}, (err) => {
            res.json({
              status: 5,
              msg: '注册成功'
            })
          })
        }
      }
    })
  })

  return router
}
