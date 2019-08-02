import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'
// 引入登录页
import Login from '@/view/login'
// 引入首页
import Home from '@/view/home'
// 引入欢迎页
import Welcome from '@/view/welcome'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ]
    }
  ]
})
export default router
