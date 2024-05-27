import Login from '../service/login'
import {ElMessage} from 'element-plus'
import {useRouter} from 'vue-router'
import {useStore} from "vuex";


// 主要逻辑
function UserFunc() {
    const router = useRouter();
    const store = useStore();

    // 登录
    async function User_login(user,pwd){
        const res =  await Login.login(user,pwd).then((res)=>{
            if (res.code === 200 ){
                ElMessage.success('登录成功')
                // 登录成功跳转
                router.push('/home')
                //登录后存储Token
                store.commit('getSaToken',res.data)
            }else{
                console.log(res)
                ElMessage.error(res.data.message)
            }

        }).catch(err=>{
            console.log(err)
            ElMessage.error('登录失败,请联系管理员')
        })

    }

    //检查用户是否登录
    async function CheckLogin(){
        const item = localStorage.getItem('token');
        console.log(item)
        return item == null
    }




    //用户登出
    async function User_logout(){
        console.log(store.state.saToken)
        if(store.state.saToken != null){
            const res = await Login.logout().then((res) => {
                if (res.code === 200) {
                    ElMessage.success('退出成功')
                    console.log(res)
                    // 退出成功跳转
                    router.push('/login')
                    //退出后清除Token
                    store.commit('delSaToken', null)
                } else {
                    console.log(res)
                    ElMessage.error(res.data.message)
                }

            }).catch(err => {
                console.log(err)
                ElMessage.error('退出失败,请联系管理员')
            })
        }else {
            ElMessage.error('未登录')
        }
    }




    //用户注册




    return{
        User_login,
        CheckLogin,
        User_logout

    }

}
export default UserFunc
