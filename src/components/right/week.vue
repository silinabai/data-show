<template lang="html">
  <div id="week"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/line'
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
      this.myChart = echarts.init(document.getElementById('week'));
      this.myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: '一周内充电电量与次数',
          top: 8,
          left: 20,
          textStyle: {
            color: '#c6c6c6',
            fontSize: 14
          }
        },
        grid: {
          bottom: 30,
          height: 180,
          width: '75%',
          left: '12%'
        },
        legend: {
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          top: 10,
          right: 20,
          orient: 'horizontal',
          data: ['直流电量', '交流电量', '次数']
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
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
            name: '直流电量',
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#0052d6' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#50e5ed' // 100% 处的颜色
                }], false)
              }
            },
            barWidth: 10,
            data: [800, 1300, 200, 1100, 2100, 800, 1300]
          },
          {
            name: '交流电量',
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#f33c53' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#ffb24f' // 100% 处的颜色
                }], false)
              }
            },
            barWidth: 10,
            data: [1200, 2900, 800, 2700, 3800, 1400, 2200]
          },
          {
            name: '次数',
            type: 'line',
            yAxisIndex: 1,
            symbolSize: 6,
            symbol: 'circle',
            itemStyle: {
              normal: {
                "color": "#00d569"
              }
            },
            lineStyle: {
              normal: {
                "color": "#00d569"
              }
            },
            data: [190, 320, 90, 300, 270, 450, 300]
          }
        ]
      })
      this._init()
    }
  }
</script>

<style lang="scss">
  #week {
    width: 100%;
    height: 305px;
    margin-top: 25px;
    background-color: #050a1e;
    box-shadow: 0 5px 8px 0 #060112;
    border: solid 1px #131c7d;
  }
</style>
