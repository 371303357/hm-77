// 封装一个插件
// 注册所有 的components下的组件为全局组件
// import MyTest from '@/components/my-test'
import MyBread from '@/components/my-bread'
// vue 插件暴露一个对象 对象中必须有一个选项 install
export default {
  install (Vue) {
    // Vue.component(MyTest.name,MyTest)
    Vue.component(MyBread.name, MyBread)
  }
}
