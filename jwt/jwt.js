const jwt = require('jsonwebtoken')
const { jwtSecretKey, jwtExpiresIn } = require('../config/config')

module.exports = {
  // 生成token
  sign (username) {
    let token = jwt.sign({username: username}, jwtSecretKey, {expiresIn: jwtExpiresIn})
    return token
  },
  // 验证token
  verify (token) {
    try {
      let verifyToken = jwt.verify(token, jwtSecretKey)
      return {
        status: 0,
        message: 'valid',
        verifyToken
      }
    } catch (err) {
      return {
        status: 401,
        message: 'invalid'
      }
    }
  }
}
