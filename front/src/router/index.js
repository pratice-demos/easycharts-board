import {createRouter, createWebHashHistory} from "vue-router"
import Login from '../view/Login.vue'
import Broad from '../view/Broad.vue'
import {useUserStore} from "../store/user"

const routes = [
  {
    path: '/',
    name: 'Board',
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
  base: '/board/',
  routes,
})

// 路由守卫，进入每个页面前检测是否登录
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  // 未认证跳转到登录页面
  if(to.name !== 'Login' && !userStore.getLogin().value && !(await userStore.auth()).value) {
    next({name: 'Login'})
  } else if(to.name === 'Login' && userStore.getLogin().value) {
    next({name: 'Board'})
  } else {
    next()
  }
})

export default router