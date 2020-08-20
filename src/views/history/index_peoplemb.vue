<template>
  <div>
    <el-row class="warpe">
          <el-col :span="8">
            <el-date-picker type="date" placeholder="开始日期" v-model="startTime" style="width: 100%;font-size: 12px" ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1" style="text-align: center;">--</el-col>
          <el-col :span="8">
            <el-date-picker  type="date" placeholder="结束时间" v-model="endTime" style="width: 100%;font-size: 12px" ></el-date-picker>
          </el-col>

          <el-col :span="7" style="margin-right: 4vw">
            <el-input
              style="font-size: 12px;margin-left: 10px"
              fixed="right"
              placeholder="请输入姓名"
              v-model="input"
              clearable>
            </el-input>
          </el-col>
    </el-row>
    <el-row style="margin-bottom: 10px">
      <el-col :span="6" offset="18">
        <el-button type="primary" @click="finds">搜索</el-button>
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
    style="width: 99%;margin-left: 10px">

<!--    header-align="center" 只表头居中 align="center"：表头和内容都居中-->
    <el-table-column
      prop="name"
      align="center"
      label="抓拍照片"
      width="80">
      <el-image :src="scope.row.path" style="height: 50px" slot-scope="scope" :preview-src-list="[scope.row.path]"></el-image>
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
      prop="icCard"
      label="IC卡号"
      align="center"
      width="136"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="peopleType"
      label="人员类型"
      align="center"
      width="136"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="time"
      label="记录时间"
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

  import {getHistroy} from '@/api/people'
  import Moment from 'moment' //需要安装  npm install moment --save

  export default {
    data() {
      return {
        loding:false,
        startTime:'',
        endTime:'',
        singlepage:true,//只有一页时 隐藏分页
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
      const mythis=this;
      this.loding=true;
      getHistroy({page:this.currentPage-1,size:this.pageSize,peopleType:1,name:'',type:1,startTime:0,endTime:0}).then(response => {
        const  {data,errorCode} =response;
        const  {requestData,total} =JSON.parse(data);
        mythis.totalNum=total;
        if (requestData.length>0){
          mythis.singlepage=false;//数量大于1时 显示分页
        }
        requestData.forEach(function (x, index) {//遍历插入
          if (x.time!==undefined && x.time!==0){//没有时间
            //  x.birthday=Moment(stamp).format('YYYY-MM-DD HH:mm:ss');
           // console.log(Moment(Number(x.time)).format('YYYY年MM月DD日'),'格式化');//格式化时间
            x.time=Moment(Number(x.time)).format('YYYY-MM-DD HH:mm:ss');
          }else {
            x.time='';
          }
          if (x.peopleType===1){
            x.peopleType='员工';
            if (x.icCard===undefined || x.icCard===''){
              x.icCard='未绑定';
            }
          }else if (x.peopleType===2){
            x.peopleType='访客';
            if (x.icCard===undefined || x.icCard===''){
              x.icCard='未绑定';
            }
          }else {
            x.peopleType='陌生人';
          }

          mythis.tableDataTemp.push(x);
        });
      }).catch((err) => {
        console.log("请求失败:"+err)
      }).finally((a) => {
        this.loding=false;
      });
    },
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;    //动态改变
      },
      handleCurrentChange(val) {//点击分页时调用的方法
       // console.log(`当前页回调方法: ${val}`);
        this.loding=true;
        this.currentPage = val;    //当前页的值，动态改变
        const mythis=this;
        mythis.tableDataTemp=[];//先清掉数据
        getHistroy({page:this.currentPage-1,size:this.pageSize,name:this.input,type:1,startTime:Date.parse(this.startTime),endTime:Date.parse(this.endTime)}).then(response => {
          const  {data,errorCode} =response;
          const  {requestData,total} =JSON.parse(data);
          mythis.totalNum=total;
          if (requestData.length>0){
            mythis.singlepage=false;//数量大于1时 显示分页
          }
          requestData.forEach(function (x, index) {//遍历插入
            if (x.time!==undefined && x.time!==0){//没有时间
              //  x.birthday=Moment(stamp).format('YYYY-MM-DD HH:mm:ss');
              //console.log(Moment(Number(x.time)).format('YYYY年MM月DD日'),'格式化');//格式化时间
              x.time=Moment(Number(x.time)).format('YYYY-MM-DD HH:mm:ss');
            }else {
              x.time='';
            }
            if (x.peopleType===1){
              if (x.icCard===undefined || x.icCard===''){
                x.icCard='未绑定';
              }
              x.peopleType='员工';
            }else if (x.peopleType===2){
              if (x.icCard===undefined || x.icCard===''){
                x.icCard='未绑定';
              }
              x.peopleType='访客';
            }else {
              x.peopleType='陌生人';
            }

            mythis.tableDataTemp.push(x);
          });
        }).catch((err) => {
          console.log("请求失败:"+err)
        }).finally((a) => {
          this.loding=false;
        });
      },

      finds(){//搜索
        if (this.input.trim()==='' && (this.startTime===''|| this.endTime==='')){
          this.$message.error('请输入姓名或者开始时间和结束时间');
          return;
        }
        if (Date.parse(this.endTime)<=Date.parse(this.startTime)){
          this.$message.error("开始时间不能大于等于结束时间");
          return
        }
        var mythis=this;
        this.loding=true;
        getHistroy({page:this.currentPage-1,size:this.pageSize,name:this.input,type:1,startTime:Date.parse(this.startTime),endTime:Date.parse(this.endTime)}).then(response => {
          const  {data,errorCode} =response;
          const  {requestData,total} =JSON.parse(data);
          mythis.totalNum=total;
          if (requestData.length>0){
            mythis.singlepage=false;//数量大于1时 显示分页
          }
          mythis.tableDataTemp=[];//先清掉数据
          requestData.forEach(function (x, index) {//遍历插入
            if (x.time!==undefined && x.time!==0){//没有时间
              //  x.birthday=Moment(stamp).format('YYYY-MM-DD HH:mm:ss');
             // console.log(Moment(Number(x.time)).format('YYYY年MM月DD日'),'格式化');//格式化时间
              x.time=Moment(Number(x.time)).format('YYYY-MM-DD HH:mm:ss');
            }else {
              x.time='';
            }
            if (x.peopleType===1){
              x.peopleType='员工';
              if (x.icCard===undefined || x.icCard===''){
                x.icCard='未绑定';
              }
            }else if (x.peopleType===2){
              x.peopleType='访客';
              if (x.icCard===undefined || x.icCard===''){
                x.icCard='未绑定';
              }
            }else {
              x.peopleType='陌生人';
            }

            mythis.tableDataTemp.push(x);
          });
        }).catch((err) => {
          console.log("请求失败:"+err)
        }).finally((a) => {
          this.loding=false;
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
