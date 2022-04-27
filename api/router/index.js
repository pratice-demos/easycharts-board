const express = require('express')
const router = express.Router()

const controller = require('../controller/index')

// 路由处理
router.post('/api/register', controller.user.register)
router.post('/api/login', controller.user.login)
router.get('/api/getTagList', controller.tag.getTagList)
router.post('/api/getPostList', controller.post.getPostList)

module.exports = router