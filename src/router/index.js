import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Logout from "@/components/logout/Logout.vue";
import LoginFrom  from "@/components/loginFrom/LoginFrom.vue";
import RegisterFrom from "@/components/register/RegisterFrom.vue";
import UserFunc from '../hooks'

// 获取登录状态
const { CheckLogin } = UserFunc()

// 路由配置
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    children: [
      {
        path: '/loginFrom',
        name: 'LoginFrom',
        component: LoginFrom
      },
      {
        path: '/registerFrom',
        name: 'RegisterFrom',
        component: RegisterFrom
      }
    ]
  },
  {
    path: '/logout',
    component: Logout,
    meta: {
      requiredAuth: true
    }
  }

]

// createRouter创建路由实例，createWebHistory创建history模式
//使用HTML5的History API来管理路由，也就是history模式。这意味着URL看起来更加传统，没有井号#。process.env.BASE_URL是从环境变量中获取的基础URL
//通常在Vue应用中用于指定公共路径，特别是在部署到非根路径时。这样可以确保所有路由链接都基于正确的基础路径构建
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



//配置路由守卫
// GOOD
router.beforeEach((to, from, next) => {
    // 判断该路由是否需要登录权限
    if( !CheckLogin() && to.meta.requiredAuth) {
      console.log(to.meta.requiredAuth)
      console.log(CheckLogin())
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
})


export default router
