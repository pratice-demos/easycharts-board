<script setup>
import TagSelector from "../components/tags/TagSelector.vue"
import PostList from "../components/posts/PostList.vue"
import {onMounted, ref, watch} from "vue"
import {useTagStore} from "../store/tag";
import {usePostStore} from "../store/post";

// 标签列表
const tagStore = useTagStore()
const tagList = ref([])

// 获取标签列表
async function getTagList() {
  tagList.value = (await tagStore.getList()).value
  console.log(tagList.value)
}

// 存储选中的 tagId
const tagsIndex = ref([])

// 帖子数据
const postStore = usePostStore()
const postList = ref([])

// 获取帖子列表
async function getPostList() {
  const params = {
    tagList: tagsIndex.value,
    page: {
      index: pageIndex.value,
      size: pageSize.value,
    }
  }
  const postData = (await postStore.getData(params)).value
  console.log(postData)
  postList.value = postData.postList
  pageTotal.value = postData.page.total
}

// 分页数据
let pageIndex = ref(1)
let pageSize = ref(10)
let pageTotal = ref(0)

// 标签、分页变化时，重新获取帖子列表
// 标签改变时，分页也会改变，防止重复请求
const changePage = ref(true)
watch(
  () => [pageSize, tagsIndex],
  async () => {
    changePage.value = false
    pageIndex.value = 1
    await getPostList()
  },
  {deep: true}
)

watch(pageIndex, async () => {
  if(changePage.value) {
    await getPostList()
  } else {
    changePage.value = true
  }
})

// 初次进入页面
onMounted(async () => {
  // 获取标签列表
  await getTagList()
  // 初始化选中标签，最开始全部选中
  for(let tag of tagList.value) {
    tagsIndex.value.push(tag.tagId)
  }
  // 获取帖子列表
  await getPostList()
})
</script>

<template>
  <div class="page-broad">
    <div class="tag-s">
      <TagSelector
        v-model:tagsIndex="tagsIndex"
        :tagList="tagList"
      />
    </div>
    <div class="post-l">
      <PostList
        :postList="postList"
      />
      <div class="pagination">
        <el-pagination
          background
          v-model:currentPage="pageIndex"
          :pageSize="pageSize"
          :total="pageTotal"
          layout="prev, pager, next"
          :pagerCount="6"
          :hide-on-single-page="true"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-broad {
  padding: 40px 0;
}

.tag-s {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>