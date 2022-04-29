const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const router = require('./router/index')
const msg = require('./config/msg.config')

const app = express()

const http = require('http')
const server = http.createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(msg.cookieSecret))

// 设置跨域
app.use(cors({
  origin: [`${msg.frontDomain}:${msg.frontPort}`],   // 允许该域名下的请求
  methods: ["GET", "POST"], // 允许接受的请求类型
  alloweHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],　　//请求头
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  credentials: true,
}))

// 导入路由
app.use('/', router)

// 错误处理
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

server.listen(msg.backPort)
