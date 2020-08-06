<template>
  <div>
    <el-row>
      <el-col>
        <div class="warpe">
          <el-col :span="2">
            <el-popover
              placement="top"
              width="180"
              visible-arrow="true">
              <p>您确定要删除选中的吗？</p>
              <div style="text-align: center;">
                <el-button size="mini" type="text" @click="handleClickall(3)">取消</el-button>
                <el-button type="danger" size="mini" @click="handleClickall(2)">确定</el-button>
              </div>
              <el-button  slot="reference" type="danger" size="mini" v-show="isSC">删除选中</el-button>
            </el-popover>

          </el-col>
          <el-col :span="18" style="display: flex;text-align: right;justify-items: right;justify-content: right">
            <el-input
              style="width: 150px;margin: 20px;align-items: center"
              fixed="right"
              placeholder="请输入姓名"
              v-model="input"
              clearable>
            </el-input>
          </el-col>
          <el-col :span="2" style="margin-left: 10px;margin-right: 10px" >
            <el-button type="primary" >搜索</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="warning" style="margin-left: 10px" @click="handleClickAddPepole">新增人员</el-button>
          </el-col>
        </div>
      </el-col>
    </el-row>

    <el-table
      ref="multipleTable"
      :data="tableData"
      max-height="734px"
      height="734px"
      border
      stripe
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        align="center"
        type="selection"
        width="65">
      </el-table-column>
      <!--    header-align="center" 只表头居中 align="center"：表头和内容都居中-->
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        label="部门"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="性别"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="手机号"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="170">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.$index,1)" type="primary" size="small">编辑</el-button>
          <el-popover
            placement="top"
            width="152"
            visible-arrow="true">
            <p style="text-align: center">您确定要删除吗？</p>
            <div style="text-align: center;">
              <el-button size="mini" type="text" @click="handleClick(scope.$index,3)">取消</el-button>
              <el-button type="danger" size="mini" @click="handleClick(scope.$index,2)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="small" style="margin-left: 10px">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--    底部分页-->
    <el-pagination style="margin-top: 10px;margin-bottom: 12px"
                   background
                   layout="prev, pager, next"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-size="pageSize"
                   :total="totalNum">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {

        tableData: [],
        tableDataTemp: [],
        multipleSelection: [],
        totalNum:0,//总数
        currentPage: 1,//默认显示第一页
        pageSize:12,//默认每页显示10条
        input: '', //搜素的输入值
        isSC:false,
      }
    },

    created() {
      this.totalNum=120;

    },
    mounted() {
      for(var i=0;i<=120;i++){
        var o = {id:i,name:'小明',date:'2016-05-07',address:'上海市普陀区金沙江路'+i}
        this.tableDataTemp.push(o)
      }
      for (let t of this.tableDataTemp.slice(0, 12)) {
        this.tableData.push(t)
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.isSC = !(val.length <= 0);//控制删除选中的按钮的显示隐藏

        this.multipleSelection = val;
        console.log("multipleSelection.size:"+this.multipleSelection.length)
        this.multipleSelection.forEach(va=>{
          console.log("val:"+va.id)
        });
      },
      handleClick(row,type) {//删除单个
        console.log(row);
        console.log("列:"+row+type);
        if (type===2 || type===3){
          this.$refs.multipleTable.$el.click(); //因为el-popover在列表中会有点击不消失的坑，所以用这个方式来模拟点击让弹窗消失。
          if (type===2){//删除数据
            this.tableData.splice(row,1);
            this.isSC=false;
          }
        }else {//编辑带上id
          this.$router.replace('/pepoleinfo_visitors?id='+this.tableData[row].id)
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;    //动态改变
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;    //动态改变
        this.tableData=[];//先清掉数据
        for (let t of this.tableDataTemp.slice(12*(this.currentPage-1), 12*this.currentPage)) {
          this.tableData.push(t)
        }
      },
      handleClickall(type) {//删除所有选中
        console.log(type);
        if (type===2 || type===3){
          this.$refs.multipleTable.$el.click(); //因为el-popover在列表中会有点击不消失的坑，所以用这个方式来模拟点击让弹窗消失。
          if (type===2){//删除数据
            console.log("删除所有选中");
          }
        }
      },
      handleClickAddPepole(){//新增人员
        this.$router.replace('/pepoleinfo')
      }
    }
  }
</script>

<style>
  .warpe{
    height: 80px;
    display: flex;
    align-items: center;
    padding-left: 20px;

  }


</style>
