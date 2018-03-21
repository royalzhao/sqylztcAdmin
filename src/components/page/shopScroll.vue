<template>
    <div>
        <v-pageTitle vtitle="管辖区域管理"></v-pageTitle>


        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-card class="box-card">
                  
                   <shopScrollGroup></shopScrollGroup>
                </el-card>
            </el-col>
            
        </el-row>
    </div>
    
</template>
<script>
import vPageTitle from '../common/pageTitle.vue'
import shopScrollGroup from '../table/shopScrollGroup.vue'
    export default {
        components:{
            vPageTitle,shopScrollGroup
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