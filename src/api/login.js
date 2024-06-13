//用户登录接口
export const Login = '/loginUser'

//用户注册接口
export const Register = '/registerUser'

//检查用户是否登录接口
// export const  checkLogin = '/checkLogin'


//用户登出接口
export const Logout = '/logoutUser'

//======================日程=========================

//列出用户所有日程
export const ListSchedule = '/findAllSchedule'

//添加日程接口
export const AddSchedule = '/addSchedule'

//删除日程接口
export const DeleteSchedule = '/deleteSchedule'

//获取当前用户登录的id
export const GetUserId = '/getLoginUser'


//搜索日程
export const SearchSchedule = '/fuzzySchedule'

//=========================任务==========================
//获取当前用户的任务列表
export const ListTask = '/listUserTask'

//修改任务内容
export const UpdateTask = '/updateTask'

//添加任务
export const AddTask = '/addUserTask'

//删除任务
export const DeleteTask = '/deleteUserTask'

//搜索任务
export const SearchTask = '/searchTask'

//更新用户状态
export const UpdateTaskStatus = '/updateTaskStatus'

//=====================倒计时==================================

//列出用户未完成的倒计时
export const ListCountDownOverFalse = '/listCountDownOverFalse'

//添加倒计时
export const AddCountDown = '/addCountDown'

//删除倒计时
export const DeleteCountDown = '/deleteCountDown'

//更新倒计时
export const UpdateCountDownPastDay = '/updateCountDownPastDay'


//=========================关系================================

//查询是否有绑定关系
export const JudgeRelationship = '/findRelationship'

//绑定关系
export const BindRelationship  = '/bindRelationship'

//列出和当前用户绑定关系的用户
export const ListRelationship = '/listRelationship'

//删除关系
export const DeleteRelationship = '/deleteRelation'

//=============================学习时间========================

//查询用户的学习时间
export const GetUserLearnDate = '/getUserLearnDate'

//更新用户的学习时间
export const UpdateUserLearnDat = '/updateUserLearnDate'