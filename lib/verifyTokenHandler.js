const jwt = require('../jwt/jwt')
const { statusHandler } = require('./statusHandler')

module.exports = {
  // get方法验证token
  verifyTokenGetHandler (req, res, next, cb) {
    let verifyToken = jwt.verify(req.query.token)
    if (verifyToken === 'invalid') {
      statusHandler(res, -1, '登录超时')
    } else {
      cb(verifyToken)
    }
  },
  // post方法验证token
  verifyTokenPostHandler (req, res, next, cb) {
    let verifyToken = jwt.verify(req.body.token)
    if (verifyToken === 'invalid') {
      statusHandler(res, -1, '登录超时')
    } else {
      cb(verifyToken)
    }
  }
}
