const crypto = require('crypto')
const { passwordSecretKey } = require('../config/config')

module.exports = function (str) {
  let md5 = crypto.createHash('md5')
  md5.update(str + passwordSecretKey)
  return md5.digest('hex')
}
