<template>
    <div>
        <v-pageTitle vtitle="订单列表"></v-pageTitle>
        <div class="clear"></div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-row :gutter="20">
                <el-col :xs="12" :sm="6" :md="6" :lg="6" class="box">
                    <el-form-item label="商品状态">
                        <el-select v-model="form.option" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.option"
                                :label="item.label"
                                :value="item.value">
                            </el-option>    
                        </el-select>
                   </el-form-item>
                </el-col>
                <el-col :xs="12" :sm="4" :md="4" :lg="4" class="box">
                    <el-form-item label="订单编号">
                        <el-input v-model="form.orderId" placeholder="请输入订单编号"></el-input>
                    </el-form-item>
                    
                </el-col>
                <el-col :xs="12" :sm="10" :md="10" :lg="10" class="box">
                    <el-form-item label="起始时间">
                        <el-col :span="11">
                            <el-date-picker
                                v-model="form.startDate"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期时间" style="float:left;">
                            </el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-date-picker
                                v-model="form.stopDate"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                   
                    
                </el-col>
                <el-col :xs="12" :sm="4" :md="4" :lg="4" class="box">
                    <el-button  type="primary" @click="optionChange">查询</el-button>
                    <el-button  type="primary" @click="export2Excel">导出excel</el-button>
                 </el-col>
            
            </el-row>
        </el-form>
        
        
        <el-table class="order"
            ref="multipleTable"
            :data="orderList"
            tooltip-effect="dark" v-loading="listLoading">

            <el-table-column prop="order_num" width="150" label="订单编号"></el-table-column>
            <el-table-column label="商品名称">
                <template slot-scope="scope" width="170">{{ scope.row.g_name }}</template>
            </el-table-column>
            <el-table-column prop="g_img" width="130" label="商品图片">
                <template slot-scope="scope">
            
                    <img v-bind:src="scope.row.g_img" style="width:100%;" />

                </template>
            </el-table-column>
            <el-table-column prop="g_num" width="100" label="兑换数量"></el-table-column>
            <el-table-column prop="exchange_integration" width="100" label="兑换派豆"></el-table-column>
            <el-table-column prop="address" width="150" label="收货地址"></el-table-column>
            <el-table-column prop="consignee" width="100" label="收件人姓名"></el-table-column>
            <el-table-column prop="consignee_tele" width="120" label="收件人电话"></el-table-column>
            <el-table-column prop="zip_code" width="100" label="邮编"></el-table-column>
            <el-table-column prop="tracking_num" width="100" label="运单号"></el-table-column>
            <el-table-column prop="o_date" width="200" label="下单时间"></el-table-column>
            <el-table-column fixed="right" prop="state" width="100" label="商品状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.state == 1" type="danger">待发货</el-tag>
                    <el-tag v-if="scope.row.state == 2" type="warning">已发货</el-tag>
                    <el-tag v-if="scope.row.state == 3" type="success">确认收货</el-tag>
                    
                </template>
            </el-table-column>
            
           
            <el-table-column
            fixed="right"
            label="操作" width="100" >
                <template slot-scope="scope">
                    <el-button  type="info" size="small" @click="update(scope.row.order_num)">编辑</el-button>
                </template>
            </el-table-column>  
            
        </el-table>
        <!-- 分页 -->
        <el-col :span="24" class="toolbar block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 50, total]"
            :page-size="form.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </el-col>
        <!-- 对话框 -->
        <el-dialog title="修改订单" :visible.sync="dialogFormVisible">
            <el-form ref="updateList">
                <el-form-item label="订单编号" :label-width="formLabelWidth">
                    <el-input v-model="updateList.order_num" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="运单号" :label-width="formLabelWidth">
                    <el-input v-model="updateList.tracking_num" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="订单状态" :label-width="formLabelWidth">
                    <el-select v-model="updateList.state" placeholder="请选择商品状态">
                        <el-option label="待发货" value="1"></el-option>
                        <el-option label="已发货" value="2"></el-option>
                        <el-option label="确认收货" value="3"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import vPageTitle from '../common/pageTitle'
  export default {
    data() {
      return {
        options: [{
            value: '0',
            label: '全部'
            },{
            value: '1',
            label: '待发货'
            }, {
            value: '2',
            label: '已发货'
            }, {
            value: '3',
            label: '确认收货'
        }],
        option: '',
        orderList: [],
        multipleSelection: [],
        updateList:[],
        formLabelWidth: '120px',
        dialogFormVisible: false,
        total:0,
        
        listLoading:'false',
        form:{
            option:'0',
            orderId: '',
            startDate:'',
            stopDate:'',
            pageSize:10,
            pageNum:1,
        }
      }
    },
    mounted() {
      //初始化
      this.selectOrder();
    },
    methods: {
       //   综合查询
      optionChange(){
        this.listLoading = true;
        var qs = require('qs');
       
        //console.log(this.form.startDate)
        this.$post('http://www.bjytzh.cn/jxc/getOrdersList.thtml',qs.stringify(this.form)).then(res => {
            //console.log(res)
            this.orderList = res[0];
            this.total = res[1].count;
            this.listLoading = false;
        });
      },
      // 查询所有商品
      selectOrder(){
        this.listLoading = true;
        var qs = require('qs');
        
        //console.log(qs.stringify(this.form))
        console.log(this.form.startDate)
        var url = "http://www.bjytzh.cn/jxc/getOrdersList.thtml";
        //读取商品列表
        this.$post(url,qs.stringify(this.form)).then(res => {
           // console.log(res)
          this.orderList = res[0];
          this.total = res[1].count;
          this.listLoading = false;
        });
      },
        // 编辑
      update(row){
        var qs = require('qs');
        this.dialogFormVisible = true;
        let order_num = {};
        order_num.order_num=row;
       // console.log(qs.stringify(order_num))
        if(row !== undefined) {
            this.$post('http://www.bjytzh.cn/jxc/ordersById.thtml',qs.stringify(order_num)).then(res => {
            //console.log(res)
            this.updateList = res;
            this.selectOrder();
        }); 
        }
      },
      //提交修改
      updateSubmit(){
        //提交
        
        var qs = require('qs');
        //console.log(qs.stringify(this.updateList))
        this.$post('http://www.bjytzh.cn/jxc/updateOrdersSate.thtml',qs.stringify(this.updateList)).then(res => {
            if(res == 1) {
                this.dialogFormVisible = false;
                this.$message({
                    message: "修改成功",
                    type: 'success'
                });
                location.reload()
            } else {
                this.$message({
                    message:  "修改失败",
                    type:'error'
                });
            }
        });
       
       
      },
       //删除
      deleteGood(row){
        //删除
        this.map.g_id = row;
       
        var qs = require('qs');
        
        this.$confirm('确定要删除该商品吗？')
          .then(_ => {
            this.$post('http://www.bjytzh.cn/jxc/gLogOff.thtml',qs.stringify(this.map)).then(res => {
              
              this.goodsInfo();
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
      //点击分页
      handleCurrentChange(val) {
        this.form.pageNum = val;
        this.selectOrder();
      },
      handleSizeChange(val) {
        this.form.pageSize = val;
        this.selectOrder();
      },
      export2Excel() {
　　　　　 require.ensure([], () => {
　　　　　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
　　　　　　　　const tHeader = ['订单编号', '商品名称', '兑换数量', '兑换派豆', '收货地址','收件人姓名','收件人电话','邮编','运单号','下单时间'];
　　　　　　　　const filterVal = ['order_num', 'g_name', 'g_num', 'exchange_integration', 'address','consignee','consignee_tele','zip_code','tracking_num','o_date'];
　　　　　　　　const list = this.orderList;
　　　　　　　　const data = this.formatJson(filterVal, list);
　　　　　　　　export_json_to_excel(tHeader, data, '订单excel');
　　　　　　})
　　　　},
　　　　formatJson(filterVal, jsonData) {
　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
　　　　}
    },
    components:{
        vPageTitle
    }
  }
</script>
