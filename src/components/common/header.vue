<template>
    <div class="header">
        <el-row :gutter="10">
            <el-col :xs="20" :sm="10" :md="8">
                <div class="logo">  
                    <span class="logo_prefix">社区医疗直通车</span><span class="logo_suffix">后台管理系统</span>
                </div>
            </el-col>
            <el-col class="hidden-xs-only"  :sm="8" :md="12">
                <div class="msg">  
                    <span>欢迎你</span>    
                    <span>{{user}}</span>    
                </div>
            </el-col>
            <el-col class="hidden-xs-only" :sm="2" :md="2">
                <div class="header-right">
                    <el-dropdown menu-align="start"  >
                        <span >
                            <el-badge class="item">
                                <i class="el-icon-date"></i>
                            </el-badge>
                        </span>
                        
                    </el-dropdown>
                </div>
            </el-col>

            <el-col :xs="4" :sm="4" :md="2">
                <div class="user-header">
                    <el-dropdown trigger="click" menu-align="start">
                        <img src="../../../static/images/b_header.jpg" width="50px" />
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item >
                                <div class="setting-div" @click="updatePassword">
                                    <span class="setting-icon"><i style="font-size: 16px;color: #666;" class="material-icons">settings</i></span> 
                                    <span class="setting-string"> 修改密码</span>
                                </div>
                            
                            </el-dropdown-item>
                            <el-dropdown-item divided>
                                <div class="setting-div" @click="outgo">
                                    <span class="setting-icon"><i style="font-size: 16px;color: #666;" class="material-icons">assignment_return</i></span> 
                                    <span class="setting-string"> 退出</span>
                                </div>
                                
                            </el-dropdown-item>
                            
                        </el-dropdown-menu>
                    </el-dropdown>

                    


                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
               user:''
                
            }
        },
        mounted() {
            //初始化
            this.user=this.getCookie('admin_user');
            
        },
        methods:{
            outgo(){
                this.$router.push('index'); //跳转登录
            },
            updatePassword(){
                this.$router.push('updatePassword'); //跳转修改密码
            }
        }
    }
</script>
<style>
    .header {
        position: fixed;
        box-sizing: border-box;
        width: 100%;
        height:66px;
       
        font-size: 14px;
        line-height: 66px;
        background-color:#324157;
        box-shadow:2px 0 3px rgba(0,0,0,.5);
        z-index:1000;
        padding:0 32px 0 40px;
        overflow:hidden;
       
    }
    .header .logo{
        float: left;
        cursor:pointer;
        font-size: 22px;
    }
    .logo_prefix{
        color:#209e91;
    }
    .logo_suffix{
        color:#fff;
    }
    .header .search{
        float: left;
        color:#fff;
        font-size:14px;
    }
    .website span{
        display:inline-block;
        color:#209e91;
    }
    .website span:first-child{
        color:#fff;
    }
    .header-right{
        padding-top:25px;
        line-height:10px;
    }
    .header-right span{
        display:inline-block;
        margin-left:14px;
        font-size:18px;
        color:#fff;
        line-height:1px;
        height:18px;
        cursor:pointer;

    }
    .header-right span:hover{
        color:#209e91;

    }
    .user-header{
        line-height:10px;
        padding-top:7px;
        font-size:12px;
    }
    .user-header img{
        border-radius:50%;
        cursor:pointer;
    }
    .pop-image{
        display:block;
        float:left;
    }
    .pop-image img{
        border-radius:50%;
    }
    .pop-div{
        height:55px;
        clear:both;
    }
    .pop-content{
        display:block;
        font-size:12px;
        line-height:14px;
        padding-top:15px;
        margin-left:60px;
    }
    .pop-time{
        display:block;
        float:right;
        font-size:10px;
        color:#ccc;

    }
    .pop-title{
        font-size:12px;
        color:#209e91;
    }
    .task-div{
        clear:both;
        height:55px;
    }
    .task-span{
        display:block;
        float:left;
        font-size:12px
    }
    
    .task-content{  
        width:160px;
        line-height:16px;
        margin-left:10px;
        padding:5px;
    }
    .task-time{
        clear:both;
        float:right;
        color:#ccc;
        
    }
    .setting-div{
        height:30px;
        line-height:30px;
        clear:both;
    }
    .setting-div span{
        display:block;
        float:left;
        font-size:12px;
    }
    .setting-icon{
        padding-top:3px;
        padding-right:3px;
    }
    .msg{
        text-align:center;
        color:#fff;
    }
    .msg span:nth-child(2){
        color:#209E91;
        margin-left:10px;
    }
    
</style>