const db = require('../config/db.config')
const mysql = require('mysql')

/**
 * 获取所有标签
 * @param info {null} 不传参
 * @param callback {function} 回调函数
 */
function queryTagList(info, callback) {
  const sql = `SELECT * FROM tag`
  db.sqlConnect(sql, [], (err, res) => {
    if(err) {
      console.log('[dao] queryTagList err: ', err)
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

/**
 * 根据 tagId 查询
 * @param info {tagId} 传入参数
 * @param callback {function} 回调函数
 */
function queryTag(info, callback) {
  let sql = `
    SELECT * FROM tag
    WHERE tagId = ?  
  `
  sql = mysql.format(sql, [info.tagId])
  db.sqlConnect(sql, [], (err, res) => {
    if(err) {
      console.log('[dao] queryTag err: ', err)
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

module.exports = {
  queryTagList,
  queryTag,
}