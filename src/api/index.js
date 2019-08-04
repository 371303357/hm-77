// 引入配置一个新的axios
import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
// };
// 添加请求拦截器 模板
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   // 修改config,追加headers
//   return config;
// }, function (error) {
//   // 认为返回错误的promise对象
//   return Promise.reject(error);

// 请求拦截器
// 每次请求前做一些事
axios.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
},
(error) => {
  return Promise.reject(error)
})

// 响应拦截器模板
// axios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     return response;
//   }, function (error) {
//     // 对响应错误做点什么
//     // 状态码是401  跳转到登录页面
//     return Promise.reject(error);
//   });

// 响应拦截器
axios.interceptors.response.use((response) => {
  return response
},
(error) => {
  // 失败的时候做一些事情
  // 获取响应状态码 err对象包含响应对象  err.response
  // 响应对象中包含状态码  err.response.status
  if (error.response.status === 401) {
    // 失败跳转到登录页面
    // 方式1 改变hash 值
    // $router.push('/login') 其实 地址栏改成  #/login
    location.hash = '#/login'
    // 方式2 引入
    // import router from '@/router'
    // 此时没有vue实例，$router对象获取不到，通过router实例直接使用
    router.push('/login')
  }
  return Promise.reject(error)
})

// 导出 此时main.js 里的要改为  import axios from '@/api'
export default axios
