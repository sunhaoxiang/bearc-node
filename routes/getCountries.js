const express = require('express')
const router = express.Router()
const getCountries = require('../models/getCountries')

// 获取国家数据
router.get('/', (req, res, next) => {
  getCountries.find({}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

module.exports = router
