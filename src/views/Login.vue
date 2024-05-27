<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="用户名" prop="name">
      <el-input v-model="name" />
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input v-model="pwd" type="password" autocomplete="off"  />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">
        登录
      </el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>

import {computed, reactive, ref, toRefs} from 'vue';
import UserFunc from '../hooks/login'
import {useStore} from "vuex";


//创建表单数据
const  ruleForm = reactive({
    name: '',
    pwd: ''
})

// 引入接口
const {User_login} = UserFunc()
// 将reactive数据转为ref，这样方便编写
const {name,pwd} = toRefs(ruleForm)

//使用vuex
const store = useStore()

const submitForm = async () => {
  await User_login(name.value, pwd.value)
  console.log(store.state.saToken)
}


</script>