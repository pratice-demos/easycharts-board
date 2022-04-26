import axios from 'axios'
import {getMessage} from "./status"
import {ElMessage} from "element-plus"

// 服务器地址
const baseURL = "http://127.0.0.1:4523/mock/910742"
// const baseURL = "https://demo.com"

// 实例化和初始化 axios
const request = axios.create({
  baseURL,
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  },
  // 是否跨站点访问控制请求
  withCredentials: false,
  timeout: 30000,
  // 请求格式化
  transformRequest: [(data) => {
    data = JSON.stringify(data)
    return data
  }],
  transformResponse: [(data) => {
    if(typeof data === 'string' && data.startsWith('{')) {
      data = JSON.parse(data)
    }
    return data
  }]
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 获取 token
  let token = localStorage.getItem('token')
  if(token) {
    config.headers.Authorization = `${token}`
  }
  return config
}, (error) => {
  console.log('request interceptor error', error);
  ElMessage.error('网络错误！')
  Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use((response) => {
  const status = response.status
  let msg = ''
  if(status < 200 || status >= 300) {
    // 处理 http 错误，抛到业务代码
    msg = getMessage(status)
    if(typeof response.data === 'string') {
      response.data = {msg}
    } else {
      response.data.msg = msg
    }
    console.log("network error", response)
    ElMessage.error('网络错误！')
    Promise.reject(response)
  }
  return response
}, (error) => {
  // 请求被取消
  if(axios.isCancel(error)) {
    console.log('repeated request: ' + error.message)
    ElMessage.error('重复请求')
  } else {
    console.log('response interceptor error', error);
    ElMessage.error('网络错误！')
  }
  Promise.reject(error)
})

export default request