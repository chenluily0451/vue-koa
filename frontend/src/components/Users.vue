<template>
  <div class="main">
    <div class="container">
      <el-table
        :data="tableData"
        border
        stripe
        :cell-style="{'text-align':'left'}"
        style="width: 100%">
        <el-table-column
          prop="loginName"
          label="账户"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="note"
          label="备注">
        </el-table-column>
      </el-table>
    </div>
    <p>
      <el-button type="danger" @click="logOut()">退出</el-button>
    </p>
  </div>
</template>

<script>
import ls from '../common/storage'
export default {
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    logOut: function () {
      this.$router.push('/')
      ls.lsClear.clear()
    },
    getData: function () {
      this.$http.get('/api/users').then((res) => {
        console.log(res.body)
        if (res.body.success) {
          this.tableData = res.body.data
        }
      })
    }
  }
}

</script>
<style>
  .main{
    width:100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .container{
    width:80%;
  }
</style>
