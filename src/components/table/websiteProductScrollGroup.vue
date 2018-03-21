<template>
  <div>
    <div class="addScroll"><el-button @click="goAddScroll" type="primary">添加轮播</el-button></div>
    <el-table :data="websiteIndexScroll" style="width: 100%"  v-loading="listLoading">
      <el-table-column  label="图片"  width="180">
        <template slot-scope="scope">
        
          <img v-bind:src="scope.row.c_img" style="width:100%;" />

        </template>
      </el-table-column>
      <el-table-column prop="href_url" label="跳转详情" width="180"></el-table-column>
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
          websiteIndexScroll: [],
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
          
          this.$fetch('http://www.bjytzh.cn/jxc/showOfficialList.thtml?key=bg').then(res => {
            console.log(res)
            this.websiteIndexScroll = res;
            this.listLoading = false;
          });
        },
        // 添加轮播
        goAddScroll(){
          this.$router.push('addWebsiteScroll');
        },
        // 编辑
        goEdit(row){
          if(row !== undefined) {
            this.$router.push({path:'updateWebsiteScroll',query:{id:row}});
          }
        },
        //删除
        del(row){
          this.map.id = row;
        
          var qs = require('qs');
          //console.log(qs.stringify(this.map))
          this.$confirm('确定要删除该轮播吗？')
            .then(_ => {
              this.$post('http://www.bjytzh.cn/jxc/deleteOfficialCarousel.thtml',qs.stringify(this.map)).then(res => {
                
                this.scrollInfo();
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
    .addScroll{
      float:right;
    }
</style>
