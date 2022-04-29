<script setup>
import {toRefs} from "vue"

const props = defineProps({
  postDetail: Object
})
const {postDetail} = toRefs(props)
</script>

<template>
  <div class="post-card card-border">
    <div class="head">
      <div class="left">
        <div class="userName link-text">
          {{postDetail.user.userName || "无名"}}
        </div>
        <div class="time">
          <span class="tip">分享于</span>
          <span>{{postDetail.post.postTime || 0}}</span>
        </div>
      </div>
      <div class="right link-text">
        <span class="icon">#</span>
        <span>{{postDetail.tag.detail}}</span>
      </div>
    </div>
    <div class="content">
      {{postDetail.post.content}}
    </div>
    <div class="config">
      {{postDetail.post.config}}
    </div>
  </div>
</template>

<style scoped>
.post-card {
  padding: 15px 20px 18px 20px;
  background-color: #fff;
  border-radius: 10px;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  align-items: center;
}

.userName {
  font-size: 15px;
}

.left>div {
  margin-right: 25px;
}

.time .tip {
  display: inline-block;
  margin-right: 20px;
}

.right .icon {
  padding: 0 8px;
}

.content {
  line-height: 26px;
  padding: 10px 0;
}

.config {
  line-height: 26px;
  background-color: #eee;
  border-radius: 5px;
  padding: 10px 15px;
}
</style>