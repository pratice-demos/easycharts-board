import request from "./axios"

// 请求标签列表
export async function getTagList(params) {
  return request('/api/getTagList', {
    method: 'get',
    responseType: 'json',
    params: {
      ...params
    }
  })
}

// 请求帖子列表
export async function getPostList(params) {
  return request('/api/getPostList', {
    method: 'post',
    responseType: 'json',
    params: {
      ...params
    }
  })
}