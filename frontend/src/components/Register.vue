<template>
  <div id="app">
    <div class="main">
      <el-form ref="registerForm" :model="registerForm" label-width="80px" :rules="rules">
        <el-form-item label="账户" prop="loginName">
          <el-input v-model="registerForm.loginName" placeholder="请输入账户"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" type="password" placeholder="请输入密码" @change="clearConfirmPassword()"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请输入确认密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="registerForm.name"  placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="registerForm.sex" placeholder="请选择">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input type="textarea" v-model="registerForm.note"  placeholder="请填写备注信息"></el-input>
        </el-form-item>
        <el-form-item label="" class="btnWrap">
          <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
          <router-link to="/">已有账号，去登录</router-link>
        </el-form-item >
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const confirmPasswordValidate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('密码与确认密码不一样'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        loginName: '',
        password: '',
        confirmPassword: '',
        sex: '',
        name: '',
        note: ''
      },
      sexOptions:
        [
          {
            value: '男',
            label: '男'
          },
          {
            value: '女',
            label: '女'
          }
        ],
      rules: {
        loginName: [
          {required: true, message: '请输入账户', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入确认密码', trigger: 'blur'},
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          {required: true, message: '请输入确认密码', trigger: 'blur'},
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
          { validator: confirmPasswordValidate, trigger: 'blur' }
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          { max: 6, message: '长度最多 6 个字符', trigger: 'blur' }
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'blur'}
        ],
        note: [
          { max: 120, message: '长度最大在 120 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const obj = {
            loginName: this.registerForm.loginName,
            password: this.registerForm.password,
            name: this.registerForm.name,
            sex: this.registerForm.sex,
            note: this.registerForm.note
          }
          this.$http.post('/api/register', obj).then((res) => {
            if (res.body.success) {
              setTimeout(() => {
                this.$message({
                  type: 'success',
                  message: '注册成功!'
                })
              }, 300)
              this.registerForm = {}
            }
          })
        } else {
          return false
        }
      })
    },
    clearConfirmPassword () {
      this.registerForm.confirmPassword = ''
    }
  }
}
</script>

<style>
  .main{
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
  .el-select{
    width:100%;
  }
</style>
