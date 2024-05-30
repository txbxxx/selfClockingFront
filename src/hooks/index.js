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
    function CheckLogin(){
        const item = sessionStorage.getItem('token');
        return item != null
    }




    //用户登出
    async function User_logout(){
        console.log(store.state.saToken)
        if(store.state.saToken != null){
            const res = await Login.logout().then((res) => {
                if (res.code === 200) {
                    ElMessage.success('退出成功')
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
            }else{
                console.log(res)
                ElMessage.error("添加失败！")
            }
        }).catch(err=>{
            console.log(err)
            ElMessage.error('添加失败,请联系管理员')
        })

    }


    //删除日程
    async function UserSchedule_delete(scheduleFiled,date){
        //获取用户
        const user = await Login.getUserId();
        if (!user) {
            ElMessage.error("获取不到当前用户!!");
        }
        // 删除日程
        const res =  await Login.deleteSchedule(user,scheduleFiled,date).then((res)=>{
            if (res.code === 200 ){
                ElMessage.success('删除成功')
            }else{
                console.log(res)
                ElMessage.error("删除失败！")
            }
        })

    }




    //获取名人名言
    async function User_getFamous(){
        try {
            return await Login.getMingYan().catch(err=>{
                ElMessage.error('获取每日一句失败,请联系管理员(可忽略)')})
        }catch (err){
            ElMessage.error('获取每日一句失败,请联系管理员(可忽略)')
        }

    }


    //获取任务列表
    async function User_getTaskList(){
        try {
            // 查询用户日程
            const res = await Login.getTaskList();
            if (res.code === 200) {
                return res.data; // 直接返回数组数据
            } else {
                ElMessage.error(res);
            }
        } catch (err) {
            console.error(err);
            ElMessage.error('查询失败,请联系管理员');
        }
    }


    //修改任务字段
    async function UserSchedule_update(taskName,taskFiled){
        //获取用户
        const user = await Login.getUserId();
        if (!user) {
            ElMessage.error("获取不到当前用户!!");
        }
        // 修改日程
        const res =  await Login.updateTask(taskName,taskFiled).then((res)=>{
            if (res.code === 200 ){
                ElMessage.success('修改成功')
            }else{
                console.log(res)
                ElMessage.error("修改失败！")
            }
        }).catch(err=>{
            console.log(err)
            ElMessage.error('修改失败,请联系管理员')
        })

    }


    //添加任务
    async function UserSchedule_addTask(taskName,taskFiled,date){
        // 添加任务
        const res =  await Login.addTask(taskName,taskFiled).then((res)=>{
            if (res.code === 200 ){
                ElMessage.success('添加成功')
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
        User_getFamous,
        UserSchedule_delete,
        User_getTaskList,
        UserSchedule_update,
        UserSchedule_addTask


    }

}

//任务操作
function TaskFunc() {

}

export default UserFunc

