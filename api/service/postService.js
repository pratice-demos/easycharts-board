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

/**
 * 创建帖子，需要校验登录信息，返回帖子 id
 * @param info {post & userName & nanoId} 传入参数
 * @param callback {function} 回调函数
 */
function createPost(info, callback) {
  // 校验参数
  let {post, userName, nanoId} = info
  // 校验登录信息
  if(!userName || !nanoId) {
    callback({code: 20000, msg: '未登录'}, null)
    return
  }
  // 校验 post 是否符合要求
  if(!post.content || !post.config || !utils.examNumInRange(post.tagId, 1, 10000)) {
    callback({code: 20000, msg: '帖子内容不为空'}, null)
    return
  }
  // 校验用户身份信息
  dao.user.queryUserWithUN({userName, nanoId,}, (err, data1) => {
    if(err) {
      callback({code: 30000, msg: '数据库错误'}, null)
      return
    } else {
      // 判断用户是否存在，nanoId 是否正确
      const user = data1[0]
      console.log('user', user)
      if(!user) {
        callback({code: 20000, msg: '用户不存在'}, null)
        return
      }
      // 校验 tagId 是否正确
      dao.tag.queryTag({tagId: post.tagId}, (err, data2) => {
        if(err) {
          callback({code: 30000, msg: '数据库错误'}, null)
          return
        } else {
          // 判断 tagId 是否存在于数据库中
          if(!data2 || !data2[0]) {
            callback({code: 20000, msg: '帖子归类的标签不存在'}, null)
            return
          }
          console.log('tag', data2[0])
          // 查询数据库
          dao.post.addPost({post: info.post, userId: user.userId}, (err, data3) => {
            if(err) {
              callback({code: 30000, msg: '数据库错误'}, null)
            } else {
              // 数据处理
              const res = {}
              res.postId = data3.insertId
              callback(null, res)
            }
          })
        }
      })
    }
  })
}

module.exports = {
  getPostList,
  createPost,
}