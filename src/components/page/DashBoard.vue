<template>
    <div>
        <v-pageTitle vtitle="DashBoard"></v-pageTitle>
        <div class="clear"></div>

        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-card class="box-chart">
                    <websiteCount></websiteCount>
                </el-card>
            </el-col>
           
            
        </el-row>
        
    </div>
</template>
<script>
    import vPageTitle from "../common/pageTitle.vue";
    import websiteCount from "../charts/websiteCount.vue";
    

    export default{
        data(){
            return{

            }
        },
        components:{
            vPageTitle,websiteCount
        }
    }
</script>