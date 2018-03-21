<template>
   <el-table :data="tableData" style="width: 100%">
      <el-table-column  label="图片"  width="180">
        <template slot-scope="scope">
        
          <img v-bind:src="scope.row.head_pic" />

        </template>
      </el-table-column>
      <el-table-column prop="Visits" label="跳转详情" width="180"></el-table-column>
      <el-table-column prop="co" label="操作" align="right">
        <template slot-scope="scope">
        
          <el-button type="success" plain size="small">编辑</el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="danger" plain size="small">移除</el-button>

        </template>
      </el-table-column>
    </el-table>
</template>

<script>
    export default {
      data() {
        return {
          tableData: [{
            head_pic:'../../static/images/b_header.jpg',
            Visits: 'http://baidu.com'
          }]
        }
      }
    }
</script>
<style scoped>
    
</style>
