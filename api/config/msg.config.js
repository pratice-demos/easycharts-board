// back and front
let frontDomain = process.env.NODE_ENV === 'development' ? 'http://localhost' : 'https://oxaliscu.moe'
let frontPort = '3000'
let frontPath = '/board'
// Database
let sqlHost = 'localhost'
// let sqlPort = '3306'
let sqlPort = process.env.NODE_ENV === 'development' ? '3307' : '3306'
let sqlUser = 'root'
let sqlPwd = '123456'
let sqlDatabase = 'board'
let sqlConLimit = 5
// Cookie
let cookieSecret = 'SuiBianXieDe123456'
let cookieMaxAge = 180000

module.exports = {
  sqlHost,
  sqlPort,
  sqlUser,
  sqlPwd,
  sqlDatabase,
  sqlConLimit,
  cookieSecret,
  cookieMaxAge,
  frontDomain,
  frontPort,
  frontPath,
}