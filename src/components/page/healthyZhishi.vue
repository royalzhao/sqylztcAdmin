<template>
    <div>
        <v-pageTitle vtitle="医疗知识列表"></v-pageTitle>
        <div class="clear"></div>
        <el-button type="danger" @click="delGroup" :disabled="this.multipleSelection.length === 0" >批量删除</el-button>
        <div class="addNews"><el-button @click="goAddNews" type="primary">添加文章</el-button></div>
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
            label="文章标题" width="120">
            <template slot-scope="scope">{{ scope.row.n_title }}</template>
            </el-table-column>
            <el-table-column prop="name" width="150" label="缩略图">
                <template slot-scope="scope">
            
                    <img v-bind:src="scope.row.n_img" style="height:100px;" />

                </template>
            </el-table-column>
            <el-table-column
            prop="n_abstract" width="250"
            label="摘要">
            </el-table-column>
            <el-table-column
            prop="n_from" width="120"
            label="作者">
            </el-table-column>
            <el-table-column
            prop="n_see_num" width="100"
            label="浏览">
            </el-table-column>
            <el-table-column
            prop="n_time"
            label="时间">
            </el-table-column>
            
            
            
            <el-table-column
            fixed="right" width="180"
            label="操作">
            <template slot-scope="scope">
                
                <el-button type="success" plain size="small" @click="goEdit(scope.row.n_id)">编辑</el-button>
                <el-button @click.native.prevent="deleteNews(scope.row.n_id)" type="danger" plain size="small">移除</el-button>
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
          n_id:'',
          n_type:'zhishi',
          key:'bg'
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
          var ids = this.multipleSelection.map(item => item.n_id);//获取所有选中行的id组成的字符串，以逗号分隔  
          this.info.ids = ids
          
          this.$confirm('确定要删除选中文章吗？')
            .then(_ => {
              this.$post('http://www.spn365.cn:4000/deleteToutiaoAll',qs.stringify(this.info)).then(res => {
                
                this.newsInfo();
                this.$message({
                    message: "删除成功",
                    type: 'success'
                });
              
              });
            })
            .catch(_ => {
              
              this.$message({
                  message: "删除失败",
                  type: 'error'
              });
            });
        
      },  
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 查询所有新闻
      newsInfo(){
        this.listLoading = true;
        var qs = require('qs');
        let info = {};
        info.pageNum=this.pageNum;
        info.pageSize=this.pageSize;
        info.n_type = this.map.n_type;
        info.key = this.map.key;
        //读取新闻列表
        this.$post('http://www.spn365.cn:4000/showToutiaoList',qs.stringify(info)).then(res => {
        
          this.news = res;
          
          this.listLoading = false;
          this.$post('http://www.spn365.cn:4000/showToutiaoNum',qs.stringify(info)).then(res2 => {
          
            console.log(res2[0].count)
            this.total = res2[0].count;
          
          });
        });
        
      },
      // 添加新闻
      goAddNews(){
        this.$router.push('addArticle');
      },
      // 编辑
      goEdit(row){
        if(row !== undefined) {
          this.$router.push({path:'updateArticle',query:{n_id:row}});
        }
      },
      //删除
      deleteNews(row){
        //删除
        this.map.n_id = row;
       
        var qs = require('qs');
        
        this.$confirm('确定要删除该文章吗？')
          .then(_ => {
            this.$post('http://www.spn365.cn:4000/deleteArticle',qs.stringify(this.map)).then(res => {
             
              this.newsInfo();
              this.$message({
                    message: "删除成功",
                    type: 'success'
                });
            });
          })
          .catch(_ => {
         
            this.$message({
                message: "删除失败",
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
