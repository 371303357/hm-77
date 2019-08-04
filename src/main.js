import Vue from 'vue'
import App from './App.vue'
// 引入element-ui组件 需要黑窗口下载  npm i element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入路由用@可以自动去文件夹下找index文件
import router from '@/router'
// 引入全局样式
import '@/style/index.less'
// 引入axios需要黑窗口下载
import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(ElementUI)

// main.js职责
// 1 导入项目所需依赖资源(js包 css文件 其他资源)
// 2 创建一个根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
