const db = require('./db')
const mysql = require('mysql')

/**
 * 根据标签列表查询数据库，返回含有标签的帖子
 * @param info {page & tagList} 传入参数
 * @param callback {function} 回调函数
 */
function queryPostList(info, callback) {
  let sql = `
    SELECT postId, content, UNIX_TIMESTAMP(postTime) AS postTime, config,
    userId, userName, password, UNIX_TIMESTAMP(userTime) AS userTime,
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
    ORDER BY postTime DESC
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

/**
 * 添加一条数据到帖子表
 * @param info {post, userId} 传入参数
 * @param callback {function} 回调函数
 */
function addPost(info, callback) {
  let sql = `
    INSERT INTO post (content, config, tagId, userId)
    VALUES (?, ?, ?, ?)
  `
  // sql 转义
  let {post, userId} = info
  sql = mysql.format(sql, [post.content, post.config, post.tagId, userId])
  db.sqlConnect(sql, [], (err, res) => {
    if(err) {
      console.log('[dao] addPost err: ', err)
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

module.exports = {
  queryPostList,
  addPost,
}