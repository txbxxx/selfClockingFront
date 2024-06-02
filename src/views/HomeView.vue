<template>
  <div class="center-Page">
    <el-container>
      <el-container  >
        <transition name="slide">
          <el-aside    :width="isCollapse?'70px':'200px'"  style="height: 100%;"  class="TaskPageAside">
            <el-space direction="vertical" :size="200 " >

              <Menu :isCollapse="isCollapse"  />

              <div class="toggle-button" @click="toggleCollapse">
                <el-icon v-if="isCollapse"><arrow-right /></el-icon>
                <el-icon v-else><arrow-left /></el-icon>
              </div>
            </el-space>
          </el-aside>
        </transition>
          <el-main  :class="mainStyle" class="TaskPageMain">
            <el-row :gutter="10">
              <el-col :span="7">
                  <SelfClock />
              </el-col>
              <el-col :span="10">
                <TaskFiled />
              </el-col>
              <el-col :span="7">
                <Clock />
              </el-col>
            </el-row>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script setup>
// @ is an alias to /src
import Menu from "../components/menu/Menu.vue";
import Clock from "../components/clockTask/Clock.vue";
import TaskFiled  from "@/components/taskfiled/TaskFiled.vue";
import SelfClock  from "@/components/taskCard/SelfClock.vue";
import {computed, ref} from 'vue'
import {ArrowLeft, ArrowRight, Document, Location, Setting} from "@element-plus/icons-vue";

// 侧边栏逻辑-折叠
const isCollapse = ref(true)


// 动态计算 main 的宽度calc作用是适应宽度
const mainStyle = computed(() => {
  return {
    width: isCollapse.value ? 'calc(100% - 50px)' : 'calc(100% - 200px)',
  };
});


const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

</script>

<style lang="scss">
.center-Page{
  width: 100%;
  height: 97.5vh;
  background-color: #eef4f9;
}

.TaskPageMain {
  transition: width 0.3s;
  background-color: #F5F7FA;
}

.TaskPageAside {
  transition: width 0.3s;
}



.flex-grow {
  flex-grow: 1;
}






.slide-enter-active,
.slide-leave-active {
  transition: width 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  width: 70px;
}


</style>