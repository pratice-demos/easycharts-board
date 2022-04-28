const dao = require('../dao/index')

// 将 dao 层查询的数据格式化返回给 controller 层
function getTagList(info, callback) {
  // 查询数据库
  dao.tag.queryTagList(info, (err, data) => {
    if(err) {
      callback({code: 30000, msg: '数据库错误'}, null)
    } else {
      // 数据处理
      data = data ?? []
      data = {
        tagList: data
      }
      callback(null, data)
    }
  })
}

module.exports = {
  getTagList,
}