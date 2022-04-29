### 功能

#### 五个接口

登录、注册、认证、获取标签列表、通过标签筛选帖子、创建帖子

#### 状态处理

分为三种状态：成功、失败、异常

状态码分别为：10000、20000、30000

具体错误信息位于 msg 字段中

#### 项目分层

分为三层：Controller、Service、Dao 层

属于是网上找教程和自己瞎弄的产物，比较复杂，controller 层作用不大

Controller 可以看做接口层，直接和前端进行交互，接受前端传入参数或 cookie，调用具体 service 服务，将返回结果发送给前端并设置 cookie

Service 可以看做服务层，具体业务逻辑都在这层，首先校验参数，然后根据需要调用 dao 层数据库获取结果，然后格式化数据返回 controller 层。其保证要么返回错误要么返回正确结果

Dao 可看做数据层，主要负责增删改查数据库，返回查询结果

#### 异步

异步处理用的是回调函数，想体验一下最原始的异步处理方式的缺点，结果发现确实是一种回调地狱

大致是下面这种结构

```javascript
function Controller(info, (err, data) => {
  function Service(info, (err, callback) => {
    function Dao(info, (err, callback) => {})
  })
})
```

### 技术栈

便于查阅

[nodejs: a JavaScript runtime built on Chrome's V8 JavaScript engine](https://nodejs.org/en/)

[expressjs: Node.js web application framework](https://expressjs.com/)

[mysql: The world's most popular open source database](https://www.mysql.com/)