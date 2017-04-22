<template lang="html">
  <div id='charts-one'></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
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
    this.myChart = echarts.init(document.getElementById('charts-one'));
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
        },
        fontStyle: {
          color: 'red'
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
        data: [9574, 8325, 7617, 5828, 5619, 5162, 4829, 4745, 4704, 4496]
      }]
    })
    this._init()
  }
}
</script>

<style lang="scss" scoped>
#charts-one {
  width: 100%;
  height: 275px;
  margin-top: 25px;
}
</style>
