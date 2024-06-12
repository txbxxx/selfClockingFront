import { request } from '../untils/'
import { mapMutations } from 'vuex'
import api from '../api'
import * as Demo from "@/api/login";
import {GetUserId, GetUserLearnDate, ListCountDownOverFalse, ListSchedule, UpdateUserLearnDat} from "@/api/login";
import axios from "axios";


// 登录方法
function login(user,pwd){
    return request({
        url: api.Demo.Login,
        method: 'post',
        data: {
            username: user,
            password: pwd
        }
    })
}


//用户注册
function register(user,pwd){
    return request({
        url: api.Demo.Register,
        method: 'post',
        data: {
            username: user,
            password: pwd
        }
    })
}



//  用户登出
function logout(){
    return request({
        url: api.Demo.Logout,
        method: 'get',
    })
}


//获取当前用户登录id
function getUserId(){
    return request({
        url: api.Demo.GetUserId,
        method: 'get',
    })
}

//用户添加日程
// function addSchedule(user,pwd){
//     return request({
//         url: api.Demo.addSchedule,
//         method: 'post',
//         data: {
//             username: user,
//             password: pwd
//         }
//     })
// }


//列出用户所有日程
function listSchedule(){
    return request({
        url: api.Demo.ListSchedule,
        method: 'get',
    })
}


// 用户添加日程
function addSchedule(scheduleFiled,date){
    return request({
        url: api.Demo.AddSchedule,
        method: 'post',
        data: {
            scheduleFiled: scheduleFiled,
            date: date
        }
    })
}


//用户删除日程
function deleteSchedule(scheduleFiled,date){
    return request({
        url: api.Demo.DeleteSchedule,
        method: 'delete',
        data: {
            scheduleFiled: scheduleFiled,
            date: date
        }
    })
}


// 名人名言
function getMingYan(){
    return axios.get('https://v.api.aa1.cn/api/api-wenan-mingrenmingyan/index.php?aa1=text')
}


// 获取任务列表
export function getTaskList() {
    return request({
        url: api.Demo.ListTask,
        method: 'get',
    })
}

// 修改任务字段
export function updateTask(taskName,taskFiled,taskLevel,oldtaskname){
    return request({
        url: api.Demo.UpdateTask,
        method: 'put',
        data: {
            taskname: taskName,
            taskstr: taskFiled,
            tasklevel:taskLevel,
            oldtaskname:oldtaskname
        }
    })
}


//添加任务字段
export function addTask(taskName,taskFiled,taskLevel){
    return request({
        url: api.Demo.AddTask,
        method: 'post',
        data: {
            taskname: taskName,
            taskstr: taskFiled,
            tasklevel:taskLevel
        }
    })
}



//删除用户字段
export function deleteTask(taskName){
    return request({
        url: api.Demo.DeleteTask,
        method: 'delete',
        data: {
            taskname: taskName,
        }
    })
}


//列出所有未完成的倒计时
function listCountDownFalse(){
    return request({
        url: api.Demo.ListCountDownOverFalse,
        method: 'get',
    })
}

//添加倒计时
function addCountDown(countdownName,countdownDay){
    return request({
        url: api.Demo.AddCountDown,
        method: 'post',
        data: {
            countdownName: countdownName,
            countdownDay: countdownDay
        }
    })
}


//删除倒计时
function deleteCountDown(countdownName){
    return request({
        url: api.Demo.DeleteCountDown,
        method: 'delete',
        data: {
            countdownName: countdownName,
        }
    })
}

//更新倒计时
export async function updateCountdownCard() {
    return request({
        url: api.Demo.UpdateCountDownPastDay,
        method: "get",
    });
}

//获取学习时间
export async function getUserLearnDate() {
    return request({
        url: api.Demo.GetUserLearnDate,
        method: "get",
    });
}

//更新用户学习时间
export async function updateUserLearnDate(date) {
    return request({
        url: api.Demo.UpdateUserLearnDat,
        method: "put",
        data: {
            learnDate: date,
        },
    });
}

//搜索任务
export async function searchTask(taskfiled) {
    return request({
        url: api.Demo.SearchTask,
        method: "post",
        data: {
            taskfiled: taskfiled,
        },
    });
}


//更新用户状态
export async  function updateTaskStatus(taskname,taskstatus){
    return request({
        url: api.Demo.UpdateTaskStatus,
        method: "put",
        data: {
            taskname: taskname,
            taskstatus: taskstatus
        },
    })
}

export default {
    login,
    // checkLogin,
    logout,
    register,
    listSchedule,
    getUserId,
    addSchedule,
    getMingYan,
    deleteSchedule,
    getTaskList,
    updateTask,
    addTask,
    deleteTask,
    listCountDownFalse,
    addCountDown,
    deleteCountDown,
    updateCountdownCard,
    getUserLearnDate,
    updateUserLearnDate,
    searchTask,
    updateTaskStatus
}
