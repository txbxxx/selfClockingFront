<template>
  <div class="center-Page">
    <el-container>
      <el-container  >
          <el-aside    :width="isCollapse?'70px':'200px'"  style="height: 700px;"  class="TaskPageAside">
            <el-row class="tac">
              <el-col :span="12">
                <el-space direction="vertical" :size="300 " >
                  <el-menu
                      default-active="2"
                      class="el-menu-vertical-demo"
                      :collapse="isCollapse"

                      style="height: 100%;"
                      @open="handleOpen"
                      @close="handleClose"
                  >
                      <!--头像-->
                      <el-sub-menu index="2"  >
                        <template #title>
                          <div style="margin: 0 auto;" >
                            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" shape="square" :size="isCollapse?30: 60"/>
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

                  <div class="toggle-button" @click="toggleCollapse">
                    <el-icon v-if="isCollapse"><arrow-right /></el-icon>
                    <el-icon v-else><arrow-left /></el-icon>
                  </div>
                </el-space>
              </el-col>
            </el-row>
          </el-aside>
          <el-main  :class="mainStyle" class="TaskPageMain">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script setup>
// @ is an alias to /src
import Logout from "../components/logout/Logout.vue";
import {computed, ref} from 'vue'
import UserFunc from "@/hooks";
import {ArrowLeft, ArrowRight, Document, Location, Setting} from "@element-plus/icons-vue";
const { User_logout } = UserFunc()
const activeIndex = ref('1')

// 侧边栏逻辑-折叠
const isCollapse = ref(true)


// 动态计算 main 的宽度calc作用是适应宽度
const mainStyle = computed(() => {
  return {
    width: isCollapse.value ? 'calc(100% - 70px)' : 'calc(100% - 200px)',
  };
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


// 侧边栏逻辑-折叠
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

</script>

<style lang="scss">
.TaskPageAside {
  transition: width 0.3s;
}

.TaskPageMain {
  transition: width 0.3s;
  background-color: #F5F7FA;
}

.flex-grow {
  flex-grow: 1;
}

.center-Page{
  width: 100%;
  height: 97.5vh;
}

.TaskPageHeader{
  height: 300px;
}
.el-menu.el-menu-demo:not(.el-menu--collapse) {
  border-bottom: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-sub-menu__icon-arrow{
  display: none  !important;
}


.el-main {

}


</style>