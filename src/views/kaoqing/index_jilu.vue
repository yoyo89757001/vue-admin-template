<template>
  <div>
    <el-row class="warpe">

      <el-col :span="10">


      </el-col>
      <el-col :span="10" style="text-align: right;justify-items: right;justify-content: right">
        <el-date-picker type="month" placeholder="选择月份" v-model="mydate" style="width: 9vw;"></el-date-picker>
        <el-input
          style="width: 7vw;margin: 1vw;align-items: center"
          fixed="right"
          placeholder="请输入姓名"
          v-model="input"
          clearable>
        </el-input>
      </el-col>
      <el-col :span="2" style="margin-left: 10px" >
        <el-button type="primary" @click="finds">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <download-excel
          :name="excalName"
          :fields="json_fields"
          :before-generate="daochuzhiqian"
          :data = "json_data">
          <el-button type="warning" style="margin-left: 10px" @click="handleClickAddPepole">导出Excel</el-button>
        </download-excel>
      </el-col>

    </el-row>

    <el-table
      v-loading="loding"
      ref="multipleTable"
      :data="tableDataTemp"
      max-height="734px"
      height="734px"
      border
      stripe
      tooltip-effect="dark"
      style="width: 100%;margin-left: 4px;margin-right: 4px"
      @selection-change="handleSelectionChange">
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
        label="迟到"
        align="center"
        prop="lateNumber"
        width="160">
      </el-table-column>
      <el-table-column
        label="早退"
        align="center"
        prop="leaveEarlyNumber"
        width="160">
      </el-table-column>
      <el-table-column
        label="缺勤"
        align="center"
        prop="absenteeismNumber"
        width="150">
      </el-table-column>
      <el-table-column
        label="加班(小时)"
        align="center"
        prop="overtimeTime"
        width="150">
      </el-table-column>
      <el-table-column
        prop="yearMonth"
        label="考勤时间"
        show-overflow-tooltip>
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

  import {getKQ} from '@/api/people'
  import Moment from 'moment' //需要安装  npm install moment --save
  import  ax from 'axios'

  export default {
    data() {
      return {
        loding:false,
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
        json_data:[{ID:123,name:'成',department:'销售部'}],
        excalName:'',
        json_fields: {
          "ID": "sid",    //常规字段
          "姓名": "name",
          "部门": "department",


        },
        mydate:new Date()
      }
    },

    created() {

    },
    mounted() {
      //界面绘制已完成
      const mythis=this;
      this.loding=true;
      getKQ({page:this.currentPage-1,size:this.pageSize,time:Moment(Number(new Date())).format('YYYY-MM'),name:""}).then(response => {
        mythis.loding=false;
        // console.log("获取人员列表",response);
        const  {data,errorCode} =response;
        const  {requestData,total,radio} =JSON.parse(data);
        mythis.totalNum=total;
        if (requestData.length>0){
          mythis.singlepage=false;//数量大于1时 显示分页
        }
        requestData.forEach(function (x, index) {//遍历插入
          var l=x.lateNumber+x.lateNumber2;
          x.lateNumber=x.late+'次'+'(共'+l+'分钟)';

          var t=x.leaveEarlyNumber+x.leaveEarlyNumber2;
          x.leaveEarlyNumber=x.leaveEarly+'次'+'(共'+t+'分钟)';

          x.overtimeTime=x.overtimeTime+'小时';

          x.absenteeismNumber=(x.absenteeismNumber+x.absenteeismNumber2)+'次';

          mythis.tableDataTemp.push(x);
        });
      }).catch((err) => {
        mythis.loding=false;
        console.log("请求失败:"+err)
      });

    },
    methods: {
      handleSelectionChange(val) {
        this.isSC = !(val.length <= 0);//控制删除选中的按钮的显示隐藏
        this.multipleSelection = val;
        //console.log("multipleSelection.size:"+this.multipleSelection.length)
        // this.multipleSelection.forEach(va=>{
        //   console.log("val:"+va.id)
        // });
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;    //动态改变
      },
      handleCurrentChange(val) {//点击分页时调用的方法
        // console.log(`当前页回调方法: ${val}`);
        this.currentPage = val;    //当前页的值，动态改变
        this.tableDataTemp=[];//先清掉数据
        const mythis=this;
        this.loding=true;
        getKQ({page:this.currentPage-1,size:this.pageSize,time:Moment(Number(this.mydate)).format('YYYY-MM'),name:this.input}).then(response => {
          mythis.loding=false;
          const  {data,errorCode} =response;
          const  {requestData,total,radio} =JSON.parse(data);
          mythis.totalNum=total;
          if (requestData.length>0){
            mythis.singlepage=false;//数量大于1时 显示分页
          }
          requestData.forEach(function (x, index) {//遍历插入
            var l=x.lateNumber+x.lateNumber2;
            x.lateNumber=x.late+'次'+'(共'+l+'分钟)';

            var t=x.leaveEarlyNumber+x.leaveEarlyNumber2;
            x.leaveEarlyNumber=x.leaveEarly+'次'+'(共'+t+'分钟)';

            x.overtimeTime=x.overtimeTime+'小时';

            x.absenteeismNumber=(x.absenteeismNumber+x.absenteeismNumber2)+'次';
            mythis.tableDataTemp.push(x);
          });
        }).catch((err) => {
          mythis.loding=false;
          console.log("请求失败:"+err)
        });
      },
      handleClickAddPepole(){//导出excal

      },
      daochuzhiqian(){
        this.loding=true;
        this.excalName=Moment(Number(new Date())).format('YYYY-MM')+'考勤表.xls';
        // return new Promise((resolve, reject) => {
        //   setTimeout(() => {
        //     resolve()
        //   }, 5000)
        // })
        let fd = new FormData();//转成FormData格式上传
        fd.append('time',this.excalName);
        var mthis=this;
        ax({
          method: 'post',
          url: '/app/get/excal',
          timeout:50000,
          data:fd,
        }).then(function(res) {
          console.log(res.data,"获取excal");
          const {errorCode,errorMsg,data} = res.data;
          if (errorCode===200){
            const {code,msg} = JSON.parse(data);
            if (code===1){
              mthis.$message.success('添加成功');
              if (mthis.formUp.peopleType===1){
                mthis.$router.push('/table')
              }else {
                mthis.$router.push('/tree')
              }

            }else {
              mthis.$message.error(msg);
            }
          }else {
            mthis.$message.error(errorMsg);
          }
        }).catch(function (error) {
          console.log("error调用",error);
          mthis.$message.error('上传失败:'+error.message)

        }).finally(function () {
          console.log("finally调用");
          mthis.loding=false;
        });
      },
      finds(){//搜索
        var mythis=this;
        this.loding=true;
        this.tableDataTemp=[];//先清掉数据
        this.currentPage=1;
        getKQ({page:this.currentPage-1,size:this.pageSize,time:Moment(Number(this.mydate)).format('YYYY-MM'),name:this.input}).then(response => {
          mythis.loding=false;
          const  {data,errorCode} =response;
          const  {requestData,total,radio} =JSON.parse(data);
          mythis.totalNum=total;
          if (requestData.length>0){
            mythis.singlepage=false;//数量大于1时 显示分页
          }else {
            mythis.$message.error('未搜索到数据')
          }
          requestData.forEach(function (x, index) {//遍历插入
            var l=x.lateNumber+x.lateNumber2;
            x.lateNumber=x.late+'次'+'(共'+l+'分钟)';

            var t=x.leaveEarlyNumber+x.leaveEarlyNumber2;
            x.leaveEarlyNumber=x.leaveEarly+'次'+'(共'+t+'分钟)';

            x.overtimeTime=x.overtimeTime+'小时';

            x.absenteeismNumber=(x.absenteeismNumber+x.absenteeismNumber2)+'次';
            mythis.tableDataTemp.push(x);
          });
        }).catch((err) => {
          mythis.loding=false;
          console.log("请求失败:"+err)
        });
      }
    }
  }
</script>

<style>
  .warpe{
    height: 80px;
    display: flex;
    position: relative;
    align-items: center;
    padding-left: 20px;

  }


</style>
