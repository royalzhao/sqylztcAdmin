<template>
    <div>
        <v-pageTitle vtitle="添加常用电话"></v-pageTitle>
        <div class="clear"></div>
        <el-form ref="form" label-position="right" :rules="rules" label-width="80px" :model="form">
            <el-form-item label="名称" prop="title" class="newsTitle">
                <el-input v-model="form.title" width="200"></el-input>
            </el-form-item>
            
            
            <el-form-item label="电话" prop="phone">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>

            <el-form-item>
            <el-button type="primary" @click="onSubmit">确认添加</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-form>
       
    </div>
</template>
<script>
    import vPageTitle from '../common/pageTitle'
    
    export default{
        data(){
           return {
                fileList2: [],
                imageUrl: '',
                form:{
                    title: '',
                    phone:''
                    
                },
                //表单验证
                rules: {
                    title: [
                        {required: true, message: '请输入电话名称', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入电话号码', trigger: 'blur'}
                    ]
                }
            };
        },
        
        methods:{
            
           
            onSubmit() {
                //提交
                this.$refs.form.validate((valid) => {
                    var qs = require('qs');
                    
                   
                    if(valid) {
                        this.$post('http://www.spn365.cn:4000/addPhone',qs.stringify(this.form)).then(res => {
                            if(res.message == "OK") {
                                this.$message({
                                    message: "添加成功",
                                    type: 'success'
                                });
                               this.$router.go(-1);
                            } else {
                                this.$message({
                                    message:  "添加失败",
                                    type:'error'
                                });
                                this.$router.go(-1);
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
