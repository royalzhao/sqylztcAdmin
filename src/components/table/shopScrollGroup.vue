<template>
  <div>
    <el-table :data="shopIndexScroll" style="width: 100%"  v-loading="listLoading">
      <el-table-column prop="label" label="地区" width="180"></el-table-column>
      <el-table-column prop="d_name" label="负责人" width="180"></el-table-column>
      <el-table-column prop="co" label="操作" align="right">
        <template slot-scope="scope">
        
          <el-button type="success" plain size="small"  @click="goEdit(scope.row.id)">编辑</el-button>
          
        </template>
      </el-table-column>
    </el-table>
  </div>
   
</template>

<script>
    export default {
      data() {
        return {
          shopIndexScroll: [],
          listLoading:false,
          map: {
            id:''
          }
        }
      },
      mounted() {
        //初始化
        this.scrollInfo()
      },
      methods:{
        // 查询
        scrollInfo(){
          this.listLoading = true;
          //读取轮播列表
          this.$post('http://www.spn365.cn:4000/getAddress').then(res => {
            console.log(res[0].d_name)
            this.shopIndexScroll = res;
            this.listLoading = false;
          });
        },
        
        // 编辑
        goEdit(row){
          if(row !== undefined) {
            this.$router.push({path:'updateScroll',query:{id:row}});
          }
        }
      }
    }
</script>
<style scoped>
    .addScroll{
      float:right;
    }
</style>
