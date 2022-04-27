const dao = require('../dao/index')

// 获取标签列表
function getTagList (req, res) {
  // 查询数据库
  dao.tag.queryTagList((err, data) => {
    if(err) {
      console.log('getTagList err: ', err)
      return
    }
    if(data) {
      res.send(data)
    }
  })
}

module.exports = {
  getTagList,
}