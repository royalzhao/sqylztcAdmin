<template>
    <div>
        <v-pageTitle vtitle="修改电话"></v-pageTitle>
        <div class="clear"></div>
        <el-form ref="form" label-position="right" :rules="rules" label-width="80px" :model="form">
            <el-form-item label="电话名称" prop="title" class="newsTitle">
                <el-input v-model="form.title" width="200"></el-input>
            </el-form-item>

            
            <el-form-item label="电话号码" prop="phone">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认提交</el-button>
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
                imageUrl: '',
                form:{
                    id:'',
                    title: '',
                    phone: '',
                    
                    
                },
                //表单验证
                rules: {
                    g_name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'}
                    ],
                    g_vendibility: [
                        {required: true, message: '请输入市场价', trigger: 'blur'}
                    ],
                    g_stock: [
                        {required: true, message: '请输入商品库存', trigger: 'blur'}
                    ],
                    cost_integration: [
                        {required: true, message: '请输入兑换派豆', trigger: 'blur'}
                    ],
                    g_type: [
                        {required: true, message: '请输入商品分类', trigger: 'blur'}
                    ],
                    g_brand: [
                        {required: true, message: '请输入商品品牌', trigger: 'blur'}
                    ],
                    g_synopsis: [
                        {required: true, message: '请输入商品简介', trigger: 'blur'}
                    ],
                    state: [
                        {required: true, message: '请选择商品状态', trigger: 'blur'}
                    ]
                }
            };
        },
        mounted() {
            //初始化
            this.form.id = this.$route.query.id;
            this.goodsInfo();
        },
        
        methods:{
          
             //商品信息初始化
            goodsInfo() {
                var qs = require('qs');
                this.$post('http://127.0.0.1:4000/getThePhone' ,qs.stringify(this.form)).then(res => {
                    
                    this.form = res[0];
                });
            },
            
            onSubmit() {
                //提交
                this.$refs.form.validate((valid) => {
                    var qs = require('qs');
                    
                    if(valid) {
                        this.$post('http://127.0.0.1:4000/updateThePhone',qs.stringify(this.form)).then(res => {
                            if(res.message == "OK") {
                                this.$message({
                                    message: "修改成功",
                                    type: 'success'
                                });
                                this.$router.go(-1);
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
