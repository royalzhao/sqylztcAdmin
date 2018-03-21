<template>
  <div>
    <div class="addAward"><el-button @click="goaddAward" type="primary">添加奖品</el-button></div>
    <el-table :data="zhuanpanAward" style="width: 100%"  v-loading="listLoading">
      <el-table-column prop="p_name" label="奖品名"></el-table-column>
      <el-table-column prop="p_type_code" label="奖品说明"></el-table-column>
      <el-table-column prop="p_probability" label="概率"></el-table-column>
      <el-table-column prop="co" label="操作" align="right">
        <template slot-scope="scope">
        
          <el-button type="success" plain size="small"  @click="goEdit(scope.row.id)">编辑</el-button>
          <el-button  @click="del(scope.row.id)" type="danger" plain size="small">移除</el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>
   
</template>

<script>
    export default {
      data() {
        return {
          zhuanpanAward: [],
          listLoading:false,
          map: {
            id:''
          },
          data:{
            p_type:"luckdraw"
          }
          
        }
      },
      mounted() {
        //初始化
        this.awardInfo()
      },
      methods:{
        // 查询
        awardInfo(){
          this.listLoading = true;
         
          //读取轮播列表
          var qs = require('qs');
          
          this.$post('http://www.bjytzh.cn/jxc/prizeList.thtml',qs.stringify(this.data)).then(res => {
            this.zhuanpanAward = res;
            this.listLoading = false;
          });
        },
        // 添加轮播
        goaddAward(){
          this.$router.push('addAward');
        },
        // 编辑
        goEdit(row){
          if(row !== undefined) {
            this.$router.push({path:'updateAward',query:{id:row}});
          }
        },
        //删除
        del(row){
          this.map.id = row;
        
          var qs = require('qs');
          //console.log(qs.stringify(this.map))
          this.$confirm('确定要删除该选项吗？')
            .then(_ => {
              this.$post('http://www.bjytzh.com/jxc/deletePrize.thtml',qs.stringify(this.map)).then(res => {
                
                this.awardInfo();
                this.$message({
                      message: "删除成功",
                      type: 'success'
                  });
              });
            })
            .catch(_ => {
              this.$message({
                    message:  "删除失败",
                    type:'error'
                });
            });
          
        }
      }
    }
</script>
<style scoped>
    .addAward{
      float:right;
    }
</style>
