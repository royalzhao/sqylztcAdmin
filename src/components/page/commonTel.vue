<template>
    <div>
        <v-pageTitle vtitle="常用电话"></v-pageTitle>
        <div class="clear"></div>
        <el-button type="danger" @click="delGroup" :disabled="this.multipleSelection.length === 0" >批量删除</el-button>
        <div class="addNews"><el-button @click="goAddGoods" type="primary">添加电话</el-button></div>
        <el-table
            ref="multipleTable"
            :data="goodsList"
            tooltip-effect="dark" v-loading="listLoading" @selection-change="handleSelectionChange">

            <el-table-column fixed type="selection"></el-table-column>

            <el-table-column prop="title" label="名称"></el-table-column>
            
            
            <el-table-column prop="phone" label="电话"></el-table-column>
            
            
           
            <el-table-column
            fixed="right"
            label="操作" width="200" >
            <template slot-scope="scope">
                
                <el-button type="success" plain size="small" @click="goEdit(scope.row.id)">编辑</el-button>
                <el-button @click="deleteGood(scope.row.id)" type="danger" plain size="small">移除</el-button>
            </template>
            </el-table-column>
            
        </el-table>
     
    </div>
</template>
<script>
  import vPageTitle from '../common/pageTitle';
  export default {
    data() {
      return {
        goodsList: [],
        listLoading: false,
        multipleSelection: [],
        map: {
          id:''
        },
        info:{
          ids:''
        }
      }
    },
    mounted() {
      //初始化
      this.goodsInfo();
    },
    methods: {
     
      delGroup() {  
          var qs = require('qs');
          var ids = this.multipleSelection.map(item => item.id);//获取所有选中行的id组成的字符串，以逗号分隔  
          this.info.ids = ids
          this.$confirm('确定要删除选中信息吗？')
            .then(_ => {
              this.$post('http://127.0.0.1:4000/delAllPhone',qs.stringify(this.info)).then(res => {
                if(res.message == "OK"){
                  this.goodsInfo();
                  this.$message({
                      message: "删除成功",
                      type: 'success'
                  });
                }else{
                  this.$message({
                      message: "删除失败",
                      type: 'error'
                  });
                }
                
              });
            })
            .catch(_ => {
               this.$message({
                    message: "用户取消",
                    type: 'error'
                });
            });
        
      },  
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 查询所有商品
      goodsInfo(){
        this.listLoading = true;
        var qs = require('qs');
        
        //读取商品列表
        this.$post('http://127.0.0.1:4000/showAllPhone').then(res => {
         
          this.goodsList = res;
          
          this.listLoading = false;
        });
      },
      // 添加商品
      goAddGoods(){
        this.$router.push('addPhone');
      },
      // 编辑
      goEdit(row){
        if(row !== undefined) {
          this.$router.push({path:'updatePhone',query:{id:row}});
        }
      },
      //删除
      deleteGood(row){
        //删除
        this.map.id = row;
       
        var qs = require('qs');
       
        this.$confirm('确定要删除该信息吗？')
          .then(_ => {
            this.$post('http://127.0.0.1:4000/delPhone',qs.stringify(this.map)).then(res => {
             
              if(res.message == "OK"){
                this.goodsInfo();
                this.$message({
                    message: "删除成功",
                    type: 'success'
                });
              }else{
                this.$message({
                    message: "删除失败",
                    type: 'error'
                });
              }
            });
          })
          .catch(_ => {
              this.$message({
                  message: "用户取消",
                  type: 'error'
              });
          });
        
      }
    },
    components:{
        vPageTitle
    }
  }
</script>