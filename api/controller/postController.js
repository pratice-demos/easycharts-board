const service = require('../service/index')

// 根据标签获取帖子列表
function getPostList(req, res) {
  let ans = {}
  // 校验参数
  let {tagList, page} = req.body
  tagList = tagList ?? []
  // 校验每个 tag 为 number
  for(let item of tagList) {
    if(!Number.isInteger(item)) {
      ans = {
        code: 30000,
        msg: '标签 id 应为整数',
      }
      res.send(ans)
      return
    }
  }
  // 校验分页 index 和 size 范围，应位于 1 - 1000
  page = page ?? {index: 1, size: 10}
  if(page.index < 1 || page.index > 1000
    || page.size < 1 || page.size > 1000) {
    ans = {
      code: 30000,
      msg: '页数和每页数据大小应在 1 到 1000 之间'
    }
    res.send(ans)
    return
  }
  // 查询数据库
  service.post.parsePostList({tagList, page}, (err, data) => {
    if(err) {
      console.log('[controller] getPostList err: err same as [service]')
      ans = {
        code: 20000,
        msg: '数据库错误',
      }
      res.send(ans)
    } else {
      ans = {
        code: 10000,
        msg: '成功',
        data: data
      }
      res.send(ans)
    }
  })
}

module.exports = {
  getPostList,
}