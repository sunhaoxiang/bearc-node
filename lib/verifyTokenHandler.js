const jwt = require('../jwt/jwt')
const { statusHandler } = require('./statusHandler')
const verifyTokenHandler = function (res, verifyTokenResult, cb) {
  if (verifyTokenResult.status === 0) {
    cb(verifyTokenResult.verifyToken)
  } else {
    statusHandler(res, 401, verifyTokenResult.message)
  }
}

module.exports = {
  // get方法验证token
  verifyTokenGetHandler (req, res, next, cb) {
    let verifyTokenResult = jwt.verify(req.headers.token)
    verifyTokenHandler(res, verifyTokenResult, cb)
  },
  // post方法验证token
  verifyTokenPostHandler (req, res, next, cb) {
    let verifyTokenResult = jwt.verify(req.headers.token)
    verifyTokenHandler(res, verifyTokenResult, cb)
  }
}
