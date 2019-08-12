<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
    </el-card>
    <!-- 栅格 -->
    <el-row>
      <el-col :span="12">
        <!-- 表单 -->
        <el-form label-width="120px">
          <el-form-item label="编号">{{userForm.id}}</el-form-item>
          <el-form-item label="手机">{{ userForm.mobile}}</el-form-item>
          <el-form-item label="媒体名称">
            <el-input v-model="userForm.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍">
            <el-input type="textarea" v-model="userForm.intro" row="3"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userForm.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveUserInfo">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-upload
          style="margin-top:80px"
          class="avatar-uploader"
          :show-file-list="false"
          action=""
          :http-request="myUpload"
        >
          <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p style="text-align:center;font-size:16px">修改头像</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus.js'

export default {
  data () {
    return {
      userForm: {
        name: null,
        intro: null,
        email: null,
        photo: null,
        mobile: null,
        id: null
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 头像上传
    // 选中图片后 触发函数  选择的结果result
    // 文件信息获取 result.file
    // axios + formdata 进行上传
    myUpload (result) {
      const formData = new FormData()
      formData.append('photo', result.file)
      this.$http.patch('user/photo', formData).then(res => {
        // 上传头像成功
        this.$message.success('修改头像成功')
        // 预览
        this.userForm.photo = res.data.data.photo
        // 同步本地储存
        store.setUser({ photo: this.userForm.photo })
        // 同步HOME组件
        eventBus.$emit('uploadPhoto', this.userForm.photo)
      })
    },

    // 获取用户信息
    async getUserInfo () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.userForm = data
    },
    // 储存用户信息
    async saveUserInfo () {
      await this.$http.patch('/user/profile', {
        // 根据后台需要返回数据
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('保存设置成功')
      store.setUser({ name: this.userForm.name })
      eventBus.$emit('updateName', this.userForm.name)
    }
  }
}
</script>

<style>
</style>
