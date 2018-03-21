<template>
    <div>
        <v-pageTitle vtitle="活动奖品管理"></v-pageTitle>


        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-card class="box-card">
                   大转盘奖品设置
                   <hr>
                   <zhuanpanAward></zhuanpanAward>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-card class="box-card">
                   砸金蛋奖品设置
                   <hr>
                   <eggAward></eggAward>
                </el-card>
            </el-col>
            
        </el-row>
    </div>
    
</template>
<script>
import vPageTitle from '../common/pageTitle.vue'
import zhuanpanAward from '../table/zhuanpanAward.vue'
import eggAward from '../table/eggAward.vue'
    export default {
        components:{
            vPageTitle,zhuanpanAward,eggAward
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