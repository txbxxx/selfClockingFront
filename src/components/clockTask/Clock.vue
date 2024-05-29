<template>
  <el-calendar>
    <template #date-cell="{ data }">
      <div :class="data.isSelected ? 'is-selected' : ''"  @click="dialogOpen(data.day)">
        <div>{{ data.day.split('-').slice(2).join('-') }}</div>
        <div v-if="dateList.find(v => v.date === data.day)" style="font-size: 10px">

          {{ dateList.find(v => v.date === data.day).text }}

        </div>
      </div>
    </template>
  </el-calendar>
  <el-dialog v-model="dialogFormVisible" title="添加日程">
    <el-form :model="calendar">
      <el-form-item label="日程名" :label-width="100">
        <el-input v-model="calendar.name" autocomplete="off" />
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

const dateList = ref([
    {date: '2024-05-22', text: "打羽毛球"},
    {date: "2024-05-23", text: "打羽毛球"},
    {date: "2024-05-24", text: "打羽毛球"},
    {date: "2024-05-25", text: "打羽毛球"},
    ])

const calendar = ref({})
const dialogFormVisible = ref(false);

const dialogOpen = (date)  =>{
  dialogFormVisible.value = true;
  calendar.value.date = {date: date}
  console.log(date)
}




//保存表单
const saveSchedule = () => {

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
