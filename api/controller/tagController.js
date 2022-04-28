const service = require('../service/index')

// 获取标签列表
function getTagList (req, res) {
  service.tag.getTagList(null, (err, data) => {
    let ans = {}
    if(err) {
      ans.code = err.code
      ans.msg = err.msg
    } else {
      ans = {
        code: 10000,
        msg: '成功',
        data: data
      }
    }
    res.send(ans)
  })
}

module.exports = {
  getTagList,
}