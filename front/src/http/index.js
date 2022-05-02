import request from "./axios"

// 登录
export async function login(data) {
  return request('/login', {
    method: 'post',
    responseType: 'json',
    data: {
      ...data
    }
  })
}

// 注册
export async function register(data) {
  return request('/register', {
    method: 'post',
    responseType: 'json',
    data: {
      ...data
    }
  })
}

// 认证
export async function auth() {
  return request('/auth', {
    method: 'get',
    responseType: 'json',
  })
}

// 请求标签列表
export async function getTagList(params) {
  return request('/getTagList', {
    method: 'get',
    responseType: 'json',
    params: {
      ...params
    }
  })
}

// 请求帖子列表
export async function getPostList(data) {
  return request('/getPostList', {
    method: 'post',
    responseType: 'json',
    data: {
      ...data
    }
  })
}