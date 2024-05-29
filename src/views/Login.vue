<template>
  <div class="login radius">

    <div class="loginFrom">

      <div class="loginMenu">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#0f1826"
            text-color="#FFFFFF"
            active-text-color="#ffd04b"
            @select="handleSelect">
          <el-menu-item index="1"  >
            <router-link to="/login/loginFrom" tag="span" style="text-decoration: none;">登录
            </router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/login/registerFrom" tag="span" style="text-decoration: none;">注册</router-link>
          </el-menu-item>
        </el-menu>
        <router-view></router-view>
      </div>

      <el-divider border-style="none" direction="vertical" class="fgx" />
      <div class="loginImg">
        <div class="demo-image">
          <div  class="block">
            <el-image style= "width: 100%; height: 389px; border-radius: 10px;" :src="require('../assets/cloud.png')" alt="图片"  :fit="fit"/>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script setup>

import {computed, reactive, ref, toRefs} from 'vue';
import LoginFrom  from "@/components/loginFrom/LoginFrom.vue";
import {Stamp, User,Key} from "@element-plus/icons-vue";


// 菜单，设置默认激活的主键，就是默认选中的组件
const activeIndex = ref('1');

//图片
// const url = '../assets/cloud.png'

function handleSelect(key, keyPath) {
  console.log(key, keyPath);
}
</script>


<style scoped>
.loginFrom {
  background-color: #0f1826;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 400px;
  box-shadow: var(--el-box-shadow-light);
  border-radius: 10px;
}

.login{
  background-image: url("../assets/b1.jpg");
  background-size: 100%;
  width: 100%;
  height: 97.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
}




.loginImg{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px
}

.el-menu-demo{
  height: 30px;
}

.el-menu.el-menu-demo:not(.el-menu--collapse) {
  border-bottom: none;
}

</style>