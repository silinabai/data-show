<template lang="html">
  <div id='charts-three'></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
export default {
  data() {
    return {
      myChart: {}
    }
  },
  methods: {
    _init() {
      window.addEventListener('resize', function() {
        this.myChart.resize()
      }.bind(this))
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('charts-three'));
    this.myChart.setOption({
      //提示框组件
      tooltip: {
        //触发类型
        trigger: 'axis',
        //指示器
        axisPointer: {
          type: 'shadow'
        },
        //提示悬浮文字
        formatter: "{b} : {c}"
      },
      grid: {
        left: '0%',
        right: '8%',
        bottom: '0%',
        top: '0%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        position: 'top',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#81878d'
          }
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'category',
        nameLocation: 'start',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#81878d'
          }
        },
        inverse: 'true', //排序
        data: ['北京市', '上海市', '苏州市', '大连市', '南京市', '廊坊市', '张家口市', '杭州市', '合肥市', '济宁市']
      },
      series: [{
        type: 'bar',
        barWidth: 15,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
              offset: 0,
              color: '#0052d6' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#50bded' // 100% 处的颜色
            }], false)
          }
        },
        data: [35420, 30800, 28182, 21560, 20790, 19096, 17864, 17556, 17402, 16632]
      }]
    })
    this._init()
  }
}
</script>

<style lang="scss" scoped>
#charts-three {
  width: 100%;
  height: 275px;
  margin-top: 25px;
}
</style>
