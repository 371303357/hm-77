// 填入
import axios from 'axios'
import store from '@/store'
// 配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.headers = {
  Authorization: `Bearer ${store.getUser().token}`
}
// 导出 此时main.js 里的要改为  import axios from '@/api'
export default axios
