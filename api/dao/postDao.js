const db = require('./db')
const mysql = require('mysql')

// 根据标签列表获取帖子列表
function queryPostList(info, callback) {
  let sql = `
    SELECT postId, content, postTime, config,
    userId, userName, password, userTime,
    T.tagId AS tagId, detail
    FROM 
    (SELECT postId, content, postTime, config,
    U.userId AS userId, userName, password, userTime,
    tagId
    FROM post P
    LEFT JOIN user U 
    ON P.userId = U.userId) C
    LEFT JOIN tag T
    ON C.tagId = T.tagId
    WHERE C.tagId IN (${
      info.tagList.toString()
    })
    LIMIT ?, ?
  `
  // sql 转义
  let {index, size} = info.page
  sql = mysql.format(sql, [(index-1)*size, size])
  // sql 查询
  db.sqlConnect(sql, [], (err, res) => {
    if(err) {
      console.log('[dao] queryPostList err: ', err)
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

module.exports = {
  queryPostList,
}