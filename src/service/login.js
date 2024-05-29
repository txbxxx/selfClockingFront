import { request } from '../untils/'
import { mapMutations } from 'vuex'
import api from '../api'
import * as Demo from "@/api/login";
import {GetUserId, ListSchedule} from "@/api/login";


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

//检查用户是否登录
// function checkLogin(){
//     return request({
//         url: api.Demo.checkLogin,
//         method: 'get',
//     })
// }


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


export default {
    login,
    // checkLogin,
    logout,
    register,
    listSchedule,
    getUserId,
    addSchedule,


}
