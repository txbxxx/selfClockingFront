import { request } from '../untils/'
import { mapMutations } from 'vuex'
import api from '../api'
import * as Demo from "@/api/login";
import {GetUserId, ListSchedule} from "@/api/login";
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
function listSchedule(user){
    return request({
        url: api.Demo.ListSchedule,
        method: 'get',
        params: {
            username: user
        }
    })
}


// 用户添加日程
function addSchedule(user,scheduleFiled,date){
    return request({
        url: api.Demo.AddSchedule,
        method: 'post',
        data: {
            username: user,
            scheduleFiled: scheduleFiled,
            date: date
        }
    })
}


//用户删除日程
function deleteSchedule(user,scheduleFiled,date){
    return request({
        url: api.Demo.DeleteSchedule,
        method: 'delete',
        data: {
            username: user,
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
export function updateTask(taskName,taskFiled){
    return request({
        url: api.Demo.UpdateTask,
        method: 'put',
        data: {
            taskname: taskName,
            taskstr: taskFiled,
        }
    })
}


//添加任务字段
export function addTask(taskName,taskFiled){
    return request({
        url: api.Demo.AddTask,
        method: 'post',
        data: {
            taskname: taskName,
            taskstr: taskFiled,
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
    deleteTask
}
