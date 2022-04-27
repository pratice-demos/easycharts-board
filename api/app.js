const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const router = require('./router/index');

const app = express();

const http = require('http')
const server = http.createServer(app)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 导入路由
app.use('/', router);

// 错误处理
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

server.listen('4000')
