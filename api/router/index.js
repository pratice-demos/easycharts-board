const express = require('express')
const router = express.Router()

const controller = require('../controller/index')

// 路由处理
router.get('/api/getTagList', controller.tag.getTagList)
// router.post('/getPostList', post.getPostList)

module.exports = router