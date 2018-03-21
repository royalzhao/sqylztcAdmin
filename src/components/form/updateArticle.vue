<template>
    <div>
        <v-pageTitle vtitle="编辑文章"></v-pageTitle>
        <div class="clear"></div>
        <el-form ref="form" label-position="right" :rules="rules" label-width="80px" :model="form">
            <el-form-item label="文章标题" prop="n_title" class="newsTitle">
                <el-input v-model="form.n_title"></el-input>
            </el-form-item>
            <el-form-item label="缩略图" prop="n_img">
                <el-upload class="avatar-uploader" action="" :http-request="uploadImg" :show-file-list="false" :before-upload="beforeAvatarUpload">
                <img v-if="form.n_img" :src="form.n_img" class="avatar" style="max-width:300px;">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
          </el-form-item>
            
            <el-form-item label="摘要" prop="n_abstract">
                <el-input type="textarea" v-model="form.n_abstract"></el-input>
            </el-form-item>

             <el-form-item label="内容" prop="n_content">
                 <quill-editor v-model="form.n_content"
                                ref="myQuillEditor"
                                class="editer"
                                :options="editorOption">
                    <div id="toolbar" slot="toolbar">
                        <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-underline"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-strike"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-code-block"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-header" value="1"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-header" value="2"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-script" value="sub"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-script" value="super"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-indent" value="-1"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-indent" value="+1"></button></span>
                        <span class="ql-formats"> <button type="button" class="ql-direction" value="rtl"></button></span>

                    <span class="ql-formats"><select class="ql-size">
                        <option value="small"></option>
                        <option selected></option>
                        <option value="large"></option>
                        <option value="huge"></option>
                    </select></span>
                    <span class="ql-formats"><select class="ql-header" >
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                        <option value="5"></option>
                        <option value="6"></option>
                        <option selected="selected"></option>
                    </select></span>
                    <span class="ql-formats"><select class="ql-color">
                        <option selected="selected"></option>
                        <option value="#e60000"></option>
                        <option value="#ff9900"></option>
                        <option value="#ffff00"></option>
                        <option value="#008a00"></option>
                        <option value="#0066cc"></option>
                        <option value="#9933ff"></option>
                        <option value="#ffffff"></option>
                        <option value="#facccc"></option>
                        <option value="#ffebcc"></option>
                        <option value="#ffffcc"></option>
                        <option value="#cce8cc"></option>
                        <option value="#cce0f5"></option>
                        <option value="#ebd6ff"></option>
                        <option value="#bbbbbb"></option>
                        <option value="#f06666"></option>
                        <option value="#ffc266"></option>
                        <option value="#ffff66"></option>
                        <option value="#66b966"></option>
                        <option value="#66a3e0"></option>
                        <option value="#c285ff"></option>
                        <option value="#888888"></option>
                        <option value="#a10000"></option>
                        <option value="#b26b00"></option>
                        <option value="#b2b200"></option>
                        <option value="#006100"></option>
                        <option value="#0047b2"></option>
                        <option value="#6b24b2"></option>
                        <option value="#444444"></option>
                        <option value="#5c0000"></option>
                        <option value="#663d00"></option>
                        <option value="#666600"></option>
                        <option value="#003700"></option>
                        <option value="#002966"></option>
                        <option value="#3d1466"></option>
                    </select></span>
                    <span class="ql-formats"> <select class="ql-background">
                        <option value="#000000"></option>
                        <option value="#e60000"></option>
                        <option value="#ff9900"></option>
                        <option value="#ffff00"></option>
                        <option value="#008a00"></option>
                        <option value="#0066cc"></option>
                        <option value="#9933ff"></option>
                        <option selected="selected"></option>
                        <option value="#facccc"></option>
                        <option value="#ffebcc"></option>
                        <option value="#ffffcc"></option>
                        <option value="#cce8cc"></option>
                        <option value="#cce0f5"></option>
                        <option value="#ebd6ff"></option>
                        <option value="#bbbbbb"></option>
                        <option value="#f06666"></option>
                        <option value="#ffc266"></option>
                        <option value="#ffff66"></option>
                        <option value="#66b966"></option>
                        <option value="#66a3e0"></option>
                        <option value="#c285ff"></option>
                        <option value="#888888"></option>
                        <option value="#a10000"></option>
                        <option value="#b26b00"></option>
                        <option value="#b2b200"></option>
                        <option value="#006100"></option>
                        <option value="#0047b2"></option>
                        <option value="#6b24b2"></option>
                        <option value="#444444"></option>
                        <option value="#5c0000"></option>
                        <option value="#663d00"></option>
                        <option value="#666600"></option>
                        <option value="#003700"></option>
                        <option value="#002966"></option>
                        <option value="#3d1466"></option>
                    </select></span>
                    <span class="ql-formats"><select class="ql-font">
                        <option selected="selected"></option>
                        <option value="serif"></option>
                        <option value="monospace"></option>
                    </select></span>
                    <span class="ql-formats">
                        <select class="ql-align">
                        <option selected="selected"></option>
                        <option value="center"></option>
                        <option value="right"></option>
                        <option value="justify"></option>
                    </select>
                    </span>
                        <span class="ql-formats"><button type="button" class="ql-clean"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-link"></button></span>
                        <!--图片按钮点击事件-->
                        <span class="ql-formats">
                            <el-upload class="avatar-uploader" action="" :http-request="uploadContentImg" :show-file-list="false" :before-upload="beforeAvatarUpload">
                                <button type="button">
                                    <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle class="ql-fill" cx="6" cy="7" r="1"></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>
                                </button>
                            </el-upload>
                            
                        </span>
                        <span class="ql-formats"><button type="button" class="ql-video"></button></span>

                    </div>
                </quill-editor>
                
            </el-form-item>
            
            <el-form-item label="作者" prop="n_from">
                <el-input v-model="form.n_from"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="n_type">
                <el-select v-model="form.n_type" placeholder="请选择分类">
                <el-option label="健康头条" value="toutiao"></el-option>
                <el-option label="医疗知识" value="zhishi"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间" prop="n_time">
                 <el-date-picker
                    v-model="form.n_time"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认修改</el-button>
                <el-button @click="back">返回</el-button>
            </el-form-item>
        </el-form>
       
    </div>
</template>
<script>
    import vPageTitle from '../common/pageTitle'
    import { quillEditor } from 'vue-quill-editor'

    export default{
        data(){
           return {
                imageUrl: '',
                form:{
                    n_id:'',
                    n_title: '',
                    n_img:'',
                    n_abstract:'',
                    n_content:'',
                    n_from:'',
                    n_time:'',
                    n_type:''
                },
                editorOption: {  
                    modules: {  
                        toolbar: '#toolbar'  
                    }  
                },  
                //表单验证
                rules: {
                    n_name: [
                        {required: true, message: '请输入标题名称', trigger: 'blur'}
                    ]
                },
                map:{
                    n_id:''
                }
            };
        },
        mounted() {
            //初始化
            this.form.n_id = this.$route.query.n_id;
            this.articleInfo();
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        methods:{
             //商品信息初始化
            articleInfo() {
                var qs = require('qs');
                this.map.n_id = this.$route.query.n_id
                this.$post('http://127.0.0.1:4000/showNewsById',qs.stringify(this.map) ).then(res => {
                  
                    this.form = res[0];
                });
            },
            //图片上传
            uploadImg(file) {
                var fd = new FormData();
                fd.append ("avatar" , file.file);
                this.$post('http://127.0.0.1:4000/upload',fd).then(res => {
                   
                    this.form.n_img = res.filePath;

                });
            },
            //新闻内容图片上传
            uploadContentImg(file) {
                var fd = new FormData();
                fd.append ("avatar" , file.file);
                this.$post('http://127.0.0.1:4000/upload',fd).then(res => {
                   
                    var cc = "<img src='"+res.filePath+"'/>";
                    this.form.n_content += cc;


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
                        this.$post('http://127.0.0.1:4000/updateNews',qs.stringify(this.form)).then(res => {
                            console.log(res)
                            if(res.message == "OK") {
                                this.$message({
                                    message: "更新成功",
                                    type: 'success'
                                });
                                this.$router.go(-1)
                            } else {
                                this.$message({
                                    message:  "更新失败",
                                    type:'error'
                                });
                            }
                        });
                    }
                });
            },
            back(){
                this.$router.go(-1)
            }
        },
        components:{
            vPageTitle,quillEditor
        }
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
</style>
