const fs =require('fs')
const path = require('path')
const express = require('express')
const router = express.Router()
const jwt = require('../../jwt/jwt')
const multer = require('multer')
const upload = multer({
  dest: 'upload/',
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    let verifyToken = jwt.verify(req.body.token)
    if (verifyToken === 'invalid') {
      cb(null, false)
      cb(new Error())
    } else {
      cb(null, true)
    }

  }
}).single('image')

module.exports = function () {
  // 上传
  router.post('/', (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        console.log('Upload error.')
      } else {
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
      }
    })
  })

  return router
}
