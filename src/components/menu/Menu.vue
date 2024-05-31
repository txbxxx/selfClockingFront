<template>
  <el-row class="tac">
    <el-col :span="12">

        <el-menu
            default-active="activeIndex"
            class="el-menu-vertical-demo"
            :collapse="props.isCollapse"

            style="height: 100%;"
            @select="handleSelect"
        >
          <!--头像-->
          <el-sub-menu index="2"  >
            <template #title>
              <div style="margin: 0 auto;" >
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" shape="square" :size="props.isCollapse?30: 60"/>
              </div>
            </template>
            <el-menu-item index="2-1">退出登录</el-menu-item>
          </el-sub-menu>

          <el-divider></el-divider>

          <h5 class="mb-3">欢迎</h5>


          <el-menu-item index="2">
              <el-icon><location /></el-icon>
              <span style="margin-left: 30px">Navigator One</span>
          </el-menu-item>

          <el-menu-item index="3">
            <el-icon><icon-menu /></el-icon>
            <span style="margin-left: 30px" >任务表</span>
          </el-menu-item>
          <el-menu-item index="4" >
            <el-icon><document /></el-icon>
            <span style="margin-left: 30px">Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="5 ">
            <el-icon><setting /></el-icon>
            <span style="margin-left: 30px">Navigator Four</span>
          </el-menu-item>
        </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import {ArrowLeft, ArrowRight, Document, Location, Setting} from "@element-plus/icons-vue";
import {computed, ref} from "vue";
import UserFunc from "@/hooks";

const activeIndex = ref('1')

// 使用服务逻辑接口
const { User_logout } = UserFunc()

const props = defineProps({
  isCollapse: Boolean,
});

//菜单逻辑匹配
const handleSelect = (key, keyPath) => {
  console.log(key)
  //点击退出登录就调用退出登录
  if (key === "2-1"){
    User_logout().then((res)=>{
      console.log(res)
    })
  }
}


</script>


<style>
.el-menu.el-menu-demo:not(.el-menu--collapse) {
  border-bottom: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;

}


.el-sub-menu__icon-arrow{
  display: none  !important;
}


</style>