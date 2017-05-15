<template lang="html">
  <div id="TwelveMonth"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/component/tooltip'
  export default {
    data() {
      return {
        myChart:{}
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
      this.myChart = echarts.init(document.getElementById('TwelveMonth'));
      this.myChart.setOption({
        backgroundColor: 'rgba(5, 10, 30,0.64)',
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: '12个月的充电电量和充电次数走势',
          top: 10,
          left: 20,
          textStyle: {
            color: '#c6c6c6',
            fontSize: 15
          }
        },
        grid: {
          bottom: 30,
          height: '60%',
          width: '84%',
          left: '8%'
        },
        legend: {
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          top: 10,
          right: 20,
          orient: 'horizontal',
          data: ['电量', '次数']
        },
        xAxis: [{
          type: 'category',
          // 轴线颜色
          axisLine: {
            lineStyle: {
              color: '#131c7d'
            }
          },
          // 轴线刻度字体颜色
          axisLabel: {
            textStyle: {
              color: '#81878d'
            }
          },
          splitLine: {
            "show": false
          },
          // 轴线刻度
          axisTick: {
            "show": false
          },
          // 区域提示
          splitArea: {
            "show": false
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月']
        }],
        yAxis: [{
            type: 'value',
            name: '电量',
            axisLine: {
              lineStyle: {
                color: '#131c7d',
                fontSize: 12
              }
            },
            nameTextStyle:{
              color: '#81878d'
            },
            axisLabel: {
              textStyle: {
                color: '#81878d'
              }
            },
            splitLine: {
              "show": false
            },
            axisTick: {
              "show": false
            },
            splitArea: {
              "show": false
            }
          },
          {
            type: 'value',
            name: '次数',
            axisLine: {
              lineStyle: {
                color: '#131c7d',
                fontSize: 12
              }
            },
            nameTextStyle:{
              color: '#81878d'
            },
            splitLine: {
              "show": false
            },
            axisTick: {
              "show": false
            },
            splitArea: {
              "show": false
            },
            axisLabel: {
              textStyle: {
                color: '#81878d'
              }
            },
          }
        ],
        series: [{
            name: '电量',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#00bdfd'
              }
            },
            barWidth: 10,
            data: [858.96, 529.55, 242.02, 345.94, 448.74, 636.11, 417.60 ,858.96, 529.55, 242.02, 345.94, 448.74]
          },
          {
            name: '次数',
            type: 'bar',
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: '#0154d6'
              }
            },
            barWidth: 10,
            data: [452.12, 510.26, 878.61, 962.72, 1061.23, 645.34, 410.02,452.12, 510.26, 878.61, 962.72, 1061.23]
          }
        ]
      })
      this._init()
    }
  }
</script>

<style lang="scss" scoped>
  #TwelveMonth {
    width: 100%;
    height: 35%;
    margin-top: 2%;
    box-shadow: 0 5px 8px 0 #060112;
    border: solid 1px #131c7d;
  }
</style>
