const express = require('express')
const router = express.Router()
const Goods = require('../models/goods')

// 获取相应分类数据
router.get('/:productClass', (req, res, next) => {
  if (req.params.productClass === 'hot') {
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
  } else {
    Goods.find({productClass: req.params.productClass}, (err, doc) => {
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
  }
})

module.exports = router
