const fs =require('fs')
const path = require('path')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'upload/' })

module.exports = function () {
  // 上传
  router.post('/', upload.single('image'), (req, res, next) => {
    let newPath = req.file.path + path.parse(req.file.originalname).ext
    // 为上传的文件加上扩展名
    fs.rename(req.file.path, newPath, (err) => {
      if (err) {
        res.json({
          status: -1,
          msg: err.message
        })
      } else {
        res.json({
          status: 1,
          msg: '',
          result: {
            path: newPath
          }
        })
      }
    })
  })

  return router
}
