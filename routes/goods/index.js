const express = require('express')

module.exports = function() {
  const router = express.Router()

  //hot模块路由
  router.use('/hot', require('./hot')())
  
  return router
};