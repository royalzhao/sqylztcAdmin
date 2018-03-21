<template>
    <div>
        <v-pageTitle vtitle="修改轮播"></v-pageTitle>
        <div class="clear"></div>

        <el-form ref="form" label-position="right" label-width="80px" :model="form">

            <el-form-item label="地区" prop="label" class="newsTitle">
                <el-input v-model="form.label"></el-input>
            </el-form-item>
            <el-form-item label="责任医生" prop="d_id">
                <el-select v-model="form.d_id" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.d_name"
                      :value="item.d_id">
                    </el-option>
                  </el-select>
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
           return {
                options: [],
                form:{
                    id:'',
                    label: '',
                    d_id:'',
                    d_name:''
                }
            }
        },
        mounted() {
            //初始化
            this.init();
            this.scrollInfo();
           
        },
        methods:{
            init(){
                this.$post('http://127.0.0.1:4000/getDoctor').then(res => {
                    this.options = res
                });
            },
             //商品信息初始化
            scrollInfo() {
                var qs = require('qs');
                this.form.id = this.$route.query.id;
                this.$post('http://127.0.0.1:4000/getTheAddress' ,qs.stringify(this.form)).then(res => {
                    console.log(res)
                    this.form = res[0];
               });
            },
            onSubmit() {
                //提交
                var qs = require('qs');
                // console.log(qs.stringify(this.form))
                this.$post('http://127.0.0.1:4000/updateAddress',qs.stringify(this.form)).then(res => {
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
