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
        const item = sessionStorage.getItem('token');
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


    //列出所有日程
    async function UserSchedule_list() {
        try {
            // 获取当前用户登录的id
            const user = await Login.getUserId();
            if (!user) {
                ElMessage.error("获取不到当前用户!!");
                throw new Error("User not found");
            }

            // 查询用户日程
            const res = await Login.listSchedule(user);

            if (res.code === 200) {
                return res.data; // 直接返回数组数据
            } else {
                ElMessage.error(res.data.message);
            }
        } catch (err) {
            console.error(err);
            ElMessage.error('查询失败,请联系管理员');
        }
    }


    //添加日程
    async function UserSchedule_add(scheduleFiled,date){
        //获取用户
        const user = await Login.getUserId();
        if (!user) {
            ElMessage.error("获取不到当前用户!!");
        }
        // 添加日程
        const res =  await Login.addSchedule(user,scheduleFiled,date).then((res)=>{
            if (res.code === 200 ){
                ElMessage.success('添加成功')
                console.log(res.data)
            }else{
                console.log(res)
                ElMessage.error("添加失败！")
            }
        }).catch(err=>{
            console.log(err)
            ElMessage.error('添加失败,请联系管理员')
        })

    }

    return{
        User_login,
        CheckLogin,
        User_logout,
        User_register,
        UserSchedule_list,
        UserSchedule_add,

    }

}
export default UserFunc
