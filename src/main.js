import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// main.js职责
// 1 导入项目所需依赖资源(js包 css文件 其他资源)
// 2 创建一个根实例
new Vue({
  render: h => h(App)
}).$mount('#app')
