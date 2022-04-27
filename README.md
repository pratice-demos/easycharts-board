### 介绍
EasyCharts-board 是一个软件工程作业，我负责部分是分享论坛这块

api 部分为后端，front 部分为前端

### 技术栈

vue

express

mysql


### 项目分层

分层：Controller、Service、Dao 层，网上找教程和自己瞎弄的产物，不仅花里胡哨，甚至没有必要 

Controller 调用 Service 获取格式化数据，以及发送数据给前端

Service 校验传入参数是否正确，调用 Dao 查询数据，将查询到的数据格式化为前端需要形式返回

Dao 查询数据库，并将结果返回

并且异步用的是回调函数，看了 mysql 有支持 promise 的，但是单纯想体验一下回调地狱是个什么概念

大致是下面这种结构

```javascript
function Controller(info, (err, callback) => {
  function Service(info, (err, callback) => {
    function Dao(info, (err, callback) => {})
  })
})
```