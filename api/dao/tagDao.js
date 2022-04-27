const db = require('./db')

// 查询标签列表
function queryTagList(callback) {
  const sql = `SELECT * FROM tag`
  db.sqlConnect(sql, [], (err, res) => {
    if(err) {
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

module.exports = {
  queryTagList,
}