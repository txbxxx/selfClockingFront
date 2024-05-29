<template>
  <el-calendar>
    <template #date-cell="{ data }">
      <div :class="data.isSelected ? 'is-selected' : ''"  @click="dialogOpen(data.day)">
        <div>{{ data.day.split('-').slice(2).join('-') }}</div>
        <div v-if="getDateItem(data.day)" style="font-size: 10px">

          {{ getDateItem(data.day).scheduleFiled}}

        </div>
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
</template>


<script setup>
import {reactive, ref} from 'vue'
import { ElMessageBox } from 'element-plus'
import UserFunc from "@/hooks";
import { onMounted } from 'vue'

// 获取用户日程接口
const { UserSchedule_list , UserSchedule_add } = UserFunc()
// 日程数据
const dateList = ref([
])
// 表单数据
const calendar = ref({
  filed:'',
  date:'',
})
// 弹窗设置false为关闭
const dialogFormVisible = ref(false);

// 添加一个方法来查找dateList中对应日期的项
const getDateItem = (day) => {
  return dateList.value.find(v => v.date === day);
}

// 检测是否打卡弹窗
const dialogOpen = (date)  =>{
  dialogFormVisible.value = true;
  calendar.value = {date: date}
}

//获取日程数据
const getSchedule = () => {
  UserSchedule_list().then(res => {
    console.log(res)
    dateList.value = res
    })
}

// 在页面加载时就获取数据
onMounted(() => {
  getSchedule()
})




//保存表单
const saveSchedule = () => {
  UserSchedule_add(calendar.value.filed,calendar.value.date).then(res => {
    console.log(res)
  })
  dialogFormVisible.value = false;
  getSchedule()
}


</script>



<style>
.is-selected {
  color: #1989fa;
}

.center-Page .el-calendar-table .el-calendar-day {
  box-sizing: border-box;
  height: 70px;
  width: 100%;
  padding: 0;
  line-height: 40px;
}
</style>
