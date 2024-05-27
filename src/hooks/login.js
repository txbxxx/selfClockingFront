import Login from '../service/login'
import { ElMessage } from 'element-plus'
import {useRouter} from 'vue-router'
import {useStore}   from "vuex";
import { computed    } from "vue";


// 主要逻辑
function UserFunc() {
    const router = useRouter();
    const store = useStore();

    // 登录
    async function User_login(user,pwd){
        const res =  await Login.login(user,pwd).then((res)=>{
            if (res.data.code === 200 ){
                ElMessage.success('登录成功')
                // 登录成功跳转
                router.push('/about')
                //登录后存储Token
                store.commit('getSaToken',res.data.data)
            }else{
                ElMessage.error(res.data.message)
            }

        }).catch(err=>{
            console.log(err)
            ElMessage.error('登录失败,请联系管理员')
        })

    }
    return{
        User_login
    }

}
export default UserFunc
