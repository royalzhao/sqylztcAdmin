<template>
    <div class="c-charts">
        <IEcharts :option="line" theme="vintage"></IEcharts>
    </div>
</template>

<script>
    import IEcharts from 'vue-echarts-v3';
    import 'echarts/theme/vintage.js'
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
            this.searchGetCount();
            
        },
        computed:{  
            line: function(){
                return{ 
                    title : {
                        text: '派豆兑换次数统计',
                        subtext: '2018年'
                    },
                     tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['兑换次数']
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
                            name:'兑换次数',
                            type:'line',
                            stack: '总量',
                            data:this.count
                        }
                    ]
                }
            }  
        },
        methods: {
            searchGetCount(){
                this.$post('http://www.bjytzh.cn/jxc/orderCountQuery.thtml').then(res => {
                    
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