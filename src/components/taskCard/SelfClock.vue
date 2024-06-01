<template>
  <div class="clock-container">
    <el-card class="clock-card">
      <div class="clock">
        {{ currentTime }}
      </div>
    </el-card>
  </div>
  <div class="add-countdown-container">
    <el-button
        icon="CirclePlus"
        @click="dialogTableVisible = true"
        :plain="true"
        class="custom-add-button"
    >
      添加
    </el-button>
  </div>
  <div class="countdown-container">
    <el-card class="countdown-card" v-for="(item, index) in countdown" :key="index">
      <el-tooltip
          class="box-item"
          effect="dark"
          content="删除倒计时"
          placement="top-start"
      >
        <template #content>
          <el-button size="small" type="text" @click="deleteCountdown(item.countdownName)">
            删除倒计时<el-icon><CircleClose /></el-icon>
          </el-button>
        </template>
        <div class="countdown-header">
          <!-- 倒计时名称 -->
          <h3 class="countdown-name">{{ item.countdownName }}</h3>
        </div>
      </el-tooltip>
      <div class="countdown-body">
        <!-- 倒计时时间 -->
        <div class="countdown-time-container">
          <span class="countdown-time">{{ formatTime(item.countdownDay) }}</span>
        </div>
      </div>
    </el-card>
  </div>

  <div class="add-countdown-dialog">
    <el-dialog v-model="dialogTableVisible" title="添加倒计时" width="500">
      <el-form :model="addCountDownFiled">
        <el-form-item label="倒计时内容" :label-width="formLabelWidth">
          <el-input v-model="addCountDownFiled.countdownName" />
        </el-form-item>
        <el-form-item label="倒计时时间" :label-width="formLabelWidth">
          <el-input v-model="addCountDownFiled.countdownDay" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取消</el-button>
          <el-button type="primary" @click="addCountdown()">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import UserFunc from "@/hooks";
import {CircleClose, CirclePlus} from "@element-plus/icons-vue";

//导出需要的接口
const {UserCountdown_listUnFinish,UserCountDown_Add,UserCountDown_delete } = UserFunc();


//获取当前时间，使用的是Date对象的toLocaleTimeString方法，作用是获取当前的时间
const currentTime = ref(new Date().toLocaleTimeString());

//添加倒计时对话框
const dialogTableVisible = ref(false);
//添加倒计时接受的内容
const addCountDownFiled = ref(
    {
      countdownName: '',
      countdownDay: '',
    }
)

const updateTime = () => {
  // 创建一个新的 Date 对象，并获取当前时间
  currentTime.value = new Date().toLocaleTimeString();
};

const countdown = ref([]);

function extracted() {
  // 获取未完成的倒计时时间
  UserCountdown_listUnFinish().then(res => {
    console.log(res)
    countdown.value = res;
  })
}

//获取未完成的倒计时
onMounted(() => {
  extracted();
  //每一秒更新时间
  const intervalId = setInterval(updateTime, 1000);
  onUnmounted(() => clearInterval(intervalId));
})


function formatTime(time) {
  // 格式化倒计时时间显示，例如：显示天数
  return `剩余 ${time} 天`;
}


//添加倒计时
const addCountdown = () => {
  // 添加倒计时逻辑
  UserCountDown_Add(addCountDownFiled.value.countdownName, addCountDownFiled.value.countdownDay).then(res => {
    console.log(res)
    countdown.value = res;
    dialogTableVisible.value = false;
    extracted()
  })

};

//删除倒计时
const deleteCountdown = (countdownName) => {
  // 删除倒计时逻辑
  UserCountDown_delete(countdownName).then(res => {
    console.log(res)
    countdown.value = res;
    extracted()
  })
};

</script>

<style scoped>
.clock-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; /* 根据需要调整 */
}

.clock-card {
  width: 300px; /* 根据需要调整 */
}

.clock {
  font-size: 48px; /* 根据需要调整字体大小 */
  font-family: 'Digital-7', sans-serif; /* 使用数字字体增强时钟效果 */
}

/* 倒计时容器 */
.countdown-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px; /* 减小卡片间间隔以适应更紧凑布局 */
  padding: 12px;
}

.countdown-card {
  width: calc(30vw - 24px); /* 使用视口宽度的百分比来适应不同屏幕，这里设为30%，并减去间隙 */
  min-width: 40px; /* 设置最小宽度以保证正方形在小屏幕上不会过小 */
  max-width: 100px; /* 可选，限制最大宽度以控制大屏幕上的大小 */
  aspect-ratio: 1 / 1; /* 确保卡片为正方形 */
  border-radius: 8px; /* 圆角边框 */
  overflow: hidden; /* 隐藏溢出内容 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  transition: transform 0.3s ease-in-out; /* 平滑过渡效果，可选 */
}

.countdown-card:hover {
  transform: translateY(-4px); /* 鼠标悬停时轻微上移，增强交互感，可选 */
}

.countdown-header {
  padding: 8px;
  background-color: #f5f5f5; /* 头部背景颜色 */
  border-bottom: 1px solid #eaeaea; /* 分隔线 */
}

.countdown-name {
  margin: 0;
  color: #333;
  font-size: 14px; /* 减小字体以适应较小的卡片 */
}

/* 响应式设计 */
@media (max-width: 768px) {
  .countdown-card {
    width: calc(50vw - 24px); /* 在较小屏幕上，卡片占据更多宽度 */
    min-width: adjust as needed; /* 可能需要根据实际情况调整最小宽度 */
  }
}

@media (max-width: 480px) {
  .countdown-card {
    width: calc(100vw - 24px); /* 在极小屏幕上，卡片全宽，考虑间距 */
    margin: 0 12px; /* 适当调整边缘间距 */
  }
}

/* 新增样式 */
.custom-add-button {
  width: 5px; /* 根据需要调整宽度 */
  height: 10px; /* 统一高度和宽度以保持正方形或适应设计 */
  transition: all 0.3s; /* 平滑过渡效果 */
}

.custom-add-button:hover {
  transform: scale(1.05); /* 悬停时轻微放大 */
  background-color: var(--el-color-primary-light-9); /* 根据Element主题调整 */
}

.custom-add-button:active {
  transform: scale(1); /* 点击后恢复原状 */
}

/* 加载状态样式 */
.is-loading {
  cursor: wait; /* 更改光标为等待状态 */
}
</style>