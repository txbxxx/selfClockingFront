<template>
  <div class="login radius">
    <div class="loginFrom">
      <div class="loginTools" style="padding-left: 20px">
        <span style="color: aliceblue; font-size: 25px" ><p>自律打卡ING</p></span>
        <span style="text-align: left;color: aliceblue; font-size: 20px" ><p>登录</p></span>
        <el-form
            ref="ruleFormRef"
            style="max-width: 600px; height: 90%;"
            :model="ruleForm"
            :rules="rules"
            label-width="auto"
            class="demo-ruleForm"
            :size="formSize"
            status-icon
        >
          <div class="loginUser">
            <el-form-item  prop="name" >
              <el-input
                  class="loginInput"
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
                  class="loginInput"
                  v-model="pwd"
                  type="password"
                  autocomplete="off"
                  size="large"
                  placeholder="请输入密码"
                  clearable
                  :suffix-icon="Key" />
            </el-form-item>
          </div>

          <div class="loginBtn">
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
      <el-divider border-style="none" direction="vertical" class="fgx" />
      <div class="loginImg">
        <div class="demo-image">
          <div  class="block">
            <el-image style= "width: 100%; height: 389px; border-radius: 10px;" :src="url"  :fit="fit"/>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script setup>

import {computed, reactive, ref, toRefs} from 'vue';
import UserFunc from '../hooks'
import {useStore} from "vuex";
import {Stamp, User,Key} from "@element-plus/icons-vue";





//创建表单数据
const  ruleForm = reactive({
    name: '',
    pwd: ''
})

//图片
const url = 'https://image-1305907375.cos.ap-chengdu.myqcloud.com/We/cloud.png?q-sign-algorithm=sha1&q-ak=AKID_IwjgeM-4rr0byZNtBrW8LbmgJ6cCd93TiNPtN8-q2VfXFF1s-diL28IzVe3d0HP&q-sign-time=1716814145;1716817745&q-key-time=1716814145;1716817745&q-header-list=host&q-url-param-list=ci-process&q-signature=152ede0be461b1d8feab844730f60fab11f5c413&x-cos-security-token=rYKzTNdqp1BHTwnIYnH2kqbvi05RaC8a2f175099ad4bed2f2aa430b62aad7795_bnJjcC8N0NUP3JsnrGP8K6u3MftX8x9E74yf1YiwpQEC2K3bA3Z1Gz2FsOuMZGLr5G2flk_LRQLE097tw9Ai-pS1R_LShgtbSmKrlAgDZpK62o_LSQEKI35lQ3ov6dnbN3_7CDsN_ufmb-hJIBD122rb_Clfc1kv-CwLkbyW6SI7I2UzYhweaAajS4Fx07e&ci-process=originImage'
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


//重置表格
const resetForm = () => {
  if (ruleFormRef.value) {
    // resetFields() 方法重置表单字段的值，它是在element-ui的form组件中定义的,
    ruleFormRef.value.resetFields();
  }
}

</script>


<style scoped>
.loginInput {
  width:  270px;
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-dark);
}
.loginFrom {
  background-color: #0f1826;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 400px;
  box-shadow: var(--el-box-shadow-light);
  border-radius: 10px;
}

.login{
  //background-color: #252a36;
  background-image: url("https://image-1305907375.cos.ap-chengdu.myqcloud.com/We/b1.jpg?q-sign-algorithm=sha1&q-ak=AKIDuT2mqVyFbDwWOHKxPf1L_MVgIAQz-DQH7N3PrStaMr08-nMhW2_Qt6n3Wwa655Eh&q-sign-time=1716815863;1716819463&q-key-time=1716815863;1716819463&q-header-list=host&q-url-param-list=ci-process&q-signature=a67ce059861e348b0898a849898caa03e7b778d1&x-cos-security-token=rYKzTNdqp1BHTwnIYnH2kqbvi05RaC8a34aaba057344c16d67dbe6611ac0ae86_bnJjcC8N0NUP3JsnrGP8AQi2PFPnH-aSQVcJJbdMMjL82bKZ3DvKNW5PulzKx4krLK8Jo5FBArwk2LM1me-AIaxSDCKVrFv93Q8N8Jh3vYCM67x3oDiwuPuwsFb01fWAoAeBqEd8G5ckK7bZ1l3VWl4li0d2O0WmlDlOmBOmevVUN-ihyI3JiDZlgVp6bSK&ci-process=originImage");
  background-size: 100%;
  width: 100%;
  height: 97.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
}


.loginBtn{
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginImg{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px
}


:deep(.el-input__wrapper) {
  background-color: #494c52;
}


:deep(.el-input__inner) {
  background-color: #494c52 !important;
  color: #3e3f50;
}

</style>