<template>
  <div class="task-manager">
    <div class="task-field">
      <el-text class="task-title" size="large">任务表</el-text>
    </div>
    <div style="display: flex; justify-content: flex-end;">
      <el-button plain size="mini" @click="dialogFormVisible = true">
        添加任务
      </el-button>
    </div>

    <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
      <el-form  >
        <el-form-item label="任务名" :label-width="formLabelWidth">
          <el-input v-model="taskData.taskName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="任务内容" :label-width="formLabelWidth">
          <el-input v-model="taskData.taskField" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addTask">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!--分页-->
<!--任务表-->
    <el-table
        ref="multipleTableRef"
        :data="paginatedData"
        style="width: 100%"

    >
      <el-table-column  label="任务名" width="120">
        <template #default="scope">
          <el-checkbox
              :label="scope.row.taskName"
              v-model="scope.row.selected"
              size="large"
              class="custom-checkbox"
              @change="onTaskSelectChange(scope.row)"
          >
            <el-tooltip
                class="box-item"
                effect="dark"
                content="删除此日程"
                placement="top-start"
            >
              <template #content>
                <el-button size="small" type="text" @click="deleteTask(scope.row.taskName)">
                  删除日程<el-icon><CircleClose /></el-icon>
                </el-button>
              </template>
              <div class="task-name-cell" :class="{ 'completed': scope.row.selected }">{{ scope.row.taskName }}</div>

            </el-tooltip>
          </el-checkbox>
        </template>
      </el-table-column>

      <el-table-column  label="任务内容"  >
        <template #default="scope">
          <el-input
              v-model="scope.row.taskField"
              placeholder="请输入内容"
              @keyup.enter="openConfirmDialog(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="totalItems"
        layout="prev, pager, next, jumper"
        @current-change="handleCurrentChange"
    />

    <!-- 添加确认对话框 -->
    <el-dialog
        v-model="isConfirmDialogVisible"
        title="确认修改"
        width="30%"
        :before-close="closeConfirmDialog"
    >
      <span>确定要保存对任务内容的修改吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeConfirmDialog">取消</el-button>
          <el-button type="primary" @click="confirmAndUpdate">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>


</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import UserFunc from '@/hooks';
import { ElMessage } from 'element-plus';
import {CircleClose} from "@element-plus/icons-vue";
const { User_getTaskList,UserSchedule_update,UserSchedule_addTask,UserTask_delete } = UserFunc();
const taskList = ref([]);


//分页初始数据
// 初始状态
const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(0);



onMounted(() => {
  getTaskList();
});

//添加任务数据
const taskData = ref({
  taskName: '',
  taskField: '',
});

//添加任务from是否弹出
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const onTaskSelectChange = (item) => {
  // 选中或取消选中时的逻辑
  if (item.selected) {
    // 选中时的处理
  } else {
    // 取消选中时的处理，例如清除内容或删除线
    item.content = ''; // 清除输入内容
    item.selected = false; // 取消选中状态
  }
};


const getTaskList = async () => {
  try {
    const res = await User_getTaskList();
    if (res) {
      taskList.value = res.map(item => ({
        ...item,
        selected: false, // 初始化时，所有任务未选中
        content: '' // 初始化时，所有任务内容为空
      }));
      totalItems.value = taskList.value.length;
    } else {
      console.log("没有任务列表");
    }
  } catch (err) {
    console.error(err);
  }
};


//添加任务
const addTask = async () => {
  await UserSchedule_addTask(taskData.value.taskName,taskData.value.taskField).then((res) => {
    if (res) {
      ElMessage.success('添加任务成功');
    } else {
      console.log("添加任务失败");
    }
  }).finally(
      // 无论成功还是错误关闭弹窗
      dialogFormVisible.value = false
  )
  await getTaskList();
};


//鼠标回车修改任务字段
// 定义状态变量
const isConfirmDialogVisible = ref(false);
const editingTask = ref(null); // 用于记录当前正在编辑的任务

// 打开确认修改对话框
const openConfirmDialog = (task) => {
  editingTask.value = task; // 记录当前编辑的任务
  isConfirmDialogVisible.value = true;
};

// 关闭确认对话框
const closeConfirmDialog = () => {
  isConfirmDialogVisible.value = false;
};

// 确认修改并调用更新方法
const confirmAndUpdate = async () => {
  try {
    // 假设UserSchedule_update是一个异步方法，需要传递taskId和更新的字段
    await UserSchedule_update(editingTask.value.taskName,editingTask.value.taskField);
    await getTaskList(); // 更新任务列表
    closeConfirmDialog();
  } catch (error) {
    console.log(error)
    ElMessage.error('更新任务内容时出错');
  }
};


//删除日程
const deleteTask = async (task) => {
  try {
    await UserTask_delete(task);
    await getTaskList();
    ElMessage.success('删除任务成功');
  } catch (error) {
    console.log(error)
    ElMessage.error('删除任务失败');
  }
};


//分页


// 计算属性，获取当前页的数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = currentPage.value * pageSize.value;
  return taskList.value.slice(start, end);
});

// 分页变化处理函数
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
};



</script>

<style >


/* 动态调整输入框宽度 */


.task-manager {
  //background-color: ;
  border-radius: 37px;
  box-shadow: var(--el-box-shadow-lighter);
  position: relative; /* 为了z-index生效 */
  z-index: 1; /* 确保在可能的其他元素之上 */
}


/* 添加删除线*/
.completed {
  text-decoration: line-through;
}




/* 标题字体*/
.task-field {
  background-color: #f5f5f5; /* 浅色背景 */
  padding: 7px; /* 内边距 */
  text-align: center; /* 文本居中 */
}

.task-title {
  font-size: 24px; /* 更大的字体大小 */
  color: #333; /* 深色文本颜色 */
  font-weight: bold; /* 加粗文本 */
  border-bottom: 2px solid #409eff; /* 下边框 */
  padding-bottom: 10px; /* 下边框与文本之间的间距 */
  margin-bottom: 20px; /* 标题与下面内容的间距 */
}


/* 表*/
.el-table tr{
  padding-left: 0;
  margin-left: 0;
}



/* 分页组件美化 */
.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.el-pager li {
  cursor: pointer;
  margin: 0 5px;
}
.el-pager .active {
  font-weight: bold;
  color: #409eff;
}

/* 弹窗动画 */
.el-dialog__wrapper {
  transition: all .3s ease-in-out;
}
</style>