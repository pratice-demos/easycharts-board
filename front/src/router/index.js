import {createRouter, createWebHashHistory} from "vue-router"
import Login from '../view/Login.vue'
import Broad from '../view/Broad.vue'

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/broad',
    component: Broad
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router