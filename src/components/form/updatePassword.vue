<template>
    <div>
        <v-pageTitle vtitle="修改密码"></v-pageTitle>
        <div class="clear"></div>
        <el-form ref="form" label-position="right" :rules="rules" label-width="80px" :model="form">

            <el-form-item label="新密码" prop="a_password">
                <el-input type="password" v-model="form.a_password"></el-input>
            </el-form-item>
             <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="form.checkPass"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认提交</el-button>
                <el-button @click="back">返回</el-button>
            </el-form-item>
        </el-form>
       
    </div>
</template>
<script>
    import vPageTitle from '../common/pageTitle';
    export default {
        
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请输入密码'));
                } else {
                  if (this.form.checkPass !== '') {
                    this.$refs.form.validateField('checkPass');
                  }
                  callback();
                }
              };
              var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入密码'));
                } else if (value !== this.form.a_password) {
                  callback(new Error('两次输入密码不一致!'));
                } else {
                  callback();
                }
              };
           return {
                form:{
                    id: '',
                    a_password:'',
                    checkPass:''
                },
                //表单验证
                rules: {
                    a_password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        mounted() {
            //初始化
           
            
        },
        methods:{
            
            onSubmit() {
                //提交
                this.form.id=this.getCookie('id');
                this.$refs.form.validate((valid) => {
                    var qs = require('qs');
                   
                    if(valid) {
                        this.$post('http://127.0.0.1:4000/updatePass',qs.stringify(this.form)).then(res => {
                           console.log(res)
                            if(res.message == "OK") {
                                this.$message({
                                    message: "修改成功,请重新登录！",
                                    type: 'success'
                                });
                                this.$router.push('index');
                            } else {
                                this.$message({
                                    message:  "修改失败",
                                    type:'error'
                                });
                            }
                        });
                    }
                });
            },
            back(){
                this.$router.go(-1);
            }
        },
        components:{
            vPageTitle
        }
    }
</script>
<style>
  .newsTitle{
      width:300px;
  }
</style>
