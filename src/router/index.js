import Vue from 'vue'
// 引入路由 npm i vue-router
import VueRouter from 'vue-router'
// 引入登录页
import Login from '@/view/login'
// 引入首页
import Home from '@/view/home'
// 引入欢迎页
import Welcome from '@/view/welcome'
// 引入artical页
import Article from '@/view/article'
// 引入素材网页
import Image from '@/view/image'
// 引入404页面
import NotFound from '@/view/404'
// 引入发布页面
import Publish from '@/view/publish'
// 引入评论管理
import Comment from '@/view/comment'
// 引入个人设置
import Setting from '@/view/setting'

import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/image', name: 'image', component: Image },
        { path: '/publish', name: 'publish', component: Publish },
        { path: '/comment', name: 'comment', component: Comment },
        { path: '/setting', name: 'setting', component: Setting }

      ]
    },
    { path: '*', name: '404', component: NotFound }

  ]
})
// 前置导航守卫
router.beforeEach((to, from, next) => {
  // // 判断是不是登录路由
  // if (to.path === '/login') return next()
  // // 判断是否登录
  // if (!store.getUser().token) return next('/login')
  // next()
  // 简化写法
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
export default router
