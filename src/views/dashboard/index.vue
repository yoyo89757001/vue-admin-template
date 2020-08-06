<template>
  <div class="dashboard-container">
    <div ref="chart12" style="width:50%;height:20vw"></div>
    <p style="margin-left: 20px">入库统计</p>
    <p>{{name}}</p>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import jpg from '@/assets/timg_bg.jpg'

//图表
// 注意！目前我遇到两个比较特殊的图表需要在main.js里面引入一下才能使用，一个是词云图，一个是盒须图。代码如下：
//
// require('echarts-wordcloud')
// require('echarts/dist/extension/dataTool.js')

// var echarts = require('echarts');


export default {
  mounted() {//计算属性
    this.getEchartData()
  },
  methods:{//方法
    getEchartData() {
      const chart = this.$refs.chart12;
      if (chart) {
        const myChart = this.$echarts.init(chart);
        const option = {
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
            color: ['#83ff47','#63e0d9'],
            type: 'pie',
            data: [
              {name: '男', value: 1212},
              {name: '女', value: 2323},
            ]
          }
        };
        myChart.setOption(option)
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
