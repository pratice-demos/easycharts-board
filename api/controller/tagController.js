const dao = require('../dao/index')

// 获取标签列表
function getTagList (req, res) {
  dao.tag.queryTagList((err, data) => {
    if(err) {
      console.log('getTagList err: ', err)
      return
    }
    if(data) {
      console.log('getTagList data', data)
      res.send(data)
    }
  })
}

module.exports = {
  getTagList,
}