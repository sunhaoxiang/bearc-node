const express = require('express')
const router = express.Router()
const jwt = require('../../../jwt/jwt')
const countries = require('../../../models/countries')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')

module.exports = function () {
  // 修改国家
  router.post('/', (req, res, next) =>{
    let verifyToken = jwt.verify(req.headers.token)
    if (verifyToken === 'invalid') {
      statusHandler(res, -1, '登录超时')
    } else {
      countries().update({
        _id: req.body._id
      }, {
        country: req.body.country
      }, (err) => {
        if (err) {
          statusHandler(res, -1, err.message)
        } else {
          statusTokenHandler(res, verifyToken, '修改成功')
        }
      })
    }
  })

  return router
}
