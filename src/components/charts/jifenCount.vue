<template>
    <div class="c-charts">
        <IEcharts :option="line"></IEcharts>
    </div>
</template>

<script>
    import IEcharts from 'vue-echarts-v3';
    export default {
        components:{
            IEcharts
        },
        data (){
            return {  
                date:[],
                see:[],
                ip:[]
            }  
        },
        mounted() {
            //初始化
            this.searchJifenCount();
            
        },
        computed:{  
            line:function(){
                return{ 
                    title : {
                        text: '积分商城站点统计',
                        subtext: '2018年'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['浏览次数','IP数']
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
                            name:'浏览次数',
                            type:'line',
                            smooth:true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data:this.see
                        },
                        {
                            name:'IP数',
                            type:'line',
                            smooth:true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data:this.ip
                        }
                    ]
                }
            }  
        },
        methods: {
            searchJifenCount(){
                this.$post('http://www.bjytzh.cn/jxc/zdtjQuery.thtml').then(res => {
                    
                    var date = [];
                    var see = [];
                    var ip = [];
                    for(var i in res[0]){
                        date.push(res[0][i].day)
                        see.push(res[0][i].count)
                    }
                    for(var i in res[1]){
                        ip.push(res[1][i].countIP)
                    }
                   
                    this.date = date
                    this.see = see
                    this.ip = ip
                });
            }
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