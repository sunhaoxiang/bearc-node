const express = require('express')
const router = express.Router()
const jwt = require('../../jwt/jwt')

module.exports = function () {
  router.post('/', (req, res, next) =>{
    let verifyToken = jwt.verify(req.body.token)
    if (verifyToken === 'invalid') {
      res.json({
        status: -1,
        msg: '登录超时'
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
            username: verifyToken.username
          }
        })
      // 否则更新token
      } else {
        let newToken = jwt.sign(verifyToken.username)
        res.json({
          status: 1,
          msg: '更新token',
          result: {
            username: verifyToken.username,
            newToken: newToken
          }
        })
      }
    }
  })

  return router
}
