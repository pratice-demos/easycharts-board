<script setup>
import {toRefs} from "vue";
import defaultAvatar from '../../assets/default-avatar.jpg'

const props = defineProps({
  postDetail: Object
})
const {postDetail} = toRefs(props)
</script>

<template>
  <div class="post-card card-border">
    <div class="head">
      <div class="left">
        <div class="avatar-con">
          <el-image
            class="avatar"
            :src="postDetail.user.avatar || defaultAvatar"
            :fit="cover"
          >
          </el-image>
        </div>
        <div class="userName">
          {{postDetail.user.userName || "无名"}}
        </div>
        <div class="time">
          {{postDetail.post.time || 0}}
        </div>
      </div>
      <div class="right link-text">
        <span class="icon">#</span>
        <span>{{postDetail.post.tag.desc}}</span>
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

.left>div {
  margin-right: 20px;
}

.avatar-con {
  flex: none;
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
}

.right .icon {
  padding: 0px 8px;
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