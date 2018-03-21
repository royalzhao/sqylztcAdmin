<template>
    <div>
        <v-pageTitle vtitle="订单统计"></v-pageTitle>
        <div class="clear"></div>
        <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" class="box">
                <div v-for="item in patientCount">
                    <el-card class="box-card">
                        <p>{{label}}</p>
                        <p>{{count}}</p>
                    </el-card>
                </div>
                
            </el-col>
        </el-row>
        
       
    </div>
</template>
<script>
    import vPageTitle from '../common/pageTitle'
    
    export default{
        data(){
           return {
               patientCount:[],
            };
        },
        mounted() {
            //初始化
            this.getInfo();
        },
        methods:{
            getInfo(){
                this.$fetch('http://127.0.0.1:4000/patientCount').then(res => {
                    
                    this.patientCount = res;
                    
                });
            }
        
            
        },
        components:{
            vPageTitle
        }
    }
</script>
<style>
    .box .box-card{
        margin-top:20px;
        text-align:center;
    }
    .box .box-card p:nth-child(1){
        font-size:35px;
    }
    .box:nth-child(1) .box-card{
        background:#409EFF;
        color:#fff;
    }
    .box:nth-child(2) .box-card{
        background:#F56C6C;
        color:#fff;
    }
    .box:nth-child(3) .box-card{
        
        background:#fff;
        border: 1px solid #ccc;
        color:#000;
    }
    .box:nth-child(4) .box-card{
        background:#67C23A;
        color:#fff;
    }
</style>
