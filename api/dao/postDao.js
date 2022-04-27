const db = require('./db')
const mysql = require('mysql')

// 根据标签列表获取帖子列表
function queryPostList(info, callback) {
  let sql = `
    SELECT postId, content, postTime,
    userId, userName, password, userTime,
    T.tagId AS tagId
    FROM 
    (SELECT postId, content, postTime,
    U.userId AS userId, userName, password, userTime,
    tagId
    FROM post P
    LEFT JOIN user U 
    ON P.userId = U.userId) C
    LEFT JOIN tag T
    ON C.tagId = T.tagId
    WHERE C.tagId IN (${
      info.tagList.toString()
    })`
  db.sqlConnect(sql, [], (err, res) => {
    if(err) {
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

module.exports = {
  queryPostList,
}