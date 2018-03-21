<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" background-color="#324157" text-color="#F0F3F4" unique-opened router>
            <el-menu-item index="DashBoard">
               
                    <span class="sb-icon"><i class="material-icons">home</i></span>
                    <span class="sb-cn">主页</span>   
            </el-menu-item>

            <el-menu-item index="healthyToutiao">
               
                <span class="sb-icon"><i class="material-icons">dvr</i></span>
                <span class="sb-cn">健康头条</span>
                
               
            </el-menu-item>

            <el-menu-item index="healthyZhishi">
                <span class="sb-icon"><i class="material-icons">assignment</i></span>
                <span class="sb-cn">医疗知识</span>
           
               
            </el-menu-item>

            <el-menu-item index="commonTel">
                
                <span class="sb-icon"><i class="material-icons">content_paste</i></span>
                <span class="sb-cn">常用电话</span>
            </el-menu-item>

             <el-submenu index="5">
                 
                <template slot="title">
                    <span class="sb-icon"><i class="material-icons">face</i></span>
                    <span class="sb-cn">医生管理</span>
                </template>
                <el-menu-item index="doctorsList">医生列表</el-menu-item>
                
            </el-submenu>
            <el-menu-item index="shopScroll">
                
                <span class="sb-icon"><i class="material-icons">library_books</i></span>
                <span class="sb-cn">管辖区域管理</span>
            </el-menu-item>
             
        </el-menu>
    </div>
</template>
<script>
    export default {
       computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>
<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 66px;
        bottom:0;
        background: #324157;
       
    }
    .sidebar > ul {
        height:100%;
    }

   .el-menu-item, .el-submenu__title{
       font-size:14px;
     
   }
   
    .material-icons {font-size:12px;}
</style>