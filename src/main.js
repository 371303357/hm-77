import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router'
Vue.config.productionTip = false

Vue.use(ElementUI)

// main.js职责
// 1 导入项目所需依赖资源(js包 css文件 其他资源)
// 2 创建一个根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
