const express = require('express')
const router = express.Router()
const goods = require('../../models/goods')

module.exports = function () {
  // 获取相应分类数据
  router.get('/:productClass', (req, res, next) => {
    switch (req.params.productClass) {
      case 'hot':
        goods().find({hot: true}, {
          _id: 0,
          productName: 1,
          productImgSrc: 1,
          productPrice: 1,
          productDiscountPrice: 1,
          productCountry: 1,
          productClass: 1
        }, (err, doc) => {
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
        break
      default:
        goods().find({productClass: req.params.productClass}, {
          productName: 1,
          productImgSrc: 1,
          productPrice: 1,
          productDiscountPrice: 1,
          productCountry: 1,
          productClass: 1
        }, (err, doc) => {
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
        break
    }
  })
  
  return router
}
