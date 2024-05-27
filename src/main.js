import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// 导入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// router.beforeEach((to, from) => {
//     // ...
//     // 返回 false 以取消导航
//     return false
// })

createApp(App).use(store).use(router).use(ElementPlus,{locale: zhCn,}).mount('#app')
