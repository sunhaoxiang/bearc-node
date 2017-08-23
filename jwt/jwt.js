const jwt = require('jsonwebtoken')
const { jwtSecretKey } = require('../config/config')

module.exports = {
  // 生成token
  sign (username) {
    let token = jwt.sign({username: username}, jwtSecretKey, {expiresIn: '30m'})
    return token
  },
  // 验证token
  verify (token) {
    try {
      let username = jwt.verify(token, jwtSecretKey)
      return username
    } catch (err) {
      return err
    }
  }
}
