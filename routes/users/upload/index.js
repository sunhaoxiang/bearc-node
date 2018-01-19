const fs =require('fs')
const path = require('path')
const express = require('express')
const router = express.Router()
const { localUrl } = require('../../../config/config')
const jwt = require('../../../jwt/jwt')
const { statusHandler, statusTokenHandler } = require('../../../lib/statusHandler')
const multer = require('multer')
const upload = multer({
  // 上传路径
  dest: 'upload/',
  limits: {
    // 文件大小限制
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    let verifyToken = jwt.verify(req.headers.token)
    // 文件上传前验证token
    if (verifyToken === 'invalid') {
      cb(null, false)
      cb(new Error())
    } else {
      // 限制上传文件类型
      if (file.mimetype === 'image/gif' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
      } else {
        cb(null, false)
        cb(new Error())
      }
    }
  }
}).single('image')

module.exports = function () {
  // 上传
  router.post('/', (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        res.sendStatus(403)
      } else {
        let newPath = req.file.path + path.parse(req.file.originalname).ext
        // 为上传的文件加上扩展名
        fs.rename(req.file.path, newPath, (err) => {
          if (err) {
            statusHandler(res, -1, err.message)
          } else {
            statusHandler(res, 0, '上传成功', {
              path: `${localUrl}/${newPath}`
            })
          }
        })
      }
    })
  })

  return router
}
