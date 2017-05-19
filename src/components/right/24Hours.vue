<template lang="html">
  <div id="lineChart"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/line'
  export default {
    data() {
      return {
        myChart:{},
        DCRatio:[0.559,0.544,0.561,0.553,0.577,0.569,0.532,0.566,0.564,0.537,0.580,0.534,0.537,0.564,0.554,0.539,0.533,0.565,0.545,0.558,0.532,0.579,0.534,0.570,0.542,0.554,0.549,0.577,0.570,0.543],
        ACRatio:[0.444,0.428,0.455,0.459,0.449,0.444,0.453,0.422,0.447,0.453,0.425,0.444,0.440,0.437,0.445,0.426,0.456,0.436,0.446,0.439,0.444,0.451,0.439,0.424,0.460,0.460,0.421,0.422,0.433,0.457],
        realDc: [],
        realAc: []
      }
    },
    props:['poData'],
    watch:{
      poData:function(newVal,oldVal){
        newVal.arrPowerCharged30.slice(0,30).forEach((value,index) =>{
          this.realDc.push((value.powerCharged*this.DCRatio[index]*20/10000).toFixed(2))
          this.realAc.push((value.powerCharged*this.ACRatio[index]*20/10000).toFixed(2))
        })
        this.myChart.setOption({
          series: [{
              type: 'line',
              data: this.realDc
            },
            {
              type: 'line',
              data: this.realAc
            }
          ]
        })
      }
    },
    methods: {
      _init() {
        window.addEventListener('resize', function() {
          this.myChart.resize()
        }.bind(this))
      },
      // 获取当天的时间
      getTime() {
        let arr = []
        for(let n = 1;n<31;n++){
          let dd = new Date();
          dd.setDate(dd.getDate() - n); //获取AddDayCount天后的日期
          let D = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate() //获取几号，不足10补0
          arr.push(D)
        }
        return arr
      },
    },
    mounted() {
      this.myChart = echarts.init(document.getElementById('lineChart'));
      this.myChart.setOption({
        backgroundColor: '#050a1e',
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: '30天的直流和交流电量走势',
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
          width: '80%',
          left: '10%'
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
          data: this.getTime().reverse()
        }],
        yAxis: [{
            type: 'value',
            name: '电量(万度)',
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
            data: []
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
            data: []
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
