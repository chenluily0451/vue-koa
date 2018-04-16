<template>
  <div id="app">
    <div class="mainContent">
      <el-form ref="loginForm" :model="loginForm" label-width="80px" :rules="rules">
        <el-form-item label="账户" prop="loginName">
          <el-input v-model="loginForm.loginName" placeholder="请输入账户" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="" class="btnWrap">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <router-link to="/register">没有账号，去注册</router-link>
        </el-form-item >
      </el-form>
    </div>
  </div>
</template>

<script>
import ls from '../common/storage'
export default {
  data () {
    return {
      loginForm: {
        loginName: '',
        password: ''
      },
      rules: {
        loginName: [
          {
            required: true, message: '请输入账户', trigger: 'blur'
          }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const obj = {
            loginName: this.loginForm.loginName,
            password: this.loginForm.password
          }
          this.$http.post('/api/login', obj).then((res) => {
            if (res.body.success) {
              setTimeout(() => {
                this.$message({
                  type: 'success',
                  message: '登录成功!'
                })
                ls.lsLogin.set(res.body.token)
                this.$router.push('/users')
              }, 300)
            } else {
              setTimeout(() => {
                this.$message({
                  type: 'false',
                  message: res.body.message
                })
              }, 300)
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
  #app {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width:100%
  }
  .mainContent{
    width:30%;
    border:1px solid #ccc;
    padding:20px;
    padding-top:50px;
    border-radius: 4px;
  }
  a{
    text-decoration: none;
    color: #ccc;
    margin-left: 10px;
  }
  a:hover{
    color: #999;
  }
</style>
