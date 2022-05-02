### 介绍
EasyCharts-board 是一个软件工程作业，我负责部分是分享论坛这块

主要功能是登录、注册、浏览帖子、根据标签筛选帖子、创建帖子

我把这个项目作为一个中间项目，实现自己这部分的功能，第一次尝试后端编写，然后拼接到小组项目里，所以不是一个具有完整用户交互性的应用，比如创建帖子的前端部分没有实现

api 文件夹下为后端代码，front 文件夹下为前端代码，具体的项目说明见前后端项目的 readme 文件

### 运行

#### 数据库

最开始需要自己建表，后端没有建表语句

#### 运行后端部分

进入文件夹
```bash
cd api
```

安装依赖
```bash
pnpm install
```

运行
```bash
pnpm start
```

后端运行接口地址为
```bash
localhost:4000
```

#### 运行前端部分

进入文件夹
```bash
cd front
```

安装依赖
```bash
pnpm install
```

运行
```bash
pnpm dev
```

在浏览器查看，地址为
```bash
localhost:3000
```

### 接口文档

[接口设计文档](https://www.apifox.cn/apidoc/shared-d8c1daa3-e587-4ad0-8429-cf8619d27e99)