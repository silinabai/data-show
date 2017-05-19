<template lang="html">
<div class="site-top" id='siteTop'></div>
</template>

<script>
import {
  baseUrl
} from '../tool'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
export default {
  data() {
    return {
      myChart: {},
    }
  },
  props: ['TopData'],
  watch: {
    TopData: function(newVal, oldVal) {
      let x = []
      let y = []
      newVal.forEach((value) => {
        x.push(value.siteTitle)
        y.push((value.powerCharged).toFixed(0))
        this.ids.push(value.siteId)
      })
      this.myChart.setOption({
        xAxis: [{
          data: x
        }],
        series: [{
          data: y
        }]
      })
    }
  },
  computed: {
    xAxisData: function() {
      let arr = []
      this.TopData.forEach(value => {
        arr.push(value.siteTitle)
      })
      return arr
    },
    yAxisData: function() {
      let arr = []
      this.TopData.forEach(value => {
        arr.push((value.powerCharged).toFixed(0))
      })
      return arr
    },
    ids: function() {
      let arr = []
      this.TopData.forEach(value => {
        arr.push(value.siteId)
      })
      return arr
    }
  },
  methods: {
    _init() {
      window.addEventListener('resize', function() {
        this.myChart.resize()
      }.bind(this))
    },
    jumpURL: function() {
      this.myChart.on('click', (e) => {
        window.open(`${baseUrl}/orderQuery.html?siteId=${this.ids[e.dataIndex]}`)
      })
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('siteTop'));
    this.myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '8%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        axisTick: {
          show: false
        },
        data: this.xAxisData,
        axisLine: {
          lineStyle: {
            color: '#055AC9'
          }
        },
        axisLabel: {
          interval: 0,
          rotate: -30,
          margin: 10,
          textStyle: {
            color: '#81878d'
          }
        },
      }],
      yAxis: [{
        type: 'value',
        name: '电量(度)',
        nameTextStyle: {
          color: '#81878d'
        },
        // 刻度
        axisTick: {
          show: false
        },
        // 去掉标记线
        splitLine: {
          "show": false
        },
        axisLine: {
          lineStyle: {
            color: '#055AC9'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#81878d'
          }
        }
      }],
      series: [{
        name: '电量(度)',
        type: 'bar',
        data: this.yAxisData,
        barWidth: '60%',
        // 柱状图顶部文字
        label: {
          normal: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#fff',
              fontSize: 18
            }
          }
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: '#0072FD' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#4ED2FF' // 100% 处的颜色
            }], false)
          }
        }
      }]
    })
    this._init()
    // 点击跳转订单列表页
    this.jumpURL()
  }
}
</script>

<style lang="scss" scoped>
.site-top {
    width: 100%;
    height: 100%;
}
</style>
