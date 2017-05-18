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
    props:['poData'],
    watch:{
      poData:function(newVal,oldVal){
        //父组件传过来的值进行处理
        let realPowerCharged = []
        let realTimeCout = []
        newVal.arrPowerCharged12.forEach(value =>{
          realPowerCharged.push(value*20/10000)
        })
        newVal.arrTimesCount12.forEach(value =>{
          realTimeCout.push(value*20/10000)
        })
        this.myChart.setOption({
          series: [{
              type: 'bar',
              data: realPowerCharged
            },
            {
              type: 'bar',
              data: realTimeCout
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
        for(let n=0;n<12;n++){
          let dd = new Date();
          dd.setMonth(dd.getMonth() + n); //获取AddDayCount天后的日期
          let M = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1) //获取月份，不足10补0
          arr.push(M+'月')
        }
        return arr
      },
    },
    mounted() {
      // 实例化
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
          data: this.getTime()
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
          },
          {
            type: 'value',
            name: '次数(万次)',
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
            data: []
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
            data: []
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
