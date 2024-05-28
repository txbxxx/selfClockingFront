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
                console.log(res.data)
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
    function CheckLogin(){
        const item = localStorage.getItem('token');
        console.log(item)
        return item != null
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
                    router.push('/login/loginFrom')
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
    async function User_register(user,pwd){
        const res =  await Login.register(user,pwd).then((res)=>{
            if (res.code === 200 ){
                ElMessage.success('注册成功')
                //注册成功跳转到login
                router.push('/login/loginFrom')
                console.log(res.data)
            }else{
                console.log(res)
                ElMessage.error("注册失败！")
            }

        }).catch(err=>{
            console.log(err)
            ElMessage.error('注册失败,请联系管理员')
        })

    }



    return{
        User_login,
        CheckLogin,
        User_logout,
        User_register

    }

}
export default UserFunc
