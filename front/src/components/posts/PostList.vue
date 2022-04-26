<script setup>
import {onMounted, ref, toRefs, watch} from "vue";
import PostCard from './PostCard.vue'
import {usePostStore} from "../../store/post";

// 标签
const props = defineProps({
  tagsIndex: Array
})
const {tagsIndex} = toRefs(props)

// 帖子数据
const postStore = usePostStore()
const postList = ref([])

onMounted(async() => {
  await getPostList()
})

// 分页数据
let pageIndex = ref(1)
let pageSize = ref(10)
let pageTotal = ref(0)

// 标签、分页变化时，重新获取帖子列表
// 标签改变时，分页也会改变，防止重复请求
const changePage = ref(true)
watch(
  () => [pageSize, tagsIndex],
  async (val, preVal) => {
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
</script>

<template>
  <div class="post-list">
    <PostCard
      class="post-item"
      v-for="item in postList"
      :key="item.postId"
      :postDetail="item"
    />
  </div>
  <div class="pagination">
    <el-pagination
      background
      v-model:currentPage="pageIndex"
      :pageSize="pageSize"
      :total="pageTotal"
      layout="prev, pager, next"
      :pager-count="6"
    />
  </div>
</template>

<style scoped>
.post-list {

}

.post-item {
  margin: 12px 0;
}

.pagination {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>