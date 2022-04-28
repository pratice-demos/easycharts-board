const dao = require('../dao/index')

/**
 * 获取标签列表，返回数据同接口文档
 * @param info {null} 不传参
 * @param callback {function} 回调函数
 */
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