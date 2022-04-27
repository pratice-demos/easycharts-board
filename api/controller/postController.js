const dao = require('../dao/index')

// 根据标签获取帖子列表
function getPostList(req, res) {
  // 校验参数
  let {tagList, page} = req.body
  // tagList = tagList ?? []
  tagList = [1]
  page = page ?? {index: 0, size: 10}
  // 查询数据库
  dao.post.queryPostList({tagList, page}, (err, data) => {
    if(err) {
      console.log('getPostList err: ', err)
      return
    }
    if(data) {
      res.send(data)
    }
  })
}

module.exports = {
  getPostList,
}