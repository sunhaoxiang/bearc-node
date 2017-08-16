const express = require('express')
const router = express.Router()
const Goods = require('../models/goods')

// hot模块
router.get('/hot', (req, res, next) => {
  Goods.find({hot: true}, (err, doc) => {
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

// milkpowders模块
router.get('/milkpowders', (req, res, next) => {
  Goods.find({productClass: 'milkpowders'}, (err, doc) => {
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
