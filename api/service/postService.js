const dao = require('../dao/index')
const utils = require('../utils/index')

/**
 * 根据标签列表获取帖子列表
 * @param info {tagList & page} 传入参数
 * @param callback {function} 回调函数
 */
function getPostList(info, callback) {
  // 校验参数
  let {tagList, page} = info
  tagList = tagList ?? []
  // 校验每个 tag 为 number
  if(!utils.examArrType(tagList, 'number')) {
    callback({code: 20000, msg: '标签 id 应为整数'}, null)
    return
  }
  // 校验分页 index 和 size 范围，应位于 1 - 1000
  page = page ?? {index: 1, size: 10}
  if(!utils.examNumInRange(page.index, 1, 1000) || !utils.examNumInRange(page.size, 1, 1000)) {
    callback({code: 20000, msg: '页数和每页数据大小应在 1 到 1000 之间'}, null)
    return
  }
  // 查询数据库
  dao.post.queryPostList(info, (err, data) => {
    if(err) {
      callback({code: 30000, msg: '数据库错误'}, null)
      return
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
  getPostList,
}