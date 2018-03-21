<template>
    <div class="c-charts">
        <h3>区域注册人数统计</h3><br>
            <el-table
                :data="patientCount"
                height="400"
                border
                style="width: 100%">
                <el-table-column
                prop="label"
                label="管辖区域"
               >
                </el-table-column>
                <el-table-column
                prop="count"
                label="注册人数"
                >
                </el-table-column>
                
          </el-table>
    </div>
</template>

<script>

    export default {
       
        data() {
            return {  
                patientCount:[],
            }  
        },
        mounted() {
            //初始化
            this.getInfo();
        },
        methods:{
            getInfo(){
                this.$post('http://127.0.0.1:4000/patientCount').then(res => {
                    console.log(res[0])
                    this.patientCount = res;
                    
                });
            }
        
            
        
            
        },

    }
     
</script>

<style scoped>

    
</style>