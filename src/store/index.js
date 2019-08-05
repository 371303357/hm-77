// 储存信息的时候：
// 1.约定信息的KEY是什么  hm-77
// 2.储存信息的值是什么 用户信息对象 字符串格式json
const KEY = 'hm-77'
export default {
  setUser (user) {
    // 储存用户信息到sessionStorage
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },

  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
