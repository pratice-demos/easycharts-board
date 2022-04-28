const service = require('../service/index')
const cookie = require('../cookie/index')

/**
 * 获取帖子列表接口
 * @param req 请求对象
 * @param res 响应对象
 */
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

/**
 * 创建帖子接口，读取本地登录凭证
 * @param req 请求对象
 * @param res 响应对象
 */
function createPost(req, res) {
  let ans = {}
  // 获取 cookie 登录凭证
  const userName = cookie.getCookie(req, 'userName')
  const nanoId = cookie.getCookie(req, 'nanoId')
  const info = {
    userName,
    nanoId,
    post: req.body
  }
  // 查询数据库
  service.post.createPost(info, (err, data) => {
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
  createPost,
}