<template lang="html">
<div id="ring"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
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
    this._init()
    this.myChart = echarts.init(document.getElementById('ring'))
    this.myChart.setOption({
      backgroundColor: 'rgba(5, 10, 30,0.64)',
      title: {
        text: '6种车型的充电电量比例',
        textStyle: {
          color: '#c6c6c6',
          fontSize: 15
        },
        top: '10px',
        left: '20px'
      },
      legend: {
        orient: 'vertical',
        itemGap: 20,
        itemWidth: 10,
        itemHeight: 10,
        textStyle:{
          color: '#686f77'
        },
        top: '50px',
        left: '20px',
        data: ['客车', '出租车', '物流车', '私家车', '分时租赁', '公务车']
      },
      series: [{
        name: '充电信息',
        type: 'pie',
        center: ['70%', '55%'],
        radius: ['50%', '70%'],
        color: ['#4a90e2', '#00bfff', '#9013fe', '#1b30b8', '#0bb33c', '#8dee23'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            formatter:function(param){
              return param.name + param.percent+'%'
            },
            textStyle: {
              fontSize: '16',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{
            value: 335,
            name: '客车',
          },
          {
            value: 310,
            name: '出租车'
          },
          {
            value: 234,
            name: '物流车'
          },
          {
            value: 135,
            name: '私家车'
          },
          {
            value: 1548,
            name: '分时租赁'
          },
          {
            value: 1548,
            name: '公务车'
          }
        ]
      }]
    })
  }
}
</script>

<style lang="scss" scoped>
#ring {
    width: 100%;
    height: 35%;
    margin-top: 3%;
    box-shadow: 0 5px 8px 0 #060112;
    border: solid 1px #131c7d;
}
</style>
