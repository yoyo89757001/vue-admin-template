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
    :data="tableDataTemp"
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
      align="center"
      label="底库照片"
      width="80">
      <el-image :src="scope.row.photo" style="height: 50px" slot-scope="scope" :preview-src-list="[scope.row.photo]"></el-image>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      label="部门"
      prop="department"
      align="center"
      width="150">
    </el-table-column>
    <el-table-column
      label="性别"
      align="center"
      width="120"
      show-overflow-tooltip>
      <span slot-scope="scope" v-if="scope.row.sex==='1'">男</span>
      <span slot-scope="scope" v-else>女</span>
    </el-table-column>
    <el-table-column
      prop="icCard"
      label="IC卡号"
      align="center"
      width="136"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="birthday"
      label="出生日期"
      align="center"
      width="136"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号码"
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
      :hide-on-single-page="singlepage"
      :total="totalNum">
    </el-pagination>
  </div>
</template>

<script>

  import {getPeople,deletePeople} from '@/api/people'
  import Moment from 'moment' //需要安装  npm install moment --save

  export default {
    data() {
      return {
        singlepage:true,//只有一页时 隐藏分页
        headUrl:'',
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


    },
    mounted() {
      //界面绘制已完成
      getPeople({page:this.currentPage-1,size:this.pageSize,peopleType:1}).then(response => {
       // console.log("获取人员列表",response);
        const  {data,errorCode} =response;
        const  {requestData,total} =JSON.parse(data);
        this.totalNum=total;
        if (requestData.length>0){
          this.singlepage=false;//数量大于1时 显示分页
        }
        const mythis=this;
        requestData.forEach(function (x, index) {//遍历插入
          if (x.birthday!==undefined){//没有时间
            console.log(x.birthday,'x.birthday');
            //  x.birthday=Moment(stamp).format('YYYY-MM-DD HH:mm:ss');
            console.log(Moment(Number(x.birthday)).format('YYYY年MM月DD日'),'格式化');//格式化时间
            x.birthday=Moment(Number(x.birthday)).format('YYYY年MM月DD日');
            mythis.tableDataTemp.push(x);
          }else {
            x.birthday='';
            mythis.tableDataTemp.push(x);
          }
        });
      }).catch((err) => {
        console.log("请求失败:"+err)
      });


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
       // console.log(row);
        //console.log("列:"+row+type);
        if (type===2 || type===3){//2删除 3取消
          this.$refs.multipleTable.$el.click(); //因为el-popover在列表中会有点击不消失的坑，所以用这个方式来模拟点击让弹窗消失。
          if (type===2){//删除数据
            deletePeople(this.tableDataTemp[row].id).then(response => {
              console.log("删除人员返回",response);
              const  {data} =response;
              const  {code,msg} =JSON.parse(data);
              if (code===1){
                //this.totalNum=this.totalNum-1;
                //this.tableDataTemp.splice(row,1);
                console.log(`当前页:`,this.currentPage,this.tableDataTemp.length);
                if (this.tableDataTemp.length===0 && this.currentPage>1){ //每次删除后重新请求，因为有分页，最后一条的时候数据不好处理，会乱，
                  this.handleCurrentChange(this.currentPage-1)//请求前一页
                }else {
                  this.handleCurrentChange(this.currentPage)////请求当前页d
                }

              }else {
                this.$message.error(msg)
              }
            }).catch((err) => {
              console.log("请求失败:"+err)
            });
          }
        }else {//编辑,带上id
          this.$router.replace('/pepoleinfo_employee?id='+this.tableDataTemp[row].id)
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;    //动态改变
      },
      handleCurrentChange(val) {//点击分页时调用的方法
        console.log(`当前页回调方法: ${val}`);
        this.currentPage = val;    //当前页的值，动态改变
        this.tableDataTemp=[];//先清掉数据
        getPeople({page:this.currentPage-1,size:this.pageSize,peopleType:1}).then(response => {
          console.log("获取人员列表",response);
          const  {data,errorCode} =response;
          const  {requestData,total} =JSON.parse(data);
          this.totalNum=total;
          const mythis=this;
          requestData.forEach(function (x, index) {//遍历插入
            if (x.birthday!==undefined){//没有时间
             // console.log(x.birthday,'x.birthday');
              //  x.birthday=Moment(stamp).format('YYYY-MM-DD HH:mm:ss');
             // console.log(Moment(Number(x.birthday)).format('YYYY年MM月DD日'),'格式化');//格式化时间
              x.birthday=Moment(Number(x.birthday)).format('YYYY年MM月DD日');
              mythis.tableDataTemp.push(x);
            }else {
              x.birthday='';
              mythis.tableDataTemp.push(x);
            }
          });
        }).catch((err) => {
          console.log("请求失败:"+err)
        });
      },
      handleClickall(type) {//删除所有选中
        console.log(type);
        if (type===2 || type===3){
          this.$refs.multipleTable.$el.click(); //因为el-popover在列表中会有点击不消失的坑，所以用这个方式来模拟点击让弹窗消失。
          if (type===2){//删除数据
            console.log("删除所有选中");
            this.isSC=false;

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
