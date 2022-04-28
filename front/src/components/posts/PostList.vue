<script setup>
import {toRefs} from "vue";
import PostCard from './PostCard.vue'

// 标签
const props = defineProps({
  postList: Array
})
const {postList} = toRefs(props)
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
</template>

<style scoped>
.post-list {

}

.post-item {
  margin: 12px 0;
}
</style>