const port = 9999
const localUrl = 'http://localhost:9999'
const dbUrl = 'mongodb://127.0.0.1:27017/bearc'
const jwtSecretKey = 'secret'
const jwtExpiresIn = '1h'
const passwordSecretKey = 'secret'

module.exports = {
  port,
  dbUrl,
  localUrl,
  jwtSecretKey,
  jwtExpiresIn,
  passwordSecretKey
}
