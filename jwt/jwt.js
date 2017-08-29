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
      let username = jwt.verify(token, jwtSecretKey)
      return username
    } catch (err) {
      return 'invalid'
    }
  }
}
