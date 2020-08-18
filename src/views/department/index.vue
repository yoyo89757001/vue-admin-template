<template>
  <div>
    <el-row class="warpe">

          <el-col :span="22">
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

          <el-col :span="2">
            <el-button type="primary" style="margin-left: 10px" @click="isCompanyName=true">新增部门</el-button>
            <!--   弹窗-->
            <el-dialog title="新增部门" :visible.sync="isCompanyName" center :width="formLabelWidth" :modal="loding">
              <span >部门名称</span>
              <el-input v-model="deparementName" autocomplete="off" type="text" maxlength="18" style="margin-top: 8px"></el-input>
              <div slot="footer" class="dialog-footer">
                <el-button @click="isCompanyName = false" style="margin-right: 20px">取 消</el-button>
                <el-button type="primary" @click="dialog_companyName">确 定</el-button>
              </div>
            </el-dialog>
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
      label="部门名称"
      align="center"
      width="140">
    </el-table-column>
    <el-table-column
      label="部门人数"
      prop="num">
    </el-table-column>

    <el-table-column
      align="center"
      fixed="right"
      label="操作"
      width="170">



      <template slot-scope="scope">
        <el-button @click="handleClick(scope.$index,1)" type="primary" size="small">编辑</el-button>
        <!--   弹窗-->
        <el-dialog title="修改部门名称" :visible.sync="isCompanyName2" center :width="formLabelWidth" :modal='loding'>
          <span >部门名称</span>
          <el-input v-model="deparementName" autocomplete="off" type="text" maxlength="18" style="margin-top: 8px"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isCompanyName2=false" style="margin-right: 20px">取 消</el-button>
            <el-button type="primary" @click="dialog_companyName2">确 定</el-button>
          </div>
        </el-dialog>

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

  import {getDepartment,deleteDepartment} from '@/api/people'
  import Moment from 'moment'
  import ax from "axios"; //需要安装  npm install moment --save

  export default {
    data() {
      return {
        sid:'',
        formLabelWidth: '30vw',
        isCompanyName:false,//控制修改公司名称的弹窗显示
        isCompanyName2:false,//控制修改公司名称的弹窗显示
        loding:false,
        deparementName:'',
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
      getDepartment({page:this.currentPage-1,size:this.pageSize}).then(response => {
        mythis.loding=false;
       // console.log("获取人员列表",response);
        const  {data,errorCode} =response;
        const  {requestData,total} =JSON.parse(data);
        mythis.totalNum=total;
        if (requestData.length>0){
          mythis.singlepage=false;//数量大于1时 显示分页
        }
        requestData.forEach(function (x, index) {//遍历插入
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
            this.loding=true;
            deleteDepartment(this.tableDataTemp[row].sid).then(response => {
              mythis.loding=false;
              console.log("删除人员返回",response);
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
         // this.$router.replace('/pepoleinfo_employee?id='+this.tableDataTemp[row].sid)
          // myId:this.$route.query.id,//拿到上个界面传过来的参数
          mythis.deparementName=mythis.tableDataTemp[row].name;
          mythis.isCompanyName2=true;
          console.log(mythis.tableDataTemp[row].sid,'修改sid的值');
          console.log(mythis.tableDataTemp[row].name,'修改name的值');
          mythis.sid=mythis.tableDataTemp[row].sid;
        }
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
        getDepartment({page:this.currentPage-1,size:this.pageSize}).then(response => {
          mythis.loding=false;
          //console.log("获取人员列表",response);
          const  {data,errorCode} =response;
          const  {requestData,total} =JSON.parse(data);
          mythis.totalNum=total;
          requestData.forEach(function (x, index) {//遍历插入
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
           // console.log("删除所有选中");
            this.isSC=false;
            var ids='';
            var mythis=this;
            this.multipleSelection.forEach(function (x,index) {
              ids=ids+x.sid;
              if (index!==mythis.multipleSelection.length-1){
                ids=ids+',';
              }
            });
            this.loding=true;
            deleteDepartment(ids).then(response => {
              mythis.loding=false;
             // console.log("删除人员返回",response);
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
      dialog_companyName(){//新增部门
        this.isCompanyName=false;
        if (this.deparementName===''){
          this.$message.error('部门名称不能为空')
          return;
        }
        let fd = new FormData();//转成FormData格式上传
        fd.append('name', this.deparementName);
        this.loding=true;
        var mthis=this;
        ax({
          method: 'post',
          url: '/app/person/createDepartment',
          timeout:10000,
          data:fd,
        }).then(function(res) {
          console.log(res.data,"创建部门");
          const {errorCode,errorMsg,data} = res.data;
          if (errorCode===200){
            const {code,msg} = JSON.parse(data);
            if (code===1){
              mthis.$message.success('创建部门成功');
              mthis.handleCurrentChange(mthis.currentPage)
            }else {
              mthis.$message.error(msg);
            }
          }else {
            mthis.$message.error(errorMsg);
          }
        }).catch(function (error) {
          console.log("error调用",error);
          mthis.$message.error('创建部门失败:'+error.message);
          console.log(window.location.host)

        }).finally(function () {
          console.log("finally调用");
          mthis.loding=false;
          mthis.deparementName='';
        });
      },
      dialog_companyName2(){//编辑部门
        this.isCompanyName2=false;
        let fd = new FormData();//转成FormData格式上传
        fd.append('name', this.deparementName);
        fd.append('sid', this.sid);
        this.loding=true;
        var mthis=this;
        ax({
          method: 'post',
          url: '/app/person/updataDepartment',
          timeout:10000,
          data:fd,
        }).then(function(res) {
          console.log(res.data,"编辑部门");
          const {errorCode,errorMsg,data} = res.data;
          if (errorCode===200){
            const {code,msg} = JSON.parse(data);
            if (code===1){
              mthis.$message.success('修改部门成功');
              mthis.handleCurrentChange(mthis.currentPage)
            }else {
              mthis.$message.error(msg);
            }
          }else {
            mthis.$message.error(errorMsg);
          }
        }).catch(function (error) {
          console.log("error调用",error);
          mthis.$message.error('修改部门失败:'+error.message);
          console.log(window.location.host)
        }).finally(function () {
          console.log("finally调用");
          mthis.loding=false;
          mthis.deparementName='';
          mthis.sid='';
        });
      },
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
