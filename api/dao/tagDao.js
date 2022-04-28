const db = require('./db')

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

module.exports = {
  queryTagList,
}