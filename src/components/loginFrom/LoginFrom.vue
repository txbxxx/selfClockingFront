<template>
  <div class="loginTools" style="padding-left: 20px">

    <span style="color: aliceblue; font-size: 25px" ><p>自律打卡ING</p></span>
    <span style="text-align: left;color: aliceblue; font-size: 20px" ><p>登录</p></span>
    <el-form
        ref="ruleFormRef"
        style="max-width: 600px; height: 230px;"
        :model="ruleForm"
        label-width="auto"
        class="demo-ruleForm"
        status-icon
    >
      <div class="loginUser">
        <el-form-item  prop="name" >
          <el-input
              class="RegisterInput"
              v-model="name"
              size="large"
              clearable
              placeholder="请输入用户名"
              :suffix-icon="User"></el-input>
        </el-form-item>
      </div>

      <div class="loginPwd">
        <el-form-item  prop="pwd">
          <el-input
              class="RegisterInput"
              v-model="pwd"
              type="password"
              autocomplete="off"
              size="large"
              placeholder="请输入密码"
              clearable
              :suffix-icon="Key" />
        </el-form-item>
      </div>

      <div class="RegisterBtn">
        <el-form-item>
          <div class="loginBtnSF">
            <el-button
                class="loginBtnLogin"
                style="width:270px"
                color="#626aef"
                :dark="isDark"
                size="default"
                @click="submitForm">
              登录
            </el-button>
          </div>

          <!--                  <el-card>-->
          <!--                    <div class="loginBtnRest">-->
          <!--                      <el-button-->
          <!--                          @click="resetForm(ruleFormSet)">-->
          <!--                        重置-->
          <!--                      </el-button>-->
          <!--                    </div>-->
          <!--                  </el-card>-->
        </el-form-item>

      </div>
    </el-form>
  </div>
</template>



<script setup>
import {Key, User} from "@element-plus/icons-vue";
import UserFunc from '../../hooks'
import {useStore} from "vuex";
import {reactive, ref, toRefs} from "vue";

//创建表单数据
const  ruleForm = reactive({
  name: '',
  pwd: ''
})


//使用vuex
const store = useStore()

// 引入接口
const {User_login} = UserFunc()

// 将reactive数据转为ref，这样方便编写
const {name,pwd} = toRefs(ruleForm)

const ruleFormRef = ref(null);



const submitForm = async () => {
  await User_login(name.value, pwd.value)
  // console.log(store.state.saToken)
}






</script>


<style scoped>
.RegisterBtn{
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-input__wrapper) {
  background-color: #494c52;
}


:deep(.el-input__inner) {
  background-color: #494c52 !important;
  color: #ffffff;
}

.RegisterInput {
  width:  270px;
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-dark);
}
</style>