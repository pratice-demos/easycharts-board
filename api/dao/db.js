const mysql = require('mysql')
const msg =  require('../config/msg.config')

module.exports = {
  config: {
    host: msg.sqlHost,
    port: msg.sqlPort,
    user: msg.sqlUser,
    password: msg.sqlPwd,
    database: msg.sqlDatabase,
    connectionLimit: msg.sqlConLimit,
  },

  // 连接池
  sqlConnect: function(sql, sqlArr, callBack) {
    const pool = mysql.createPool(this.config)
    pool.getConnection((err, conn) => {
      if(err) {
        console.log('sql connect err', err)
        return;
      }
      conn.query(sql, sqlArr, callBack)
      conn.release()
    })
  }
}