<template>
  <div>
      <v-pageTitle vtitle="医生列表"></v-pageTitle>
      <div class="clear"></div>
      <el-button type="danger" @click="delGroup" :disabled="this.multipleSelection.length === 0" >批量删除</el-button>
      <div class="addNews"><el-button @click="goAddNews" type="primary">添加医生</el-button></div>
      <el-table
          ref="multipleTable"
          :data="news"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
          type="selection"
          >
          </el-table-column>
          <el-table-column
          label="医生ID"
          width="150"
          >
          <template slot-scope="scope">{{ scope.row.d_id }}</template>
          </el-table-column>
          <el-table-column prop="d_face" width="100" label="头像">
              <template slot-scope="scope">
          
                  <img v-bind:src="scope.row.d_face" style="height:60px;"/>

              </template>
          </el-table-column>
          <el-table-column
          prop="d_name"
          label="医生姓名" width="120">
          </el-table-column>
          <el-table-column
          prop="d_technicalTitle" width="120"
          label="医生类别">
          </el-table-column>
          <el-table-column
          prop="d_committee" width="120"
          label="所属居委">
          </el-table-column>
          <el-table-column
          prop="d_tel" width="120"
          label="电话">
          </el-table-column>
          <el-table-column
          prop="d_abstract"
          label="简介">
          </el-table-column>
          
          <el-table-column
          fixed="right" width="180"
          label="操作">
          <template slot-scope="scope">
              
              <el-button type="success" plain size="small" @click="goEdit(scope.row.d_id)">编辑</el-button>
              <el-button @click.native.prevent="deleteNews(scope.row.d_id)" type="danger" plain size="small">移除</el-button>
          </template>
          </el-table-column>
      </el-table>
       <!-- 分页 -->
      <el-col :span="24" class="toolbar block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, total]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
      <!-- <div style="margin-top: 20px">
          <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
      </div> -->
  </div>
</template>
<script>
import vPageTitle from '../common/pageTitle';
export default {
  data() {
    return {
      news: [],
      listLoading: false,
      multipleSelection: [],
      map: {
        id:''
      },
      total:0,
      pageSize:10,
      pageNum:1,
      info:{
        ids:''
      }
    }
  },
  mounted() {
    //初始化
    this.newsInfo();
  },
  methods: {
    delGroup() {  
        var qs = require('qs');
        var ids = this.multipleSelection.map(item => item.id);//获取所有选中行的id组成的字符串，以逗号分隔  
        this.info.ids = ids
        
        this.$confirm('确定要删除选中医生吗？')
          .then(_ => {
            this.$post('http://www.spn365.cn:4000/deleteDoctorAll',qs.stringify(this.info)).then(res => {
              
              this.newsInfo();
              this.$message({
                  message: "删除成功",
                  type: 'success'
              });
            
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
    newsInfo(){
      this.listLoading = true;
      var qs = require('qs');
      let info = {};
      info.pageNum=this.pageNum;
      info.pageSize=this.pageSize;
      
      //读取商品列表
      this.$post('http://www.spn365.cn:4000/showDoctorList',qs.stringify(info)).then(res => {
       console.log(res)
        this.news = res;
        
        this.listLoading = false;
        this.$post('http://www.spn365.cn:4000/showDoctorNum',qs.stringify(info)).then(res2 => {
        
          //console.log(res2[0].count)
          this.total = res2[0].count;
        
        });
      });
    },
    // 添加商品
    goAddNews(){
      this.$router.push('addDoctor');
    },
    // 编辑
    goEdit(row){
      if(row !== undefined) {
        this.$router.push({path:'updateDoctor',query:{d_id:row}});
      }
    },
    //删除
    deleteNews(row){
      //删除
      this.map.id = row;
     
      var qs = require('qs');
      
      this.$confirm('确定要删除该医生吗？')
        .then(_ => {
          this.$post('http://www.spn365.cn:4000/deleteDoctor',qs.stringify(this.map)).then(res => {
            if(res.message == "OK"){
              this.newsInfo();
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
    //点击分页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.newsInfo();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.newsInfo();
    },
  },
  components:{
      vPageTitle
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
 
  .ql-container .ql-editor {
      min-height: 20em;
      padding-bottom: 1em;
      max-height: 25em;
      
  }
  .html {
      height: 9em;
      overflow-y: auto;
      border: 1px solid #ccc;
      border-top: none;
      resize: vertical;
      background-color:#fff;
  }

  
</style>
