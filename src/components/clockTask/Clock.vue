<template>
  <div class="ClockPage">
  <el-calendar>
    <template #date-cell="{ data }">
      <div :class="data.isSelected ? 'is-selected' : ''"  @click="dialogOpen(data.day)">


        <!--              <div v-if="getDateItem(data.day)" style="font-size: 5px">-->
        <!--                {{ getDateItem(data.day).scheduleFiled}}-->
        <!--              </div>-->
        <el-tooltip
            class="item-tooltip"
            effect="dark"
            placement="top"
        >
          <template #content>
            <div v-for="(item, index) in getDateItemTooltipContent(data.day)" :key="index" class="schedule-item">
              {{ item.scheduleFiled }}
              <el-button size="mini" type="text" @click="deleteScheduleByField(item.scheduleFiled, data.day)">
                <el-icon><CircleClose /></el-icon>
              </el-button>
            </div>
            <div v-if="getDateItemTooltipContent(data.day).length === 0">无日程安排</div>
          </template>
          <div>{{ data.day.split('-').slice(2).join('-') }}</div>
        </el-tooltip>
      </div>
    </template>
  </el-calendar>
  <el-dialog v-model="dialogFormVisible" title="添加日程">
    <el-form :model="calendar">
      <el-form-item label="日程名" :label-width="100">
        <el-input v-model="calendar.filed" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="saveSchedule">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <div class="word">
    <el-card header="每日一句">
      <el-text class="mx-1" type="primary">{{ mingYan }}</el-text>
    </el-card>
  </div>
  </div>
</template>


<script setup>
import { ref} from 'vue'
import UserFunc from "@/hooks";
import {onMounted} from 'vue'
import {CircleClose} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";


// 在页面加载时就获取数据
onMounted(() => {
  getSchedule()
  getMingYanFunc()
})

// 获取用户日程接口
const {UserSchedule_list, UserSchedule_add, User_getFamous,UserSchedule_delete} = UserFunc()
// 日程数据
const dateList = ref([])
//鼠标悬停的日程,也就是过滤后的日期
// 表单数据
const calendar = ref({
  filed: '',
  date: '',
})
// 弹窗设置false为关闭
const dialogFormVisible = ref(false);

// 名人名言
const mingYan = ref('')

// 添加一个方法来查找dateList中对应日期的项,这里是查询单个
// const getDateItem = (day) => {
//   return dateList.value.find(v => v.date === day);
// }


//查询多个
const getDateItems = (day) => {
  return dateList.value.filter(v => v.date === day);

}

// 检测是否打卡弹窗
const dialogOpen = (date) => {
  dialogFormVisible.value = true;
  calendar.value = {date: date}
}


//获取日程数据
const getSchedule = () => {
  UserSchedule_list().then(res => {
    dateList.value = res
  })
}


//获取鼠标悬停的当日的日程
// 修改getDateItemTooltipContent函数以返回日程项数组
const getDateItemTooltipContent = (day) => {
  // 获取所有该日的日程项
  // 直接返回这些日程项，稍后在模板中处理
  return getDateItems(day);
};;


//保存表单
const saveSchedule = () => {
  // 添加日程
  UserSchedule_add(calendar.value.filed, calendar.value.date).then(() => {
    // 更新数据
    getSchedule()
  }).finally(
      // 无论成功还是错误关闭弹窗
      dialogFormVisible.value = false
  )
}

//删除日程
// 删除日程
const deleteScheduleByField = (scheduleFiled, date) => {
  UserSchedule_delete(scheduleFiled, date).then(() => {
    // 成功删除后更新日程列表
    getSchedule();
  }).catch(error => {
    console.error('删除日程失败:', error);
  });
};


//获取名人名言
const getMingYanFunc = () => {
  User_getFamous().then(res => {
    mingYan.value = res.data.replace(/<\/?p>/g, '')
  }).catch(err => {
      })
}

</script>


<style>
.is-selected {
  color: #1989fa;
}

.ClockPage{
  border-radius: 37px;
  box-shadow: var(--el-box-shadow-lighter);
}

.center-Page .el-calendar-table .el-calendar-day {
  box-sizing: border-box;
  padding: 0;
  height: 40px;
  line-height: 40px;
}

.center-Page .el-calendar-table .el-calendar-day:hover {
  border-radius: 37px;
}


/* 去除日历边框*/
.center-Page .el-calendar-table td {
  position: relative;
  border: 0px;

}

/* 今天日期的背景颜色*/


.center-Page .el-icon {
  position: absolute;
}

</style>
