<template>
  <div>
    <el-button type="primary" @click="logout">退出</el-button>
  </div>
</template>

<script setup>
import UserFunc from "../../hooks";

const { User_logout } = UserFunc()
function logout() {
  User_logout().then((res)=>{
    console.log(res)
  })
}

</script>