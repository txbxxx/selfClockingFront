<template>
  <div class="login radius">

    <div class="loginFrom">

      <div class="loginMenu">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#0f1826"
            text-color="#FFFFFF"
            active-text-color="#ffd04b"
            @select="handleSelect">
          <el-menu-item index="1"  >
            <router-link to="/loginFrom" tag="span" style="text-decoration: none;">登录
            </router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/registerFrom" tag="span" style="text-decoration: none;">注册</router-link>
          </el-menu-item>
        </el-menu>
        <router-view></router-view>
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
import LoginFrom  from "@/components/loginFrom/LoginFrom.vue";
import {Stamp, User,Key} from "@element-plus/icons-vue";

// 菜单，设置默认激活的主键，就是默认选中的组件
const activeIndex = ref('1');

//图片
const url='https://image-1305907375.cos.ap-chengdu.myqcloud.com/We/cloud.png?q-sign-algorithm=sha1&q-ak=AKIDkuUiX_pu8PjRii7dqxiLsguTFsMgw1ZiY1tJ-wee2xyQJuiC3P7Qg4ZtRWOclBeO&q-sign-time=1716822472;1716826072&q-key-time=1716822472;1716826072&q-header-list=host&q-url-param-list=ci-process&q-signature=fe0bec494ba2d62c63d5c21a94881321eb578c44&x-cos-security-token=5KVGvIZ30LlVPmFkx653ywihUAK49Jma29150804edee6ba4d59fa9426c851b92eJDr2V2YVmwPVXN4cedAQjgJh_8RAShVnd9fUv0kpBgUHN6dU4kqwBnjJ6YJIoiOjyz_KNALxwUy0TaKwNElnx1YE2ZTNhtJpVXu9kLomtbJFUDsZotTcXeiTkMnoHQ5eFNX5n6i_fGXE1MHEbnhOPkFJjxXk2YpNiR-5Nx68ikrP_mhSHc0BkFazXbpW_MX&ci-process=originImage'


function handleSelect(key, keyPath) {
  console.log(key, keyPath);
}
</script>


<style scoped>
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
  background-image: url("https://image-1305907375.cos.ap-chengdu.myqcloud.com/We/b1.jpg?q-sign-algorithm=sha1&q-ak=AKIDC3R9wjA0cinIjljJt3iMebLK3Nw7G2RpBQi113evwRBPprpzK8u_ivv41LyYBiPJ&q-sign-time=1716822456;1716826056&q-key-time=1716822456;1716826056&q-header-list=host&q-url-param-list=ci-process&q-signature=147250de6abfdfee1ac27100049cc7337e332c9d&x-cos-security-token=rYKzTNdqp1BHTwnIYnH2kqbvi05RaC8aeb2c11e3395afbbe7497c305e3b83bd0_bnJjcC8N0NUP3JsnrGP8BWqK7Tf-qvlw3LW85BMF6VfatNfHTmjhrtwwy4bpYRpV7RjurWk_jTHpdYQBVLgAfeOuo_w7ShqC2qeOm2HlJYt7Vi86IFju415wWMz5Er956-Cchdh9D1V9nN0y9g3Ujyx_ZelpedQTduucNlWQqJ_5b9wFDcC9cVF_7yJCuyu&ci-process=originImage");
  background-size: 100%;
  width: 100%;
  height: 97.5vh;
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

.el-menu-demo{
  height: 30px;
}

.el-menu.el-menu-demo:not(.el-menu--collapse) {
  border-bottom: none;
}

</style>