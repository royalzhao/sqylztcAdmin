<template>
    <div>
        <v-pageTitle vtitle="添加医生"></v-pageTitle>
        <div class="clear"></div>
        <el-form ref="form" label-position="right" :rules="rules" label-width="80px" :model="form">
            <el-form-item label="医生ID" prop="d_id" class="newsTitle">
                <el-input v-model="form.d_id"></el-input>
            </el-form-item>
            <el-form-item label="医生姓名" prop="d_name" class="newsTitle">
                <el-input v-model="form.d_name"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="d_face">
                <el-upload class="avatar-uploader" action="" :http-request="uploadImg" :show-file-list="false" :before-upload="beforeAvatarUpload">
                <img v-if="form.d_face" :src="form.d_face" class="avatar" style="max-width:300px;">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="医生类别" prop="d_technicalTitle" class="newsTitle">
                <el-input v-model="form.d_technicalTitle"></el-input>
            </el-form-item>
            <el-form-item label="所属居委" prop="d_committee" class="newsTitle">
                <el-input v-model="form.d_committee"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="d_tel" class="newsTitle">
                <el-input v-model="form.d_tel"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="d_password" class="newsTitle">
                <el-input v-model="form.d_password"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="d_abstract">
                <el-input type="textarea"  v-model="form.d_abstract" maxlength="140" placeholder="最多输入140字符"></el-input>
            </el-form-item>
            
            
            
            <el-form-item label="负责区域" prop="p_houseNum">
                <el-select v-model="form.p_houseNum" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
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
                imageUrl: '',
                form:{
                    d_id: '',
                    d_name:'',
                    d_face:'',
                    d_technicalTitle:'',
                    d_committee:'',
                    d_tel:'',
                    d_password:'',
                    d_abstract:'',
                    p_houseNum:''
                    
                },
                options: [],
                value: '',
                //表单验证
                rules: {
                    d_name: [
                        {required: true, message: '请输入医生姓名', trigger: 'blur'}
                    ],
                    d_id: [
                        {required: true, message: '请输入医生ID', trigger: 'blur'}
                    ],
                    
                    p_houseNum: [
                        {required: true, message: '请输入医生负责区域', trigger: 'blur'}
                    ],
                }
            };
        },
        mounted(){
            this.init()
        },
        methods:{
            init(){
                this.$fetch('http://www.spn365.cn:4000/getAddress').then(res => {
                    this.options = res
                });
            },
            //图片上传
            uploadImg(file) {
                var fd = new FormData();
                fd.append ("avatar" , file.file);
                this.$post('http://www.spn365.cn:4000/upload',fd).then(res => {
                    
                    this.form.d_face = res.filePath;

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
                    
                    
                    if(valid) {
                        this.$post('http://www.spn365.cn:4000/saveDoctor',qs.stringify(this.form)).then(res => {
                            if(res.message == "OK") {
                                this.$message({
                                    message: "添加成功",
                                    type: 'success'
                                });
                                this.$router.go(-1)
                            } else {
                                this.$message({
                                    message:  "添加失败",
                                    type:'error'
                                });
                            }
                        });
                    }
                });
            },
            back(){
                this.$router.go(-1)
            },
           
        },
        components:{
            vPageTitle
        },
        
    }
</script>
<style>
    .newsTitle{
        width:300px;
    }
    .material-icons{
        font-size:80px;
        color:#ddd;
    }   

    .ql-container .ql-editor {
        min-height: 20em;
        padding-bottom: 1em;
        max-height: 25em;
        
    }
    .html {
        height: 9em;
        overflow-y: auto;
        border: 1px solid #ccc;
        border-top: none;
        resize: vertical;
        background-color:#fff;
    }
    .limit {
        height: 30px;
        border: 1px solid #ccc;
        line-height: 30px;
        text-align: right;

    }

    .ql-snow .ql-editor img {
        max-width: 480px;
    }

    .ql-editor .ql-video {
        max-width: 480px;
    }
</style>
