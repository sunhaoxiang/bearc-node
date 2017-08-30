const express = require('express')
const router = express.Router()
const getGoods = require('../../models/getGoods')

module.exports = function () {
  // 获取相应分类数据
  router.get('/:productClass', (req, res, next) => {
    switch (req.params.productClass) {
      case 'hot':
        getGoods().find({hot: true}, (err, doc) => {
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
        break;
      default:
        getGoods().find({productClass: req.params.productClass}, (err, doc) => {
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
        break;
    }
  })
  
  return router
}
