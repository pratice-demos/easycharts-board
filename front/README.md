### 功能

#### 两个页面

首页，登录页。首页展示帖子数据，登录页实现登录注册。

#### 页面逻辑

用户通过访问首页，先用尝试本地 cookie 进行认证，认证成功，返回用户信息，加载首页数据；认证失败，跳转到登录页

用户在登录页进行登录或注册，登录（注册）成功，返回用户 id，将用户信息认证信息存储在 cookie 中保存，在有效期内可以通过认证验证身份而无需重新登录；登录（注册）失败，停留在注册页面

#### 用户操作

登录、注册、查看标签列表、查看帖子列表

### 技术栈

便于查阅

[axios: Promise based HTTP client for the browser and node.js](https://axios-http.com/docs/intro)

[element-plus: a Vue 3 based component library for designers and developers](https://element-plus.org/zh-CN/component/button.html)

[pinia: The Vue Store that you will enjoy using](https://pinia.vuejs.org/introduction.html)

[vuejs: The Progressive JavaScript Framework](https://v3.cn.vuejs.org/guide/introduction.html)

[vue-router: The official router for Vue.js](https://router.vuejs.org/guide/)

[Iconify: One icon framework to replace them all](https://docs.iconify.design/icon-components/vue/)

[vite: Next Generation Frontend Tooling](https://vitejs.dev/guide/)

[zhongguose: Chinese Colors](http://zhongguose.com/)