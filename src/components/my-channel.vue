<template>
    <el-select clearable @change="fn" :value ="value" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // myValue: null,
      channelOptions: []
    }
  },
  created () {
    // 获取频道下拉选项
    this.getChanneloptions()
  },
  methods: {
    async getChanneloptions () {
      // 请求地址和方式从文档接口获取channels articles
      const {
        data: { data }
      } = await this.$http.get('channels')
      // data.channels   data.result 是接口文档后端需要提供的，
      this.channelOptions = data.channels
    },
    // handelClear () {
    //   this.reqParams.channel_id = null
    //   this.getArticles()
    // },
    fn (val) {
      if (val === '') {
        val = null
      }
      this.$emit('input', val)
    }
  }
}
</script>

<style>

</style>
