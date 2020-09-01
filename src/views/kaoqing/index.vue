<template>
  <div class="_calendar _container">
    <el-container>
      <el-main>
        <!-- <el-card> -->
        <p style="margin-left: 20px;color: #409EFF">点击日历自定义添加上班时间,或者在右边删除不需要上班的时间</p>
        <el-calendar v-model="value" :first-day-of-week="7">
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template slot="dateCell" slot-scope="{date, data}">
            <div slot="reference" class="div-Calendar" @click="calendarOnClick(data)">
              <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split('-').slice(1).join('-') }}
                <i
                  :class="[data.isSelected ?'el-icon-check':'']"
                ></i>

<!--                <i  class="el-icon-s-claim"></i>-->
<!--                 <i class="el-icon-coffee-cup"></i>-->
              </p>
              <p :class="data.isSelected ? 'is-selected' : ''">
              <i v-if="isArrange.some(function(item,index,array) {//some()是对数组中每一项运行给定函数，如果该函数对任一项返回true，则返回true

                return item===data.day
              })">班</i>
              <i v-else>休</i>
              </p>

            </div>
          </template>
        </el-calendar>
        <!-- </el-card> -->
      </el-main>

      <el-aside width="40%" style="overflow: hidden;">
        <!-- <el-card> -->
        <div  style="margin-top: 20px;margin-left: 20px">
          <div class="el-calendar__title">工作日列表</div>
          <div class="el-calendar__button-group">
<!--            <div class="el-button-group">-->
<!--              <button-->
<!--                type="button"-->
<!--                class="el-button el-button&#45;&#45;plain el-button&#45;&#45;mini"-->
<!--                @click="saveOnClick"-->
<!--              >-->
<!--                <span>新增</span>-->
<!--              </button>-->
<!--            </div>-->
          </div>
        </div>


        <div class="calendar-info" style="margin-top: 20px;height: 40vw" >
          <ul v-infinite-scroll="load" style="overflow:auto">
          <div style="padding: 8px;" v-for="(item,i) in isArrange">
            <div role="alert" class="el-alert el-alert--success is-dark" @click="infoOnClick">
              <i class="el-alert__icon el-icon-success is-big"></i>
              <div class="el-alert__content">
                <span class="el-alert__title is-bold">{{item}} 班</span>
                <i class="el-alert__closebtn el-icon-close" @click.stop="infoDel"></i>
              </div>
            </div>
          </div>
        </ul>
        </div>
        <!-- </el-card> -->
      </el-aside>
    </el-container>
<!--    <calendarDrawer ref="calendarDrawer"></calendarDrawer> 打卡详情-->
<!--    <calendarForm ref="calendarForm"></calendarForm> 新增排位-->

    <el-divider></el-divider>
    <p style="margin-left: 20px;color: #409EFF">选择每个星期上班的天数</p>
    <el-button  style="margin-left: 20px;margin-top: 20px;margin-bottom: 20px" v-for="(index,i) in buttontype" :type=index.type @click="weekClick(i)">{{index.name}}</el-button>

    <p style="margin-left: 20px;">
      <template >
        <el-radio v-model="radio" label="1" @change="kaoqingChange">两次考勤</el-radio>
        <el-radio v-model="radio" label="2" @change="kaoqingChange">四次考勤</el-radio>
      </template>
    </p>
    <div style="margin-left: 20px;margin-top: 20px" v-show="radio==='1'">
      <div>上班
        <el-time-select
          style="margin-right: 3vw;margin-left: 8px"
          v-model="startTime"
          :picker-options="{
           start: '05:00',
           step: '0:10',
           end: '13:00'}"
          placeholder="选择时间">
        </el-time-select>
         下班
          <el-time-select
            style="margin-left: 8px"
            v-model="endTime"
            :picker-options="{
           start: '12:00',
           step: '0:10',
           end: '23:30'}"
            placeholder="选择时间">
          </el-time-select>
      </div>
      <div style="margin-top: 20px">
        晚于
        <el-input v-model="minute1_1" placeholder="分钟" style="width: 5vw;margin-left: 8px;margin-right: 8px" oninput="value=value.replace(/[^\d]/g,'')" maxlength="5"></el-input>
        为<span style="color: red"><strong>迟到</strong></span>

        <span style="margin-left: 10vw">早于</span>
        <el-input v-model="minute1_2" placeholder="分钟" style="width: 5vw;margin-left: 8px;margin-right: 8px" oninput="value=value.replace(/[^\d]/g,'')" maxlength="5"></el-input>
        为<span style="color: red"><strong>早退</strong></span>

        <span style="margin-left: 10vw">下班后</span>
        <el-input v-model="minute1_3" placeholder="分钟" style="width: 5vw;margin-left: 8px;margin-right: 8px" oninput="value=value.replace(/[^\d]/g,'')" maxlength="5"></el-input>
        为<span style="color: red"><strong>加班</strong></span>

      </div>
    </div>

  <!--    四次考勤-->
    <div style="margin-left: 20px;margin-top: 20px" v-show="radio==='2'">
      <div>上午上班
        <el-time-select
          style="margin-right: 3vw;margin-left: 8px"
          v-model="startTime1"
          :picker-options="{
           start: '05:00',
           step: '0:10',
           end: '11:00'}"
          placeholder="选择时间">
        </el-time-select>
        上午下班
        <el-time-select
          style="margin-left: 8px"
          v-model="endTime1"
          :picker-options="{
           start: '10:00',
           step: '0:10',
           end: '14:00'}"
          placeholder="选择时间">
        </el-time-select>
      </div>
      <div>下午上班
        <el-time-select
          style="margin-right: 3vw;margin-left: 8px;margin-top: 20px"
          v-model="startTime2"
          :picker-options="{
           start: '12:00',
           step: '0:10',
           end: '18:00'}"
          placeholder="选择时间">
        </el-time-select>
        下午下班
        <el-time-select
          style="margin-left: 8px"
          v-model="endTime2"
          :picker-options="{
           start: '12:00',
           step: '0:10',
           end: '23:30'}"
          placeholder="选择时间">
        </el-time-select>
      </div>
      <div style="margin-top: 20px">
        晚于
        <el-input v-model="minute2_1" placeholder="分钟" style="width: 5vw;margin-left: 8px;margin-right: 8px" oninput="value=value.replace(/[^\d]/g,'')" maxlength="5"></el-input>
        为<span style="color: red"><strong>迟到</strong></span>

        <span style="margin-left: 10vw">早于</span>
        <el-input v-model="minute2_2" placeholder="分钟" style="width: 5vw;margin-left: 8px;margin-right: 8px" oninput="value=value.replace(/[^\d]/g,'')" maxlength="5"></el-input>
        为<span style="color: red"><strong>早退</strong></span>

        <span style="margin-left: 10vw">下班后</span>
        <el-input v-model="minute2_3" placeholder="分钟" style="width: 5vw;margin-left: 8px;margin-right: 8px" oninput="value=value.replace(/[^\d]/g,'')" maxlength="5"></el-input>
        为<span style="color: red"><strong>加班</strong></span>

      </div>
    </div>


  </div>
</template>
<script>
  // import calendarDrawer from "../calendar/calendar-drawer.vue";
 // import calendarForm from "../calendar/calendar-form.vue";
  export default {
    components: {  },
    data: function() {
      return {
        value: new Date(),
        isArrange: ['2020-06-08'],
        radio: '1',
        startTime:'',
        endTime:'',
        startTime1:'',
        endTime1:'',
        startTime2:'',
        endTime2:'',
        minute1_1:'',
        minute1_2:'',
        minute1_3:'',
        minute2_1:'',
        minute2_2:'',
        minute2_3:'',
        buttontype:[{type:'primary','name':'星期一'},{type:'primary','name':'星期二'},{type:'primary','name':'星期三'},{type:'primary','name':'星期四'},{type:'primary','name':'星期五'},{type:'info','name':'星期六'},{type:'info','name':'星期天'}],
      };
    },
    created: function() {
      this.$nextTick(() => {
        // 点击前一个月
        let prevBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(1)"
        );
        prevBtn.addEventListener("click", e => {
          console.log(this.data);
          // this.$notify({
          //   title: "上一月",
          //   message: "上个月头天：" + this.value,
          //   type: "success",
          //   position: "top-left"
          // });
        });

        //点击下一个月
        let nextBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(3)"
        );
        nextBtn.addEventListener("click", () => {
          console.log(this.value);
          // this.$notify({
          //   title: "下一月",
          //   message: "下个月头天：" + this.value,
          //   type: "warning",
          //   position: "top-left"
          // });
        });

        //点击今天
        let todayBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(2)"
        );
        todayBtn.addEventListener("click", () => {

          // this.$notify.info({
          //   title: "今天",
          //   message: "今天：" + this.value,
          //   position: "top-left"
          // });
        });
      });
    },
    mounted: function() {},
    methods: {
      //点击日期块
      calendarOnClick(e) {
        if (this.isArrange.length===0){
          this.isArrange.push(e.day);
        }
        var isPush=true;
        this.isArrange.forEach((value, index) => {
          if (value===e.day){
            isPush=false;
             return 0;
          }
        });//有相同的就不添加
        if (isPush){
          this.isArrange.push(e.day);
        }

        console.log(e,'oooooo',this.isArrange);
        // this.$notify.error({
        //   title: "日历块点击",
        //   message: e,
        //   position: "top-left"
        // });
      },
      load () {//加载更多
        console.log('dddddddd');
      },
      kaoqingChange(){//两次考勤，或者四次考勤
        console.log(this.radio)
      },
      weekClick(i){//星期点击事件
        console.log(i);
        this.buttontype.forEach((value, index) => {
          if (index===i){
            if (value.type==='primary'){
              value.type='info'
            }else {
              value.type='primary'
            }
          }
        });
      },
      //点击信息块
      infoOnClick() {
        //this.$refs.calendarDrawer.drawer = true;
      },
      //新增排班
      saveOnClick() {
        //this.$refs.calendarForm.dialogFormVisible = true;
      },
      //删除排班
      infoDel() {
        this.$confirm("此操作将删除该上班日期, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    }
  };
</script>
<style scoped>
  .is-selected {
    color: #1989fa;
  }
  .p-popover {
    text-align: center;
  }

  .el-main {
    padding: 0;
    overflow: hidden;
  }
  .calendar-info {
    height: 95%;
    overflow: auto;
  }
  .el-alert {
    margin: 1px 0;
  }
  .el-alert:hover {
    transform: scale(1.02);
  }
  .el-alert:active {
    transform: scale(1.01);
  }
  .el-alert__content i {
    font-size: 16px;
  }

  .theme-dark .calendar-info {
    background-color: #1d1e1f;
    border-left: 1px solid #404042;
  }
  .theme-light .calendar-info,
  .theme-light .el-calendar__header {
    background-color: #fff;
    border-left: 1px solid #ebeef5;
  }
</style>
<style >
  ._calendar .div-Calendar {
    height: 122px;
    box-sizing: border-box;
    padding: 8px;
  }
  ._calendar .el-calendar-table .el-calendar-day {
    padding: 0;
    height: 122px;
  }
  ._calendar .el-container,
  ._calendar .el-calendar {
    height: 100%;
  }

</style>
