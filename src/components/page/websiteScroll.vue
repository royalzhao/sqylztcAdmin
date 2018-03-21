<template>
    <div>
        <v-pageTitle vtitle="官网轮播管理"></v-pageTitle>


        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-card class="box-card">
                   首页banner轮播
                   <hr>
                   <websiteScrollGroup></websiteScrollGroup>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-card class="box-card">
                   首页产品轮播
                   <hr>
                   <websiteProductScrollGroup></websiteProductScrollGroup>
                </el-card>
            </el-col>
            
        </el-row>
    </div>
    
</template>
<script>
import vPageTitle from '../common/pageTitle.vue'
import websiteScrollGroup from '../table/websiteScrollGroup.vue'
import websiteProductScrollGroup from '../table/websiteProductScrollGroup.vue'
    export default {
        components:{
            vPageTitle,websiteScrollGroup,websiteProductScrollGroup
        },
        methods:{

        }
    }
</script>

<style scoped>
    .el-col{
        margin-bottom:16px;
    }
    .box-card{
        font-size:12px;
    }
    .box-card hr{
        height:1px;
        border:none;
        border-top:1px  dashed #ccc;
        margin-bottom:10px;
        margin-top:6px;
    }


    
 
    
</style>