<template lang="html">
<div class="site-top" id='siteTop'></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/bar'
  export default {
    data() {
      return {
        myChart: {},
        xAxisData:['百度站点', '宝信智能', '瞰都国际', '中国消防博物馆', '贵州长顺充电站', '国宾大厦', '保利嘉园'],
        yAxisData:[10, 52, 200, 334, 390, 330, 240]
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
          data: this.xAxisData
        }],
        yAxis: [{
          type: 'value',
          name: '电量',
          nameTextStyle:{
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
          name: '电量',
          type: 'bar',
          barWidth: '60%',
          // 柱状图顶部文字
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle:{
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
          },
          data: this.yAxisData
        }]
      })
      this._init()
    }
  }
</script>

<style lang="scss" scoped>
  .site-top {
    width: 100%;
    height: 100%;
  }
</style>
