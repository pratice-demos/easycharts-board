const service = require('../service/index')

// 根据标签获取帖子列表
function getPostList(req, res) {
  // 校验参数
  let {tagList, page} = req.body
  tagList = tagList ?? []
  // tagList = [1]
  page = page ?? {index: 0, size: 10}
  // 查询数据库
  service.post.parsePostList({tagList, page}, (err, data) => {
    let ans = {}
    if(err) {
      console.log('[controller] getPostList err: err same as [service]')
      ans = {
        code: 30000,
        msg: '数据库错误',
        data: data
      }
    } else {
      ans = {
        code: 20000,
        msg: '成功',
        data: data
      }
    }
    res.send(ans)
  })
}

module.exports = {
  getPostList,
}