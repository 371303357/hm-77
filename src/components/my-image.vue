<template>
  <div class="my-image">
    <div class="btn-img">
      <img :src="value || defaultImage" @click="changeDialog()" alt />
    </div>
    <el-dialog title="封面" :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group v-model="reqParams.collect" @change="collectChange" size="mini">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img-list">
            <div class="img-item"
            :class="{selected:selectedImageUrl===item.url}"
            @click="selectedImage(item.url)"
            v-for="item in images"
            :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <el-pagination style="text-align:center"
            v-if="total > reqParams.per_page"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        :headers="uploadHeaders"
        name="image"
      >
        <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      dialogVisible: false,
      activeName: 'image',
      images: [],
      total: 0,

      // 记录选中图片地址
      selectedImageUrl: null,
      // 记录上传图片地址
      uploadImageUrl: null,
      // 上传图像地址
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // value: defaultImage

      defaultImage
    }
  },
  methods: {
    confirmImage () {
      // 更换封面地址
      if (this.activeName === 'image') {
        this.$emit('input', this.selectedImageUrl)
      } else {
        this.$emit('input', this.uploadImageUrl)
      }
      // 隐藏tabs
      this.dialogVisible = false
    },
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
    },
    changeDialog () {
      // 记录选中图片地址
      this.selectedImageUrl = null
      // 记录上传图片地址
      this.uploadImageUrl = null
      this.dialogVisible = true
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    collectChange (newPage) {
      this.reqParams.page = 1
      this.getImages()
    },
    changePager (newpage) {
      this.reqParams.page = newpage
      this.getImages()
    },
    selectedImage (url) {
      this.selectedImageUrl = url
    }
  }
}
</script>

<style scoped lang="less">
.my-image{
  display: inline-block;
  margin-right:20px;
}
.btn-img {
  // margin-top: 30px;
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: inline-block;
    vertical-align: center;
  }
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
.img-list{
  margin-top: 10px;
}
.img-item{
  width: 160px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 10px;
  position: relative;
  &.selected{
    &::after{
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      left:0;
      top: 0;
      background: rgba(0,0,0,0.2) url(../assets/images/selected.png) no-repeat center / 50px 50px;
    }
  }
  img{
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
}
</style>
