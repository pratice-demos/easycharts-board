const service = require('../service/index')
const cookie = require('../cookie/index')

/**
 * 用户注册接口
 * @param req 请求对象
 * @param res 响应对象
 */
function register(req, res) {
  // 取出参数
  let {userName, password} = req.body
  // 调用 service 注册方法
  service.user.register({userName, password}, (err, data) => {
    let ans = {}
    if(err) {
      ans.code = err.code
      ans.msg = err.msg
      // 删除 cookie
      cookie.delCookie(res, ['userName', 'nanoId'])
    } else {
      ans = {
        code: 10000,
        msg: '成功',
        data: {
          userId: data.userId
        }
      }
      // 设置 cookie
      cookie.setCookie(res, {
        userName: userName,
        nanoId: data.nanoId
      })
    }
    res.send(ans)
  })
}

/**
 * 用户登录接口
 * @param req 请求对象
 * @param res 响应对象
 */
function login(req, res) {
  // 取出参数
  let {userName, password} = req.body
  // 调用 service 登录方法
  service.user.login({userName, password}, (err, data) => {
    let ans = {}
    if(err) {
      ans.code = err.code
      ans.msg = err.msg
      // 删除 cookie
      cookie.delCookie(res, ['userName', 'nanoId'])
    } else {
      ans = {
        code: 10000,
        msg: '成功',
        data: {
          userId: data.userId
        }
      }
      // 设置 cookie
      cookie.setCookie(res, {
        userName: userName,
        nanoId: data.nanoId
      })
    }
    res.send(ans)
  })
}

/**
 * 用户认证接口
 * @param req 请求对象
 * @param res 响应对象
 */
function auth(req, res) {
  // 获取 cookie 登录凭证
  const userName = cookie.getCookie(req, 'userName')
  const nanoId = cookie.getCookie(req, 'nanoId')
  // 查询数据库
  service.user.auth({userName, nanoId}, (err, data) => {
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
  register,
  login,
  auth,
}