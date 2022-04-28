const service = require('../service/index')

// 根据标签获取帖子列表
function getPostList(req, res) {
  let ans = {}
  let {tagList, page} = req.body
  // 查询数据库
  service.post.getPostList({tagList, page}, (err, data) => {
    let ans = {}
    if(err) {
      ans.code = err.code
      ans.msg = err.msg
    } else {
      ans = {
        code: 10000,
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