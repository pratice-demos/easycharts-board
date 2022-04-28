<script setup>
import {toRefs} from "vue";

const props = defineProps({
  tagList: Array,
  tagsIndex: Array,
})
const {tagList, tagsIndex} = toRefs(props)

const emits = defineEmits([
  'tagsIndex'
])

// 判断是否处于选中状态
function isSelected(tagId) {
  return (tagsIndex.value.length != 0
          && tagsIndex.value.find((item)=>(item===tagId)) != undefined)
}

// 改变选择
function changeSelect(tagId) {
  const tags = []
  // 判断是增加选择还是删除选择
  let flag = true
  for(let i=0; i<tagsIndex.value.length; i++) {
    // 已有，则删除选择
    if(tagsIndex.value[i] === tagId) {
      flag = false
      continue
    }
    tags.push(tagsIndex.value[i])
  }
  // 没有，则增加选择
  if(flag) {
    tags.push(tagId)
  }
  // 更新选中标签列表
  emits('update:tagsIndex', tags)
}
</script>

<template>
  <div class="tag-selector">
    <el-check-tag
      class="tag-item"
      v-for="item in tagList"
      :key="item.tagId"
      :checked="isSelected(item.tagId)"
      @click="changeSelect(item.tagId)"
    >
      {{item.detail}}
    </el-check-tag>
  </div>
</template>

<style scoped>
.tag-item {
  margin-right: 10px;
}
</style>