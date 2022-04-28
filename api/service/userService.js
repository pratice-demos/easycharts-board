const dao = require('../dao/index')
const nanoid = require('nanoid')
const utils = require('../utils/index')

/**
 * 用户注册，返回数据同接口文档
 * @param info {userName & password} 传入参数
 * @param callback {function} 回调函数
 */
function register(info, callback) {
  // 校验参数
  if(!utils.examUP(info.userName) || !utils.examUP(info.password)) {
    callback({code: 20000, msg: '用户名或密码格式错误'})
    return
  }
  // 首先检查用户表中是否有相同用户了
  dao.user.queryUserWithU(info, (err, data) => {
    if(err) {
      callback({code: 30000, msg: '数据库错误'}, null)
      return
    } else {
      // 用户存在，抛出错误
      if(data && data[0]) {
        callback({code: 20000, msg: '用户已存在'})
        return
      } else {    // 用户不存在，创建用户
        // 生成 nanoid
        const id = nanoid.nanoid(10)
        info.nanoId = id
        // 创建用户
        dao.user.addUser(info, (err, data) => {
          if (err) {
            callback({code: 30000, msg: '数据库错误'}, null)
            return
          } else {
            // 数据处理
            const res = {
              userId: data.insertId,
              nanoId: id
            }
            callback(null, res)
          }
        })
      }
    }
  })
}

/**
 * 用户登录，返回数据同接口文档
 * @param info {userName & password} 传入参数
 * @param callback {function} 回调函数
 */
function login(info, callback) {
  // 校验参数
  if(!utils.examUP(info.userName) || !utils.examUP(info.password)) {
    callback({code: 20000, msg: '用户名或密码格式不规范'})
    return
  }
  // 登录
  dao.user.queryUserWithUP(info, (err, data) => {
    if(err) {
      callback({code: 30000, msg: '数据库错误'}, null)
      return
    } else {
      // 用户不存在，登录失败
      if(!data[0]) {
        callback({code: 20000, msg: '用户名或密码错误'})
        return
      } else {
        // 生成 nanoId
        const id = nanoid.nanoid(10)
        info.nanoId = id
        // 更新 nanoId
        dao.user.updateUserNanoId(info, (err, da) => {
          if(err) {
            callback({code: 30000, msg: '数据库错误'}, null)
            return
          } else {
            const res = {
              userId: data[0].userId,
              nanoId: id
            }
            callback(null, res)
          }
        })

      }
    }
  })
}

module.exports = {
  register,
  login,
}