<template>
  <div>
    <router-link to="/login/loginFrom"></router-link>
    <router-view></router-view>
  </div>
</template>


<script setup>
// 导入Login界面，使用setup语法糖就不需要使用components属性了
import Login from "./views/Login.vue"

</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
