import {defineStore} from "pinia"
import {ref} from "vue"
import {login as httpLogin, register as httpRegister, auth as httpAuth} from "../http/index"

export const useUserStore = defineStore('user', function() {
  let userMsg = ref()
  let isLogin = ref(false)

  // 登录
  async function register(data) {
    let {userName, password} = data
    try {
      const res = await httpRegister({userName, password,})
      userMsg.value = {
        userName,
        userId: res.data.data.userId,
        userTime: new Date().getTime()
      }
      isLogin.value = true
    } catch (err) {
      userMsg.value = null
      isLogin.value = false
    }
    return isLogin
  }

  // 注册
  async function login(data) {
    let {userName, password} = data
    try {
      const res = await httpLogin({userName, password,})
      userMsg.value = {
        userName,
        userId: res.data.data.userId,
        userTime: new Date().getTime()
      }
      isLogin.value = true
    } catch (err) {
      userMsg.value = null
      isLogin.value = false
    }
    return isLogin
  }

  // 认证
  async function auth() {
    try {
      const res = await httpAuth()
      userMsg.value = res.data.data.userMsg
      isLogin.value = true
    } catch (err) {
      userMsg.value = null
      isLogin.value = false
    }
    return isLogin
  }

  // 判断是否登录
  function getLogin() {
    return isLogin
  }

  // 获取用户信息
  function getUserMsg() {
    return userMsg
  }

  return {
    register,
    login,
    auth,
    getLogin,
    getUserMsg,
  }
})