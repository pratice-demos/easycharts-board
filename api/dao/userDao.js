const db = require('./db')
const mysql = require('mysql')

// 根据用户名查询用户，返回用户 id
function queryUserWithU(info, callback) {
  let sql = `
    SELECT userId FROM user
    WHERE userName = ?
  `
  // sql 字符串转义
  sql = mysql.format(sql, [info.userName])
  db.sqlConnect(sql, [], (err, res) => {
    if(err) {
      console.log('[dao] queryUser err: ', err)
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

// 根据用户名和密码查询用户，返回用户 id
function queryUserWithUP(info, callback) {
  let sql = `
    SELECT userId FROM user
    WHERE userName = ?
    AND password = ?
  `
  // sql 字符串转义
  sql = mysql.format(sql, [info.userName, info.password])
  db.sqlConnect(sql, [], (err, res) => {
    if(err) {
      console.log('[dao] queryUser err: ', err)
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

// 增加新用户
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

module.exports = {
  queryUserWithU,
  queryUserWithUP,
  addUser,
}