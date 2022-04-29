const msg = require('../config/msg.config')

/**
 * 设置 cookie
 * @param res 响应对象
 * @param data {object} 设置的 cookies
 */
function setCookie(res, data) {
  const keys = Object.keys(data)
  for(let key of keys) {
    res.cookie(key, data[key], {
      domain: msg.frontHost,
      maxAge: msg.cookieMaxAge,
      signed: true
    })
  }
}

/**
 * 删除 cookie
 * @param res 响应对象
 * @param data {array} 清除的 cookies 名
 */
function delCookie(res, data) {
  for(let item of data) {
    res.cookie(item, '', {
      maxAge: 0,
    })
  }
}

/**
 * 获取 cookie
 * @param req 请求对象
 * @param str cookie 名
 * @returns cookie 返回 cookie 字符串
 */
function getCookie(req, str) {
  return req.signedCookies[str] || ''
}

module.exports = {
  setCookie,
  delCookie,
  getCookie,
}