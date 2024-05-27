import axios from 'axios'
import { mapMutations } from 'vuex'
import api from '../api'

// 登录方法
function login(user,pwd){
    return axios.post(api.Demo.Login,{
        username: user,
        password: pwd
    })
}


export default {
    login,

}
