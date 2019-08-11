<template>
  <div class="publishcon">
    <el-card>
      <div slot="header">
        <my-bread>{{articleID?'修改文章':'发布文章'}}</my-bread>
      </div>

      <el-form label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
           <quill-editor v-model="articleForm.content" :options="editorOption">
           </quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 素材选中组件 一张图还是3张图-->
       <div v-if="articleForm.cover.type === 1">
           <my-image v-model="articleForm.cover.images[0]"></my-image>
       </div>
        <div v-if="articleForm.cover.type === 3">
           <my-image v-model="articleForm.cover.images[0]"></my-image>
           <my-image v-model="articleForm.cover.images[1]"></my-image>
           <my-image v-model="articleForm.cover.images[2]"></my-image>

       </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item size="small" v-if="!articleID">
          <el-button type="primary" @click="submit(false)">发表</el-button>
          <el-button  @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item size="small" v-else>
          <el-button type="success" @click="update(false)">修改</el-button>
          <el-button  @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      // 富文本内容
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      },
      // 点击编辑按钮时获取文章ID
      articleID: null
    }
  },
  watch: {
    // 编辑修改时放弃编辑 重新建文章
    $route () {
      if (!this.$route.query.id) {
        this.articleID = null
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  created () {
    // 获取地址栏传参
    this.articleID = this.$route.query.id
    // 判断id是否存在检验是修改的还是新建的
    if (this.articleID) {
      // 获取内容
      this.getArticle()
    }
  },
  methods: {
    async getArticle () {
      const { data: { data } } = await this.$http.get(`articles/${this.articleID}`)
      // console.log(this.articleID)
      this.articleForm = data
    },
    changeType () {
      // 切换几张图时 清空各个选中的图片
      this.articleForm.cover.images = []
    },
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)

      this.$message.success(draft ? '文章存入草稿成功' : '文章发表成功')
      this.$router.push({ path: '/article' })
    },
    async update (draft) {
      await this.$http.put(`articles/${this.articleID}?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '修改存入草稿成功' : '修改发表成功')
      this.$router.push({ path: '/article' })
    }
  }
}
</script>

<style scpoed lang="less">

.ql-editor {
  height: 400px !important;
}
.ql-snow {
  padding:0 8px !important;
}
</style>
