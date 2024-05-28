<template>
  <el-row class="tac">
    <el-col :span="12">

        <el-menu
            default-active="activeIndex"
            class="el-menu-vertical-demo"
            :collapse="props.isCollapse"

            style="height: 100%;"
            @open="handleOpen"
            @close="handleClose"
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

          <h5 class="mb-2">欢迎</h5>

          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>首页</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>

          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>任务表</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>Navigator Four</span>
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

</style>