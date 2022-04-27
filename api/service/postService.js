const dao = require('../dao/index')

// 将 dao 层查询的数据格式化返回给 controller 层
function parsePostList(info, callback) {
  // 查询数据库
  dao.post.queryPostList(info, (err, data) => {
    if(err) {
      console.log('[service] parsePostList err: err same as [dao]')
      callback(err, null)
    } else {
      // 数据处理
      const res = {}
      data = data ?? []
      // 分页数据
      res.page = {
        size: info.page.size,
        index: info.page.index,
        total: data.length
      }
      // 帖子列表
      res.postList = []
      for(let i in data) {
        res.postList[i] = {
          post: {
            postId: data[i].postId,
            content: data[i].content,
            config: data[i].config,
            postTime: data[i].postTime,
          },
          user: {
            userId: data[i].userId,
            userName: data[i].userName,
            userTime: data[i].userTime,
          },
          tag: {
            tagId: data[i].tagId,
            detail: data[i].detail,
          }
        }
      }
      callback(null, res)
    }
  })
}

module.exports = {
  parsePostList,
}