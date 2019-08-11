<template>
  <div>
    <el-card>
      <div solt="header">
        <my-bread>评论管理</my-bread>
      </div>
    </el-card>
    <el-table :data="comments">
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="评论总数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝总数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{scope.row.comment_status?'正常': '关闭'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">

        <el-button @click="toggleStatus(scope.row)" v-if="!scope.row.comment_status" type="success" size="small">打开评论</el-button>
        <el-button @click="toggleStatus(scope.row)" v-else type="danger" size="small">关闭评论</el-button>
        </template>

      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:20px;text-align:center"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="reqParams.per_page"
      :count-page="reqParams.page"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
// import store from '@/store'
export default {
  name: 'comment',
  data () {
    return {
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      comments: [],
      total: 0
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    },
    changePage (newpage) {
      this.reqParams.page = newpage
      this.getComments()
    },
    async toggleStatus (row) {
      console.log(row.id)
      const { data: { data } } =
      await this.$http.put(`comments/status?article_id=${row.id}`, { allow_comment: !row.comment_status })
      this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
      row.comment_status = data.allow_comment
    }
  }
}
</script>

<style scoped lang="less">
</style>
