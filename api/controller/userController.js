const service = require('../service/index')
const msg = require('../config/msg.config')

/**
 * 设置 cookie
 * @param res 响应对象
 * @param nanoId {string} 用户 nanoId
 */
function setCookie(res, nanoId) {
  res.cookie('nanoId', nanoId, {
    domain: msg.cookieDomain,
    maxAge: msg.cookieMaxAge,
    signed: true
  })
}

/**
 * 删除 cookie
 * @param res 响应对象
 */
function delCookie(res) {
  res.cookie('nanoId', '', {
    maxAge: 0
  })
}

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
      delCookie(res)
    } else {
      ans = {
        code: 10000,
        msg: '成功',
        data: data
      }
      // 设置 cookie
      setCookie(res, ans.data.nanoId)
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
      delCookie(res)
    } else {
      ans = {
        code: 10000,
        msg: '成功',
        data: data
      }
      // 设置 cookie
      setCookie(res, ans.data.nanoId)
    }
    res.send(ans)
  })
}

module.exports = {
  register,
  login,
}