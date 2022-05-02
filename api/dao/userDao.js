const db = require('../config/db.config')
const mysql = require('mysql')

/**
 * 根据用户名查询用户，返回查询到用户信息
 * @param info {userName} 传入参数
 * @param callback {function} 回调函数
 */
function queryUserWithU(info, callback) {
  let sql = `
    SELECT userId, userName, UNIX_TIMESTAMP(userTime) AS userTime
    FROM user
    WHERE userName = ?
  `
  // sql 字符串转义
  sql = mysql.format(sql, [info.userName])
  db.sqlConnect(sql, [], (err, res) => {
    if(err) {
      console.log('[dao] queryUserWithU err: ', err)
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

/**
 * 根据用户名进和密码查询用户，返回查询到用户信息
 * @param info {userName & password} 传入参数
 * @param callback {function} 回调函数
 */
function queryUserWithUP(info, callback) {
  let sql = `
    SELECT userId, userName, UNIX_TIMESTAMP(userTime) AS userTime 
    FROM user
    WHERE userName = ?
    AND password = ?
  `
  // sql 字符串转义
  sql = mysql.format(sql, [info.userName, info.password])
  db.sqlConnect(sql, [], (err, res) => {
    if(err) {
      console.log('[dao] queryUserWithUP err: ', err)
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

/**
 * 根据用户名和 nanoId 查询用户，返回查询到的用户信息
 * @param info {userName & nanoId} 传入参数
 * @param callback {function} 回调函数
 */
function queryUserWithUN(info, callback) {
  let sql = `
    SELECT userId, userName, UNIX_TIMESTAMP(userTime) AS userTime 
    FROM user
    WHERE userName = ?
    AND nanoId = ?
  `
  // sql 字符串转义
  sql = mysql.format(sql, [info.userName, info.nanoId])
  db.sqlConnect(sql, [], (err, res) => {
    if(err) {
      console.log('[dao] queryUserWithUN err: ', err)
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

/**
 * 增加新用户
 * @param info {userName & password & nanoId} 传入参数
 * @param callback {function} 回调函数
 */
function addUser(info, callback) {
  let sql = `
    INSERT INTO user (userName, password, nanoId)
    VALUES (?, ?, ?)
  `
  // sql 字符串转义
  sql = mysql.format(sql, [info.userName, info.password, info.nanoId])
  db.sqlConnect(sql, [], (err, res) => {
    if(err) {
      console.log('[dao] addUser err: ', err)
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

/**
 * 更新用户 nanoId
 * @param info {userName & nanoId} 传入参数
 * @param callback {function} 回调函数
 */
function updateUserNanoId(info, callback) {
  let sql = `
    UPDATE user
    SET nanoId = ?
    WHERE userName = ?
  `
  // sql 字符转义
  sql = mysql.format(sql, [info.nanoId, info.userName])
  db.sqlConnect(sql, [], (err, res) => {
    if(err) {
      console.log('[dao] updateUserNanoId err: ', err)
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

module.exports = {
  queryUserWithU,
  queryUserWithUP,
  queryUserWithUN,
  addUser,
  updateUserNanoId,
}