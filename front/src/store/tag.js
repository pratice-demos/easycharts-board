import {defineStore} from "pinia"
import {ref} from "vue"
import {getTagList} from "../http"

export const useTagStore = defineStore('tag', function() {
  let tagList = ref([])

  // 获取 tagList
  async function getList() {
    // 不为空，则返回
    if(!tagList.value.length) {    // 否则请求
      try {
        const res = await getTagList()
        tagList.value = res.data.data.tagList
      } catch (err) {}
    }
    return tagList
  }

  return {
    getList,
  }
})