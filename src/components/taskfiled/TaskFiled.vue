<template>
  <div class="task-manager">
    <div class="task-field">
      <el-text class="task-title" size="large">任务表</el-text>
    </div>
    <div class="search-add-container">
      <el-input
          v-model="searchData"
          type="text"
          clearable
          size="default"
          placeholder="搜索任务"
          :suffix-icon="Search"
          class="search-input"
          @change="searchTask($event)"
      />
      <el-button
          plain
          size="mini"
          @click="dialogFormVisible = true"
          class="add-button"
      >
        添加任务
      </el-button>
    </div>

    <el-dialog
        v-model="dialogFormVisible"
        title="添加任务"
        width="500"
        custom-class="advanced-dialog"
        :close-on-click-modal="false"
    >
      <el-form
          ref="taskForm"
          :model="taskData"
          label-width="100px"
      >
        <el-form-item label="任务名" prop="taskName">
          <el-input v-model="taskData.taskName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="任务内容" prop="taskField">
          <el-input
              v-model="taskData.taskField"
              type="textarea"
              :rows="3"
              autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="任务等级" prop="taskLevel">
          <el-select
              v-model="taskData.taskLevel"
              placeholder="选择任务等级"
          >
            <el-option
                v-for="item in range"
                :key="item.value"
                :label="item.text"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button
              type="primary"
              @click="addTask"
              :loading="loading"
          >
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>


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
                content="删除此任务"
                placement="top-start"
            >
              <template #content>
                <el-button size="small" type="text" @click="deleteTask(scope.row.taskName)">
                  删除任务<el-icon><CircleClose /></el-icon>
                </el-button>
              </template>
              <div class="task-name-cell" :class="{ 'completed': scope.row.selected }">
                <el-tag  size="small" round  :color="scope.row.color" />
                <el-text>{{ scope.row.taskName }}</el-text>
              </div>
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

    <!--搜索弹窗-->
    <el-drawer v-model="visible" :show-close="false">
      <template #header="{ close, titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">搜索的任务列表</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          Close
        </el-button>
      </template>
      <el-table
          ref="multipleTableRef"
          :data="searchValue"
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
                  content="删除此任务"
                  placement="top-start"
              >
                <template #content>
                  <el-button size="small" type="text" @click="deleteTask(scope.row.taskName)">
                    删除任务<el-icon><CircleClose /></el-icon>
                  </el-button>
                </template>
                <div class="task-name-cell" :class="{ 'completed': scope.row.selected }">
                  <el-tag  size="small" round  :color="scope.row.color" />
                  {{ scope.row.taskName }}
                </div>
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
    </el-drawer>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import UserFunc from '@/hooks';
import { ElMessage } from 'element-plus';
import {CircleClose, CircleCloseFilled, Search} from "@element-plus/icons-vue";
const { User_getTaskList,UserSchedule_update,UserSchedule_addTask,UserTask_delete,SearchTask,UpdateTaskStatus} = UserFunc();
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
  taskLevel: '',
});

//添加任务from是否弹出
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'


const onTaskSelectChange = (item) => {
  // 选中或取消选中时的逻辑
  if (item.selected) {
    UpdateTaskStatus(item.taskName,1).then(()=>{
      item.selected = true; // 选中状态
    })
  } else {
    // 取消选中时的处理，例如清除内容或删除线
    UpdateTaskStatus(item.taskName,0).then(()=>{
      item.selected = false; // 选中状态
    })
  }
};


const getTaskList = async () => {
  try {
    const res = await User_getTaskList();
    if (res) {
      taskList.value = res.map(item => ({
        ...item,
        selected: false, // 初始化时，所有任务未选中
        color: getColorByLevel(item.taskLevel)
      }));
      totalItems.value = taskList.value.length;
    } else {
      console.log("没有任务列表");
    }
  } catch (err) {
    console.error(err);
  }
};

// 根据任务等级返回对应的颜色
const getColorByLevel = (level) => {
  switch (level) {
    case 4:
      return '#12a182'; // 绿色
    case 3:
      return '#d2b42c'; // 黄色
    case 2:
      return '#fba414'; // 橙色
    case 1:
      return '#ef82a0'; // 红色
    default:
      return '#CCCCCC'; // 默认灰色
  }
}

//======================添加任务==========================
//select 默认选项
const value = ref(1)
// 任务等级
const range = [
  {
    text: '重要且紧急',
    value: 1
  },
  {
    text: '重要不紧急',
    value: 2
  },
  {
    text: '紧急不重要',
    value: 3
  },
  {
    text: '不重要不紧急',
    value: 4
  }
]

const addTask = async () => {
  await UserSchedule_addTask(taskData.value.taskName,taskData.value.taskField,taskData.value.taskLevel).then((res) => {
  }).finally(
      // 无论成功还是错误关闭弹窗
      dialogFormVisible.value = false
  )
  await getTaskList();
};

//任务等级
const level = (e) => {
  console.log(e)
  taskData.value.taskLevel = e
}

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
    await UserSchedule_update(editingTask.value.taskName,editingTask.value.taskField,editingTask.value.taskLevel,editingTask.value.taskName);
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

//===================搜索任务=================
//接收搜索的参数
const searchData = ref('')
const visible = ref(false)
//接收搜索的变量
const searchValue = ref([])
// 搜索功能
const searchTask = async (e) => {
  // 在这里处理搜索逻辑
  try {
    const res = await SearchTask(e);
    if(res.length === 0){
      ElMessage.success("未查询到任务")
      return null
    }
    searchValue.value = res.map(task => ({
          ...task,
          color: getColorByLevel(task.taskLevel) // 根据任务等级设置颜色
        })
    );
    visible.value = true
  } catch (error) {
    console.error('搜索失败:', error);
  }
};


//==================分页=====================


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

<style lang="scss" scoped>
// 全局和容器样式
.task-manager {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

// 任务标题样式
.task-field {
  margin-bottom: 20px;
}
.task-title {
  font-size: 1.5rem;
  color: #333;
  border-bottom: 2px solid #409eff;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

// 按钮样式
.add-task-button {
  margin-left: auto;
  padding: 0.5rem 1rem;
  border-color: #409eff;
  color: #409eff;
}

/* 弹窗自定义类 */
.advanced-dialog {
  border-radius: 10px; /* 圆角边框 */
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25); /* 轻微的阴影 */
  background-color: #ffffff; /* 背景色 */
  padding: 20px; /* 内边距 */
}



// 表格样式
.table-styles {
  th {
    background-color: #f5f5f5;
    color: #333;
    font-weight: bold;
  }
  .task-name-cell {
    display: flex;
    align-items: center;
  }
}


/* 表单项样式 */
.el-form-item {
  margin-bottom: 20px; /* 表单项之间的间距 */
}


/* 表单标题样式 */
.el-dialog__title {
  font-size: 1.5rem; /* 增大标题字体 */
  color: #333;
  margin-bottom: 1rem;
  padding: 0;
  border: none;
}

/* 输入框和选择器样式 */
.el-input__inner,
.el-textarea__inner,
.el-select .el-input__inner {
  border-radius: 8px; /* 圆角边框 */
  border-color: #dcdfe6; /* 边框颜色 */
  font-size: 1rem; /* 字体大小 */
  padding: 10px 15px; /* 内边距 */
}
/* 选择器下拉菜单样式 */
.el-select-dropdown__item {
  padding: 10px 20px;
  font-size: 1rem;
}

/* 按钮样式 */
.dialog-footer .el-button {
  border-radius: 8px; /* 圆角边框 */
  padding: 10px 20px; /* 内边距 */
  margin: 0 10px; /* 外边距 */
}


/* 弹窗动画 */
.el-dialog__wrapper {
  transform: scale(0);
  opacity: 0;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s;
}

.el-dialog__wrapper.is-active {
  transform: scale(1);
  opacity: 1;
}

.dialog-footer .el-button--primary {
  background-color: #409eff; /* 主按钮背景色 */
  color: #ffffff; /* 文字颜色 */
}
// 分页样式
.pagination {
  margin-top: 20px;
  text-align: center;

  .el-pagination {
    .btn-prev, .btn-next, .el-pager li {
      background: #fff;
      border-color: #dcdfe6;
      color: #606266;
    }
    .btn-prev:hover, .btn-next:hover, .el-pager li:hover {
      background: #f5f7fa;
    }
    .el-pager li.active {
      background-color: #409eff;
      border-color: #409eff;
      color: #fff;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .el-form-item__label {
    text-align: left;
    padding: 0;
    margin-bottom: 5px;
  }
  .dialog-footer {
    flex-direction: column;
  }
}


.search-add-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-input {
  flex-grow: 1;
  margin-right: 20px; /* 与添加按钮的间距 */
}

.add-button {
  background-color: #409eff; /* 按钮背景色 */
  color: white; /* 按钮文字颜色 */
  border: none; /* 无边框 */
  border-radius: 4px; /* 圆角边框 */
  padding: 8px 15px; /* 内边距 */
  font-size: 14px; /* 字体大小 */
  transition: background-color 0.3s; /* 背景色变化的过渡效果 */
}

.add-button:hover {
  background-color: #5cadff; /* 鼠标悬浮时的背景色 */
}

/*是否完成样式*/
.completed {
  position: relative;
  color: #1e131d;
  opacity: 0.6; /* 改变文本颜色使其变淡 */

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 2px;
    background: linear-gradient(to right, #ff7e79, #ef82a0, #cda2ab);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    transform: translateY(-50%);
  }

  /* 增加文字阴影 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}
</style>