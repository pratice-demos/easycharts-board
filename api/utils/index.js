
// 检测用户名和密码是否非空字符串，是否由数字和字母组成，长度是否为 20byte 以内
function examUP(str) {
  if(typeof str === 'number') {
    str += ''
  }
  return str && /^[0-9a-zA-Z]*$/.test(str) && str.length <= 20
}



module.exports = {
  examUP,
}