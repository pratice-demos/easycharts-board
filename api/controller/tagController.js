const service = require('../service/index')

// 获取标签列表
// 校验传入参数，判断获取数据成功或失败，将数据和状态码发给前端
function getTagList (req, res) {
  service.tag.parseTagList(null, (err, data) => {
    let ans = {}
    if(err) {
      console.log('[controller] getTagList err: err same as [service]')
      ans = {
        code: 30000,
        msg: '数据库错误',
        data: data
      }
    } else {
      ans = {
        code: 20000,
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