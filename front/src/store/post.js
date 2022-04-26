import {defineStore} from "pinia"
import {ref} from "vue"
import {getPostList} from "../http";

export const usePostStore = defineStore('post', function() {
  let postData = ref({
    postList: [],
    page: null
  })

  // 获取 postList
  // params: {
  //   page: { index, size },
  //   tagList: []
  // }
  async function getData(params) {
    try {
      const res = await getPostList(params)
      postData.value = res.data.data
    } catch (err) {}
    return postData
  }

  return {
    getData,
  }
})