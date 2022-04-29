import {createRouter, createWebHashHistory} from "vue-router"
import Login from '../view/Login.vue'
import Broad from '../view/Broad.vue'
import {useUserStore} from "../store/user"

const routes = [
  {
    path: '/',
    name: 'Broad',
    component: Broad
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 路由守卫，进入每个页面前检测是否登录
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  // 未认证跳转到登录页面
  if(to.name !== 'Login' && !userStore.getLogin() && !(await userStore.auth())) {
    next({name: 'Login'})
  } else if(to.name === 'Login' && (userStore.getLogin() || (await userStore.auth()))) {
    next({name: 'Broad'})
  } else {
    next()
  }
})

export default router