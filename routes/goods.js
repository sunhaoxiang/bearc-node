const express = require('express')
const router = express.Router()
const Goods = require('../models/goods')

router.get('/', (req, res, next) => {
  // Goods.find({}, (err, doc) => {
  //   if (err) {
  //     res.json({
  //       status: '1',
  //       msg: err.message
  //     })
  //   } else {
  //     res.json({
  //       status: '0',
  //       msg: '',
  //       result: {
  //         count: doc.length,
  //         list: doc
  //       }
  //     })
  //   }
  // })
})

module.exports = router
