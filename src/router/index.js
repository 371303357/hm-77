import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'
// 引入登录页
import Login from '@/view/login'
// 引入首页
import Home from '@/view/home'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/', name: 'home', component: Home }
  ]
})
export default router
