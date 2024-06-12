<template>
  <div class="clock-container">
    <el-card class="clock-card">
      <div class="container">
        <div>
          <div class="title">
            <text class="title-text" style="color: #7e1671;">你已学习:{{ learnDate }}分钟</text>
          </div>
        </div>
        <div class="countdown">
          {{ displayMinutes }}:{{ displaySeconds < 10 ? '0' + displaySeconds : displaySeconds }}
        </div>
      </div>
      <div class="controls">
        <div>
          <el-input-number
              v-model="countdownMinutesInput"
              @change="updateCountdownMinutes"
              color="#7e1671"
              :min="0"
              :max="60"
              :step="1"
          />
        </div>
        <div>
          <el-button style="color: #894276; background-color: #d1c2d3; text-align: center; margin-top: 40px" size="large" @click="startCountdown">
            开始学习之旅！
          </el-button>
        </div>
      </div>
    </el-card>
  </div>

  <el-card >
    <template #header>
      <div class="header-container">
        <el-text class="header-title">倒计时</el-text>
        <div class="add-button-container" @click="dialogTableVisible = true">
          <el-icon class="add-icon" color="#409eff">
            <CirclePlus />
          </el-icon>
        </div>
      </div>
    </template>
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
        </el-tooltip>
        <div class="countdown-header">
          <!-- 倒计时名称 -->
          <h3 class="countdown-name">{{ item.countdownName }}</h3>
        </div>
        <div class="countdown-body">
          <!-- 倒计时时间 -->
          <div class="countdown-time-container">
            <span class="countdown-time">{{ formatTime(item.countdownDay,item.countdownPast) }}</span>
          </div>
        </div>
      </el-card>
    </div>
  </el-card>

  <!--弹出框添加倒计时-->
  <div class="add-countdown-dialog">
    <el-dialog v-model="dialogTableVisible" title="添加倒计时" width="500">
      <el-form :model="addCountDownFiled">
        <el-form-item label="倒计时内容" >
          <el-input v-model="addCountDownFiled.countdownName" />
        </el-form-item>
        <el-form-item label="倒计时时间" >
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
import {ref, onMounted, onUnmounted, computed} from 'vue';
import UserFunc from "@/hooks";
import {CircleClose, CirclePlus} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

//导出需要的接口
const {UserCountdown_listUnFinish,UserCountDown_Add,UserCountDown_delete,
  UserCountdown_update,getUserLearnData,updateUserLearnData} = UserFunc();


//倒计时功能
const countdownTime = ref(0);


//默认分钟数10
const countdownMinutesInput = ref(10);

//计算时间
const displayMinutes = computed(() => Math.floor(countdownTime.value / 60));
const displaySeconds = computed(() => countdownTime.value % 60);

// 定时器的变量
let countdownInterval;


//倒计时
const overtime = ref(false);

//启动倒计时
const startCountdown = () => {
  ElMessage({
    message: '倒计时已启动,学习冲冲冲(请勿刷新页面哦)',
    type: 'success',
    duration: 3000,
  })
  //初始化时间,将分钟数转换为秒数
  countdownTime.value = countdownMinutesInput.value * 60;
  // 清除定时器和重置状态
  if (countdownInterval) {
    overtime.value = false;
    clearInterval(countdownInterval);
  }
  // 启动定时器，每秒递减1秒
  countdownInterval = setInterval(() => {
    if (countdownTime.value > 0) {
      countdownTime.value--;
    } else {
      //如果完成了打卡
      overtime.value = true;
      console.log(countdownMinutesInput)
      //更新用户学习时间
      updateUserLearnData(countdownMinutesInput.value);
      clearInterval(countdownInterval);
    }
  }, 1000);
};

// 统计学习时间
const learnDate = ref(0);

// 更新分钟数
const updateCountdownMinutes = (event) => {
  countdownMinutesInput.value = event;
};

// 更新用户的学习时间
onMounted(() => {
  const userLearnData = getUserLearnData().then(res => {
    learnDate.value = res;
  });
  updateCountdownStatus()
  extracted()
});

//添加倒计时对话框
const dialogTableVisible = ref(false);
//添加倒计时接受的内容
const addCountDownFiled = ref(
    {
      countdownName: '',
      countdownDay: '',
    }
)




const countdown = ref([]);

function extracted() {
  // 获取未完成的倒计时时间
  UserCountdown_listUnFinish().then(res => {
    console.log(res)
    countdown.value = res;
  })
}



function formatTime(time,pastTime) {
  // 格式化倒计时时间显示，例如：显示天数
  return `剩余 ${time-pastTime}天`;
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


//更新倒计时状态
const updateCountdownStatus = () => {
  UserCountdown_update().then(res => {
    extracted();
  })
}
</script>

<style lang="scss" scoped>
// 基础布局和颜色设置
$primary-color: #7e1671;
$secondary-color: #d1c2d3;
$background-color: #f5f5f5;
$text-color: #303133;
$font-size-large: 24px;
$font-size-medium: 18px;
$font-size-small: 14px;

.clock-container {
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: $background-color;
}

.clock-card {
  width: 100%;
  margin-bottom: 20px;
}



.add-countdown-container {
  display: flex;
  justify-content: center;
  height: 3px;
}


.custom-add-button {
  font-size: 16px;
  color: #409eff;
  border-color: #409eff;
  &:hover {
    background-color: #409eff;
    color: #fff;
  }
}

// 倒计时卡片容器
.countdown-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.countdown-card {
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  border-style: solid;
  border-color: #7e1671;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  width: 300px;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
}

// 倒计时显示样式
.countdown {
  font-size: 2rem;
  color: $primary-color;
  margin: 1rem 0;
}

// 控制按钮和输入框样式
.controls {
  display: flex;
  flex-direction: column;
  align-items: center;

  .el-input-number {
    margin-bottom: 1rem;
  }

  .el-button {
    padding: 10px 20px;
    font-size: $font-size-medium;
    border-radius: 20px;
    background-color: $secondary-color;
    color: $primary-color;
    &:hover {
      background-color: lighten($secondary-color, 10%);
    }
  }
}

// 对话框样式
.add-countdown-dialog {
  .el-dialog {
    width: 500px;
    .el-dialog__header {
      font-size: $font-size-large;
      color: $primary-color;
    }
    .el-form-item__label {
      color: $text-color;
    }
    .el-input__inner {
      border-radius: 10px;
    }
  }
}


.title-text {
  color: #7e1671;
  font-size: 30px; /* 调整字体大小 */
  font-weight: bold; /* 加粗字体 */
  text-align: center; /* 居中对齐 */
  border: 2rpx solid #7e1671; /* 添加边框 */
  padding: 10rpx; /* 添加内边距 */
  border-radius: 10rpx; /* 圆角边框 */
  background-color: #f3e5f5; /* 背景色 */
}

.countdown-header {
  padding: 10px;
  background-color: #f5f5f5; /* 浅色背景 */
  border-bottom: 1px solid #eaeaea; /* 轻微的分隔线 */
  border-top-left-radius: 10px; /* 圆角边框 */
  border-top-right-radius: 10px;
}

.countdown-name {
  margin: 0;
  font-size: 18px; /* 倒计时名称的字体大小 */
  color: #333; /* 字体颜色 */
  font-weight: bold; /* 加粗 */
  text-align: center; /* 文本居中 */
}

.countdown-body {
  padding: 10px;
  background-color: #ffffff; /* 白色背景 */
  border-bottom-left-radius: 10px; /* 圆角边框 */
  border-bottom-right-radius: 10px;
  text-align: center; /* 文本居中 */
}

.countdown-time-container {
  font-size: 32px; /* 倒计时时间的字体大小 */
  color: #7e1671; /* 字体颜色 */
  margin-top: 10px; /* 上边距 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

/* 如果需要为倒计时时间添加一些动画效果 */
@keyframes blink-effect {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
}

.countdown-time {
  animation: blink-effect 1s infinite; /* 倒计时时间闪烁效果 */
}

/* 响应式设计 */
@media (max-width: 768px) {
  .countdown-name {
    font-size: 16px; /* 在小屏幕上减小字体大小 */
  }
  .countdown-time-container {
    font-size: 28px; /* 在小屏幕上减小倒计时时间的字体大小 */
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.el-button.is-circle{
  height: 5px;
  width: 3px;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #ffffff; /* 标题栏背景颜色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 轻微的阴影 */
}

.header-title {
  font-size: 20px; /* 标题字体大小 */
  font-weight: bold; /* 粗体 */
  color: #303133; /* 字体颜色 */
}

.add-button-container {
  cursor: pointer; /* 当鼠标悬停时显示为可点击状态 */
  padding: 5px; /* 点击区域的内边距 */
  border-radius: 50%; /* 圆形按钮 */
  background-color: #d1c2d3; /* 按钮背景颜色 */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; /* 按钮宽度 */
  height: 40px; /* 按钮高度 */
  transition: background-color 0.3s; /* 背景颜色变化的过渡效果 */
}

.add-button-container:hover {
  background-color: #c0b4cc; /* 鼠标悬停时的背景颜色 */
}

.add-icon {
  font-size: 24px; /* 图标大小 */
}
</style>
