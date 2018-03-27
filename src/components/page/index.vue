<template>
  <el-form ref="account" :model="account" :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">社区医疗直通车后台管理系统</h3>
    <el-form-item prop="p_tel">
      <el-input type="text" v-model="account.p_tel"  placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="p_password">
        <el-input type="password" v-model="account.p_password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button style="width:100%" @click="handleLogin" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        logining: false,
        account: {
          p_tel:'',
          p_password:'',
          loginState:3
        },
        //表单验证规则
        rules: {
          u_name: [
            {required: true, message:'请输入账号',trigger: 'blur'}
          ],
          u_password: [
            {required: true, message:'请输入密码',trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      //初始化
    },
    methods: {
      handleLogin() {
        this.$refs.account.validate((valid) => {
          if(valid) {
            var qs = require('qs');
            this.logining = true;
            this.$post('http://www.spn365.cn:4000/login',qs.stringify(this.account)).then(res => {
              this.logining = false;
              if(res.message == 'ERROR') {
                  this.$message({
                      message:  "账号或密码错误",
                      type:'error'
                  });
                  
          
                  
              } else {
                  this.$message({
                      message: "登录成功",
                      type: 'success'
                  });
                
                  console.log(res[0].id)
                  let expireDays = 1000 * 60 * 60 * 24 * 15;
                  this.setCookie('admin_user',this.account.p_tel,expireDays);
                  this.setCookie('id',res[0].id,expireDays);
                  
                  this.$router.push('/sqztcAdmin'); //跳转用户中心页

                  
              }
            
              
              
            });
          } else {
            console.log('error submit');
            return false;
          }
        });
      }
    }
  }
</script>
<style scope>
  .el-input__inner{
      background: rgba(255, 255, 255, 0.2);
  }
  .el-input__inner::placeholder{
      color: #fff;
  }
</style>

