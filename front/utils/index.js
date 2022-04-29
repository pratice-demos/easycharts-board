// 检测账户和密码格式是否正确
export function examUP(str) {
  if(typeof str === 'number') {
    str += ''
  }
  return !!(str) && /^[0-9a-zA-Z]*$/.test(str)
}