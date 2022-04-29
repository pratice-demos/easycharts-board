const express = require('express')
const router = express.Router()

const controller = require('../controller/index')

// 路由处理
router.post('/api/register', controller.user.register)
router.post('/api/login', controller.user.login)
router.get('/api/auth', controller.user.auth)
router.get('/api/getTagList', controller.tag.getTagList)
router.post('/api/getPostList', controller.post.getPostList)
router.post('/api/createPost', controller.post.createPost)

module.exports = router