<template>
  <div>
    <el-card>
      <div slot="header">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>-->
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item  label="频道：">
          <el-select clearable  @clear="handelClear" v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dataArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="changeDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">根据筛选条件共查询到{{total}}条结果</div>
      <!-- 表格组件 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- <img :src="scope.row.cover.images[0]" alt /> -->
            <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:120px;height:80px">
              <div slot="error">
                <img src="../../assets/images/error.gif" style="width:120px;height:80px" />
              </div>
            </el-image>
            <!-- {{scope.row}} -->
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>

        <el-table-column prop label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column prop label="操作" width="120px">
          <template slot-scope="scope">
            <el-button plain type="primary"  @click="edit(scope.row.id)" icon="el-icon-edit" circle></el-button>
            <el-button plain type="danger" @click="del(scope.row.id)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align:center ; margin-top:20px">
        <el-pagination
         background layout="prev, pager, next"
         :total="total"
         :page-size="reqParams.per_page"
         :current-page="reqParams.page"
         @current-change = "changePager"
         >
          <!-- 按照某个条件筛选查询时，选中对应的按钮 current-page 页数 -->
         </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  // 处理数据提交给后端
  data () {
    return {
      reqParams: {
        // 从文档接口列表定义
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道下拉数据
      channelOptions: [],
      // 日期数据
      dataArr: [],
      articles: [],
      // 总条数
      total: 0
    }
  },
  created () {
    // 获取频道下拉选项
    this.getChanneloptions()
    this.getArticles()
  },
  methods: {
    // 点编辑时跳转到发布页面
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    // 删除文章按钮
    del (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles/${id}`)
        this.$message.success('删除成功!')
        this.getArticles()
      }).catch(() => {

      })
    },
    // 筛选日期事件
    changeDate (dataArr) {
      // console.log(dataArr)
      if (dataArr) {
        this.reqParams.begin_pubdate = dataArr[0]
        this.reqParams.end_pubdate = dataArr[0]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选clearable 之后触发的clear事件
    handelClear () {
      this.reqParams.channel_id = null
      this.getArticles()
    },
    // 筛选查询
    search () {
      // 筛选之后默认第一页
      this.reqParams.page = 1
      // 重新加载页面
      this.getArticles()
    },
    // 点击分页按钮事件改变当前数据
    changePager (newPage) {
      // 修改获取数据的最新页码
      this.reqParams.page = newPage
      this.getArticles()
    },
    async getChanneloptions () {
      // 请求地址和方式从文档接口获取channels articles
      const {
        data: { data }
      } = await this.$http.get('channels')
      // data.channels   data.result 是接口文档后端需要提供的，
      this.channelOptions = data.channels
    },

    async getArticles () {
      // axios get传参，第二个参数就是需要传入的，格式为对象{params:参数对象}，发送请求后自当拼接到地址栏后面
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      // 总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scope>
.el-card {
  margin-bottom: 20px;
}
</style>
