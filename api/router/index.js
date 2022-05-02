const express = require('express')
const router = express.Router()

const controller = require('../controller/index')

// 路由处理
router.post('/board/register', controller.user.register)
router.post('/board/login', controller.user.login)
router.get('/board/auth', controller.user.auth)
router.get('/board/getTagList', controller.tag.getTagList)
router.post('/board/getPostList', controller.post.getPostList)
router.post('/board/createPost', controller.post.createPost)

module.exports = router