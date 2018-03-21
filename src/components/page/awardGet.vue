<template>
    <div>
        <v-pageTitle vtitle="领取详情"></v-pageTitle>
        <div class="clear"></div>
        <el-table
        :data="awardGetList"
        style="width: 100%"
        :default-sort = "{prop: 'register_date', order: 'descending'}"
         v-loading="listLoading"
        >
        <el-table-column
          fixed
          prop="l_drawtime"
          label="领取时间"
          sortable>
        </el-table-column>
        
        <el-table-column
          prop="v_name"
          label="姓名"
          sortable>
        </el-table-column>
        <el-table-column prop="headimgurl" label="头像"
        width="120">
            <template slot-scope="scope">
        
                <img v-bind:src="scope.row.headimgurl" style="width:100%;" />

            </template>
        </el-table-column>
        
        <el-table-column
          prop="sex"
          label="性别">
          <template slot-scope="scope">
                <span v-if="scope.row.sex == '1'">男</span>
                <span v-else >女</span>
          </template>
        </el-table-column>
        
        <el-table-column
          prop="p_name"
          label="领取内容">
        </el-table-column>
        
      </el-table>
      <!-- 分页 -->
      <el-col :span="24" class="toolbar block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, total]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </div>
</template>
<script>
import vPageTitle from '../common/pageTitle'
  export default {
    data() {
      return {
        awardGetList: [],
        listLoading: false,
        total:0,
        page:{
          pageSize:10,
          pageNum:1
        }
       
      }
    },
    mounted() {
      //初始化
      this.userSearch();
    },
    methods:{
      
      // 查询所有用户
      userSearch(){
        this.listLoading = true;
        var qs = require('qs');
       
        //读取商品列表
        this.$post('http://www.bjytzh.cn/jxc/exchangeDetails.thtml',qs.stringify(this.page)).then(res => {
          console.log(res[0])
          this.awardGetList = res[0];
          this.total = res[1].count;
          this.listLoading = false;
        });
      },
      //点击分页
      handleCurrentChange(val) {
        this.page.pageNum = val;
        this.userSearch();
      },
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.userSearch();
      },
    },
    
    components:{
        vPageTitle
    }
  }
</script>