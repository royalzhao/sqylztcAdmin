<template>
    <div>
        <v-pageTitle vtitle="添加轮播"></v-pageTitle>
        <div class="clear"></div>
        <el-form ref="form" label-position="right" label-width="80px" :model="form">
            
            <el-form-item label="缩略图" prop="c_img">
                <el-upload class="avatar-uploader" action="" :http-request="uploadImg" :show-file-list="false" :before-upload="beforeAvatarUpload">
                <img v-if="form.c_img" :src="form.c_img" class="avatar" style="max-width:300px;">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
             <el-form-item label="跳转链接" prop="href_url">
                <el-input v-model="form.href_url" class="jump"></el-input>
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
                    TYPE: '0',
                    href_url: '',
                    c_img:''
                }
            };
        },
        computed: {
            
        },
        methods:{
           
            //图片上传
            uploadImg(file) {
                var fd = new FormData();
                fd.append ("file" , file.file);
                this.$post('http://www.bjytzh.cn/jxc/upload.thtml',fd).then(res => {
                    
                    this.form.c_img = res;

                });
            },
            //图片上传之前
            beforeAvatarUpload(file) {
                const isIMGType = file.type === 'image/jpeg' || 'image/png' || 'image/gif' || 'image/bmp';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isIMGType) {
                this.$message.error('上传头像图片只能是 JPG，png，gif，bmp 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isIMGType && isLt2M;
            },
            onSubmit() {
                //提交
                this.$refs.form.validate((valid) => {
                    var qs = require('qs');
                    
                    this.$post('http://www.bjytzh.cn/jxc/saveShopCarousel.thtml',qs.stringify(this.form)).then(res => {
                        if(res == 1) {
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
  .jump{
      width:300px;
  }
</style>
