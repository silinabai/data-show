<template lang="html">
  <div id="lineChart"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/line'
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
      this.myChart = echarts.init(document.getElementById('lineChart'));
      this.myChart.setOption({
        backgroundColor: '#050a1e',
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: '24小时的直流和交流电量走势',
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
          data: ['直流', '交流']
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
          data: ['0','1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
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
          }
        ],
        series: [{
            name: '直流',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#0072fd'
              }
            },
            barWidth: 10,
            data: [858.96, 529.55, 242.02, 345.94, 448.74, 636.11, 417.60 ,858.96, 529.55, 242.02, 345.94, 448.74,858.96, 529.55, 242.02, 345.94, 448.74, 636.11, 417.60 ,858.96, 529.55, 242.02, 345.94, 448.74]
          },
          {
            name: '交流',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#0bb33c'
              }
            },
            barWidth: 10,
            data: [452.12, 510.26, 878.61, 962.72, 1061.23, 645.34, 410.02,452.12, 510.26, 878.61, 962.72, 1061.23,452.12, 510.26, 878.61, 962.72, 1061.23, 645.34, 410.02,452.12, 510.26, 878.61, 962.72, 1061.23]
          }
        ]
      })
      this._init()
    }
  }
</script>

<style lang="scss" scoped>
  #lineChart {
    width: 100%;
    height: 35%;
    opacity: 0.64;
    margin-top: 2%;
    opacity: 0.64;
    box-shadow: 0 5px 8px 0 #060112;
    border: solid 1px #131c7d;
  }
</style>
