<template>
    <div class="c-charts">
        <IEcharts :option="line" theme="macarons"></IEcharts>
    </div>
</template>

<script>
    import IEcharts from 'vue-echarts-v3';
    import 'echarts/theme/macarons.js'
    export default {
        components:{
            IEcharts
        },
        data() {
            return {  
                date:[],
                count:[]
            }  
        },
        mounted() {
            //初始化
            this.searchSignCount();
            
        },
        computed:{  
            line: function(){
                return{ 
                    title : {
                        text: '签到人数统计',
                        subtext: '2018年'
                    },
                        tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['签到人数']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : this.date
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'签到人数',
                            type:'line',
                            stack: '总量',
                            data:this.count
                        }
                    ]
                }
            }  
        },
        methods: {
            searchSignCount(){
                this.$fetch('http://www.bjytzh.cn/jxc/signCountQuery.thtml').then(res => {
                    
                    var date = [];
                    var count = [];
                    for(var i in res){
                        date.push(res[i].day)
                        count.push(res[i].count)
                    }
                    
                    this.date = date
                    this.count = count
                    
                });
            },
            
        }
    }
</script>

<style scoped>
    .el-col{
        margin-bottom:16px;
    }
    .material-icons{
        font-size:80px;
        color:#ddd;
    }
   
    .cart-string{
        height:100px;
        padding-top:10px;
        font-size:1.1rem;
        
    }
    .c-charts{
        height:400px;
        width:100%;
    }
 
    
</style>