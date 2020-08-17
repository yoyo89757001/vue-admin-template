<template>
  <div>
    <el-row class="warpe">
          <el-col :span="16">
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
          <el-col :span="4" style="text-align: right;justify-items: right;justify-content: right">
            <el-input
              style="width: 7vw;margin: 1vw;align-items: center"
              fixed="right"
              placeholder="请输入姓名"
              v-model="input"
              clearable>
            </el-input>
          </el-col>
          <el-col :span="2" style="margin-left: 10px" >
            <el-button type="primary" @click="finds">搜索访客</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="warning" style="margin-left: 10px" @click="handleClickAddPepole">新增人员</el-button>
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
        align="center"
        label="手机号码"
        width="146"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"
        align="center"
        width="166"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间"
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

  import {getPeople,deletePeople,getPeopleInfoFind} from '@/api/people'
  import Moment from 'moment' //需要安装  npm install moment --save

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
      }
    },

    created() {


    },
    mounted() {
      //界面绘制已完成
      const mythis=this;
      this.loding=true;
      getPeople({page:this.currentPage-1,size:this.pageSize,peopleType:2}).then(response => {
        mythis.loding=false;
        // console.log("获取人员列表",response);
        const  {data,errorCode} =response;
        const  {requestData,total} =JSON.parse(data);
        mythis.totalNum=total;
        if (requestData.length>0){
          mythis.singlepage=false;//数量大于1时 显示分页
        }
        requestData.forEach(function (x, index) {//遍历插入
          if (x.birthday!==undefined && x.birthday!==0){//没有时间
            //console.log(x.birthday,'x.birthday');
            //  x.birthday=Moment(stamp).format('YYYY-MM-DD HH:mm:ss');
            //console.log(Moment(Number(x.birthday)).format('YYYY年MM月DD日'),'格式化');//格式化时间
            x.birthday=Moment(Number(x.birthday)).format('YYYY年MM月DD日');
            x.startTime=Moment(Number(x.startTime)).format('YYYY-MM-DD HH:mm:ss');
            x.endTime=Moment(Number(x.endTime)).format('YYYY-MM-DD HH:mm:ss');
          }else {
            x.birthday='';
          }
          if (x.icCard===undefined || x.icCard===''){
            x.icCard='未绑定';
          }
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
      handleClick(row,type) {//删除单个
        //console.log(row);
        //console.log("列:"+row+type);
        var mythis=this;
        if (type===2 || type===3){//2删除 3取消
          this.$refs.multipleTable.$el.click(); //因为el-popover在列表中会有点击不消失的坑，所以用这个方式来模拟点击让弹窗消失。
          if (type===2){//删除数据
            mythis.loding=true;
            deletePeople(this.tableDataTemp[row].id).then(response => {
              mythis.loding=false;
             // console.log("删除人员返回",response);
              const  {data} =response;
              const  {code,msg} =JSON.parse(data);
              if (code===1){
                //this.totalNum=this.totalNum-1;
                mythis.tableDataTemp.splice(row,1); //注意，
                //  console.log(`当前页:`,this.currentPage,(this.tableDataTemp.length));
                if (mythis.tableDataTemp.length===0 && mythis.currentPage>1){ //每次删除后重新请求，因为有分页，最后一条的时候数据不好处理，会乱，
                  mythis.handleCurrentChange(mythis.currentPage-1);//请求前一
                  // console.log('减一');
                }else {
                  // console.log('没减一');
                  mythis.handleCurrentChange(mythis.currentPage)////请求当前页
                }

              }else {
                mythis.$message.error(msg)
              }
            }).catch((err) => {
              mythis.loding=false;
              console.log("请求失败:"+err)
            });
          }
        }else {//编辑,带上id
          this.$router.replace('/pepoleinfo_visitors?id='+this.tableDataTemp[row].sid)
          // myId:this.$route.query.id,//拿到上个界面传过来的参数
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;    //动态改变
      },
      handleCurrentChange(val) {//点击分页时调用的方法
      //  console.log(`当前页回调方法: ${val}`);
        this.currentPage = val;    //当前页的值，动态改变
        this.tableDataTemp=[];//先清掉数据
        const mythis=this;
        mythis.loding=true;
        getPeople({page:this.currentPage-1,size:this.pageSize,peopleType:2}).then(response => {
          mythis.loding=false;
          //console.log("获取人员列表",response);
          const  {data,errorCode} =response;
          const  {requestData,total} =JSON.parse(data);
          mythis.totalNum=total;
          requestData.forEach(function (x, index) {//遍历插入
            if (x.birthday!==undefined){//没有时间
              // console.log(x.birthday,'x.birthday');
              //  x.birthday=Moment(stamp).format('YYYY-MM-DD HH:mm:ss');
              // console.log(Moment(Number(x.birthday)).format('YYYY年MM月DD日'),'格式化');//格式化时间
              x.birthday=Moment(Number(x.birthday)).format('YYYY年MM月DD日');
              x.startTime=Moment(Number(x.startTime)).format('YYYY-MM-DD HH:mm:ss');
              x.endTime=Moment(Number(x.endTime)).format('YYYY-MM-DD HH:mm:ss');
            }else {
              x.birthday='';
            }
            if (x.icCard===undefined || x.icCard===''){
              x.icCard='未绑定';
            }
            mythis.tableDataTemp.push(x);
          });
        }).catch((err) => {
          mythis.loding=false;
          console.log("请求失败:"+err)
        });
      },
      handleClickall(type) {//删除所有选中
        //console.log(type);
        if (type===2 || type===3){
          this.$refs.multipleTable.$el.click(); //因为el-popover在列表中会有点击不消失的坑，所以用这个方式来模拟点击让弹窗消失。
          if (type===2){//删除数据
          //  console.log("删除所有选中");
            this.isSC=false;
            var ids='';
            var mythis=this;
            this.multipleSelection.forEach(function (x,index) {
              ids=ids+x.id;
              if (index!==mythis.multipleSelection.length-1){
                ids=ids+',';
              }
            });
            mythis.loding=true;
            deletePeople(ids).then(response => {
              mythis.loding=false;
              //console.log("删除人员返回",response);
              const  {data} =response;
              const  {code,msg} =JSON.parse(data);
              if (code===1){
                if (mythis.multipleSelection.length===mythis.tableDataTemp.length && mythis.currentPage>1){ //每次删除后重新请求，因为有分页，最后一条的时候数据不好处理，会乱，//就是全选了 需要减一页
                  mythis.handleCurrentChange(mythis.currentPage-1);//请求前一
                  //删除后重新调用获取列表方法
                }else {
                  //删除后重新调用获取列表方法
                  mythis.handleCurrentChange(mythis.currentPage)////请求当前页
                }
              }else {
                mythis.$message.error(msg)
              }
            }).catch((err) => {
              mythis.loding=false;
              console.log("请求失败:"+err)
            });
          }
        }
      },
      handleClickAddPepole(){//新增人员
        this.$router.replace('/pepoleinfo')
      },
      finds(){//搜索
        if (this.input.trim()===''){
          return;
        }
        var mythis=this;
        mythis.loding=true;
        getPeopleInfoFind({name:this.input,type:2}).then(response => {
          mythis.loding=false;
          const  {data} =response;
         // console.log("搜索人员返回",data);
          var de=JSON.parse(data);
          if (de!==undefined && de.length>0){
            mythis.tableDataTemp=[];//先清掉数据
            mythis.totalNum=de.length;
            de.forEach(function (x, index) {//遍历插入
              if (x.birthday !== undefined && x.birthday !== 0) {//没有时间
                //console.log(x.birthday,'x.birthday');
                //  x.birthday=Moment(stamp).format('YYYY-MM-DD HH:mm:ss');
                //console.log(Moment(Number(x.birthday)).format('YYYY年MM月DD日'),'格式化');//格式化时间
                x.birthday = Moment(Number(x.birthday)).format('YYYY年MM月DD日');
                x.startTime = Moment(Number(x.startTime)).format('YYYY-MM-DD HH:mm:ss');
                x.endTime = Moment(Number(x.endTime)).format('YYYY-MM-DD HH:mm:ss');
              } else {
                x.birthday = '';
              }
              if (x.icCard===undefined || x.icCard===''){
                x.icCard='未绑定';
              }
              mythis.tableDataTemp.push(x);
            });
          }else {
            mythis.$message.error('未搜索到人员')
          }
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
    align-items: center;
    padding-left: 20px;

  }


</style>
