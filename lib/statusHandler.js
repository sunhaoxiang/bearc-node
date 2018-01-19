const jwt = require('../jwt/jwt')

module.exports = {
  // 不判断是否更新token
  statusHandler (res, status, msg, result = {}) {
    res.json({
      status,
      msg,
      result
    })
  },
  // 判断是否更新token
  statusTokenHandler (res, verifyToken, msg, result = {}) {
    // token剩余时间
    let remainTime = verifyToken.exp - Math.round(new Date() / 1000)
    // 如果token剩余时间大于15分钟，则不更新token
    if (remainTime > 900) {
      res.json({
        status: 0,
        msg,
        result
      })
    // 否则更新token
    } else {
      let newToken = jwt.sign(verifyToken.username)
      res.json({
        status: 1,
        msg,
        result: {
          ...result,
          newToken
        }
      })
    }
  }
}
