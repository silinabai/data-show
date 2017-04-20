<template lang="html">
  <div id='charts-three'></div>
</template>

<script>
import echarts from 'echarts'
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
        splitNumber: 10,
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
        data: ['北京市', '上海市', '深圳市', '杭州', '广州', '太原', '南京', '哈尔滨', '长春', '沈阳']
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
        data: [82, 78, 74, 70, 60, 55, 52, 45, 40, 35]
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
