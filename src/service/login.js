import { request } from '../untils/'
import { mapMutations } from 'vuex'
import api from '../api'
import * as Demo from "@/api/login";


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

export default {
    login,
    // checkLogin,
    logout,
    register,

}
