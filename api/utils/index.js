/**
 * 检测用户名和密码是否非空字符串，是否由数字和字母组成，长度是否为 20byte 以内
 * @param str {undefined | string} 需要检测的字符串
 * @returns {boolean}
 */
function examUP(str) {
  if(typeof str === 'number') {
    str += ''
  }
  return !!(str) && /^[0-9a-zA-Z]*$/.test(str) && str.length <= 20
}

/**
 * 校验整数是否处于 [a, b] 范围内
 * @param num 需要检测的整数
 * @param a 左界
 * @param b 右界
 * @returns {boolean}
 */
function examNumInRange(num, a, b) {
  return typeof num === 'number' && num >= a && num <= b
}

/**
 * 校验数组所有元素是否为 T 类型
 * @param arr 需要检测的数组
 * @param type {'string' | 'number' | 'boolean'} 校验类型
 * @returns {boolean}
 */
function examArrType(arr, type) {
  if(!['string', 'number', 'boolean'].find(item => item === type)) {
    return false
  }
  for(let item of arr) {
    if(typeof item !== type) {
      return false
    }
  }
  return true
}

module.exports = {
  examUP,
  examNumInRange,
  examArrType,
}