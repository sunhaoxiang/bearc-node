const express = require('express')
const router = express.Router()
const getCountries = require('../models/countries')

module.exports = function () {
  // 获取国家数据
  router.get('/', (req, res, next) => {
    getCountries().find({}, (err, doc) => {
      if (err) {
        res.json({
          status: -1,
          msg: err.message
        })
      } else {
        res.json({
          status: 0,
          msg: '',
          result: {
            count: doc.length,
            list: doc
          }
        })
      }
    })
  })
  return router
}
