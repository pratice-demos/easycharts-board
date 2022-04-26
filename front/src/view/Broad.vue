<script setup>
import TagSelector from "../components/tags/TagSelector.vue"
import {computed, onMounted, ref} from "vue"

// 存储选中的 tagId
const tagsIndex = ref([])

</script>

<template>
  <div class="page-broad">
    <div class="tag-s">
      <TagSelector
        v-model:tagsIndex="tagsIndex"
      />
    </div>
    <div class="post-l">
      <PostList
        :tagsIndex="tagsIndex"
      />
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
</style>