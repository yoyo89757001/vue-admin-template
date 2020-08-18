<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="12">
        <div ref="chart11" style="width:40vw;height:22vw;text-align: center;margin-top: 20px;margin-left: 20px"></div>
      </el-col>
      <el-col :span="12">
        <div ref="chart12" style="width:40vw;height:22vw;text-align: center;margin-top: 20px"></div>
      </el-col>
    </el-row>
    <div ref="chart13" style="height:22vw;margin-top: 20px;margin-left: 20px;"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import jpg from '@/assets/timg_bg.jpg'
import {getDashboard} from '@/api/people'

//图表
// 注意！目前我遇到两个比较特殊的图表需要在main.js里面引入一下才能使用，一个是词云图，一个是盒须图。代码如下：
// require('echarts-wordcloud')
// require('echarts/dist/extension/dataTool.js')
// var echarts = require('echarts');


export default {
  mounted() {//计算属性
    const mythis=this;
    getDashboard().then(response => {
      // console.log("获取人员列表",response);
      const  {data,errorCode} =response;
      const  {sex1,sex2,yg,fk,xDataString,xDataInt,total} =JSON.parse(data);

      mythis.getEchartData1(sex1,sex2);
      mythis.getEchartData2(yg,fk);
      mythis.getEchartData3(xDataString,xDataInt,total);

    }).catch((err) => {
      console.log("请求失败:"+err)
    });




  },
  methods:{//方法
    getEchartData1(sex1,sex2) {
      const chart = this.$refs.chart11;
      if (chart) {
        const myChart = this.$echarts.init(chart);
        const option = {
          title:{
            text: "男女比例",
          },
          series: {
            itemStyle: {
              // 阴影的大小
              shadowBlur: 15,
              // 阴影水平方向上的偏移
              shadowOffsetX: 0,
              // 阴影垂直方向上的偏移
              shadowOffsetY: 0,
              // 阴影颜色
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            },
            color: ['#1f85ff','#e09ebf'],
            type: 'pie',
            data: [
              {name: '男('+(sex1/(sex1+sex2)*100+'').substring(0,4)+'%)', value: sex1},
              {name: '女('+(sex2/(sex1+sex2)*100+'').substring(0,4)+'%)', value: sex2},
            ]
          }
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize()
        })
      }
      },
    getEchartData2(yg,fk) {
      const chart = this.$refs.chart12;
      if (chart) {
        const myChart = this.$echarts.init(chart);
        const option = {
          title:{
            text: "类型比例",
          },
          series: {
            itemStyle: {
              // 阴影的大小
              shadowBlur: 15,
              // 阴影水平方向上的偏移
              shadowOffsetX: 0,
              // 阴影垂直方向上的偏移
              shadowOffsetY: 0,
              // 阴影颜色
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
            color: ['#1f85ff','#e09ebf'],
            type: 'pie',
            data: [
              {name: '员工('+(yg/(yg+fk)*100+'').substring(0,4)+'%)', value: yg},
              {name: '访客('+(fk/(yg+fk)*100+'').substring(0,4)+'%)', value: fk},
            ]
          }
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize()
        })
      }
    },
    getEchartData3(names,values,total) {
      const chart = this.$refs.chart13;
      if (chart) {
        const myChart = this.$echarts.init(chart);
        myChart.setOption({
          title: {
            text: '各部门人数统计(总人数:'+total+")"
          },
          tooltip: {},
          legend: {
            color:['#1f85ff'],
            data:['人数']
          },
          xAxis: {
            data: names,
          },
          yAxis: {},
          series: [{
            name: '人数',
            type: 'bar',
            data: values,
            barMaxWidth:50,
            itemStyle:{
              color:['#248eff'],
            }
          }]
        });
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize()
        })
      }
    },
  },
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data:function () {
    return {
      imgUrl: jpg,
    }
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 0;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
  .aa{
    width: 100%;
    height: 100%;
  }

</style>
