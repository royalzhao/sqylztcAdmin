<template>
    <div>
        <v-pageTitle vtitle="订单统计"></v-pageTitle>
        <div class="clear"></div>
        <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" class="box">
                <el-card class="box-card">
                    <p>{{allCount}}</p>
                    <p>大转盘奖品领取数量</p>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" class="box">
                <el-card class="box-card">
                    <p>{{Waitingfordelivery}}</p>
                    <p>砸金蛋奖品领取数量</p>
                </el-card>
            </el-col>
            
           
        </el-row>
        
       
    </div>
</template>
<script>
    import vPageTitle from '../common/pageTitle'
    
    export default{
        data(){
           return {
               allCount:'0',
               Waitingfordelivery:'0',
               Consignment:'0',
               Confirmationofreceipt:'0',
            };
        },
        mounted() {
            //初始化
            this.getInfo();
        },
        methods:{
            getInfo(){
                this.$fetch('http://www.bjytzh.cn/jxc/exchanges.thtml').then(res => {
                    this.allCount = res[0].count;
                    this.Waitingfordelivery = res[1].count;
                   
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
