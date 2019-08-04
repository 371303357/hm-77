<template>
  <div class="container">
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form :model="loginForm " ref="loginForm" status-icon :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            style="width:236px; margin-right:10px"
            placeholder="请输入验证码"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import store from '@/store'
export default {
  data () {
    // validator 自定义校验规则
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机格式不正确'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        mobile: '13811111111',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入完整号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          console.log('校验成功')
          this.$http
            .post(
              'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
              this.loginForm
            )
            .then(res => {
              // 跳首页
              // console.log(res.data)
              // 储存用户信息
              store.setUser(res.data.data)
              this.$router.push({ path: '/' })
            })
            .catch(() => {
              // console.log(err)
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../../assets/images/login_bg.jpg) no-repeat center/cover;
  // background: url(a/assets/images/login_bg.jpg) no-repeat center/cover;
}
.my-card {
  position: absolute;
  width: 400px;
  height: 350px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    display: block;
    width: 200px;
    margin: 0 auto 30px;
  }
}
</style>
