<script setup>
import {reactive, ref} from "vue";
import {examUP} from "../../utils";

const loginForm = ref()

const form = reactive({
  userName: '',
  password: ''
})

const rules = reactive({
  userName: [
    {validator: validateU, trigger: 'blur'}
  ],
  password: [
    {validator: validateP, trigger: 'blur'}
  ]
})

const placeholder = reactive({
  userName: '3 到 20 位数字字母组合',
  password: '3 到 20 位数字字母组合'
})

function validateU (rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (!examUP(value)) {
    callback(new Error('请输入数字字母组合'))
  } else if(value.length < 3 || value.length > 20) {
    callback(new Error('长度在 3 到 20 之间'))
  } else {
    callback()
  }
}

function validateP (rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!examUP(value)) {
    callback(new Error('请输入数字字母组合'))
  } else if(value.length < 3 || value.length > 20) {
    callback(new Error('长度在 3 到 20 之间'))
  } else {
    callback()
  }
}

function handleLogin(loginForm) {
  if(!loginForm) return
  loginForm.validate((valid) => {
    if(valid) {
      console.log(form)
    }
  })
}

function handleRegister(loginForm) {
  if(!loginForm) return
  loginForm.validate((valid) => {
    if(valid) {
      console.log(form)
    }
  })
}
</script>

<template>
  <div class="login-page">
    <el-form
      ref="loginForm"
      :model="form"
      :rules="rules"
      label-width="60px"
      label-position="right"
      class="login-form"
    >
      <el-form-item label="账号" prop="userName">
        <el-input v-model="form.userName" :placeholder="placeholder.userName" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" autocomplete="off" :placeholder="placeholder.password" />
      </el-form-item>
      <el-form-item class="btn">
        <el-button class="login-btn" type="primary" @click="handleLogin(loginForm)">登录</el-button>
        <el-button class="register-btn" @click="handleRegister(loginForm)">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.login-form {
  width: 500px;
  margin: 130px auto;
  box-sizing: border-box;
  box-shadow: 0 0 5px var(--el-color-primary-light-3);
  border-radius: 5px;
  padding: 70px 50px;
}

.el-form-item:not(:last-child) {
  margin-bottom: 30px;
}

.el-form-item:last-child {
  margin-top: 45px;
  margin-bottom: 0;
}

.login-btn,
.register-btn {
  width: 130px;
}

.login-btn {
  margin-right: 30px;
}
</style>