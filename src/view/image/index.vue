<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn-box">
        <el-radio-group v-model="reqParams.collect" @change="changeCollect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" @click="openDialog" style="float:right">添加素材</el-button>
      </div>
      <!-- 图片列表 -->
      <div class="img-list">
        <div class="img-item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="foot" v-show="!reqParams.collect">
            <span
              class="el-icon-star-off"
              @click="toggleCollect(item)"
              :class="{selected:item.is_collected}"
            ></span>
            <span class="el-icon-delete" @click="deleteImage(item.id)"></span>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        v-if="total > reqParams.per_page"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePage"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        :headers="uploadHeaders"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      reqParams: {
        // 默认值 全部
        collect: false,
        page: 1,
        per_page: 10
      },
      // 图片列表数据
      images: [],
      // 总条数
      total: 0,
      // 控制显示 隐藏对话框
      dialogVisible: false,
      // 上传成功后的图片地址
      imageUrl: null,
      // 上传组建的头部信息
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 删除图片
    deleteImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`)
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {})
      // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(async () => {
      //   await this.$http.delete(`user/images/${id}`)
      //   this.$message({
      //     type: 'success',
      //     message: '删除成功!'
      //   })
      //   this.getImages()
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   })
      // })
    },
    // 收藏切换
    async toggleCollect (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected })
      // 提示
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      // 更新当前图片状态
      item.is_collected = data.collect
    },
    // 上传成功
    handleSuccess (res) {
      // 1. 获取图片地址显示img标签
      // console.log(res) res.data.url 图片地址
      this.imageUrl = res.data.url
      // 2. 提示上传成功
      this.$message.success('上传成功')
      // 3. 过2s后关闭对话框，更新列表
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    },

    // 打开对话框
    openDialog () {
      this.imageUrl = null
      this.dialogVisible = true
    },
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
.img-list {
  margin-top: 20px;
  .img-item {
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 30px;
    img {
      width: 100%;
      height: 100%;
      //  display: block;
    }
    .foot {
      position: absolute;
      width: 100%;
      height: 30px;
      line-height: 30px;
      bottom: 0;
      left: 0;
      text-align: center;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      span {
        margin: 0 20px;
        &.selected {
          color: red;
        }
      }
    }
  }
}
</style>
