<template lang="html">
  <div class="hour" id='hour'></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/heatmap'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/title'
export default {
  data() {
    return {
      hours: ['0', '1', '2', '3', '4', '5', '6', '7',
        '8', '9', '10', '11', '12',
        '13', '14', '15', '16', '17', '18',
        '19', '20', '21', '22', '23'
      ],
      days: ['一', '二', '三', '四', '五', '六', '日'],
      text: [],
      myChart: {}
    }
  },
  methods: {
    _init() {
      window.addEventListener('resize', function() {
        this.myChart.resize()
      }.bind(this))
    },
    setOption() {
      this.myChart.setOption({
        backgroundColor: '#050a1e',
        title: {
          text: '7 X 24小时充电电量分布',
          left: '22%',
          top: 20,
          textStyle: {
            color: '#fff',
            fontSize: 18
          }
        },
        tooltip: {
          show: false
        },
        grid: {
          width: '83%',
          height: '70%',
          y: '20%',
          x: '9%'
        },
        visualMap: {
          min: 0,
          max: 100,
          hoverLink: false,
          calculable: false,
          orient: 'vertical',
          right: 10,
          itemWidth: 10,
          itemHeight: 140,
          bottom: '8.2%',
          inRange: {
            color: ['#5aabfd', '#8100c8']
          }
        },
        xAxis: {
          type: 'category',
          data: this.hours,
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#3a465c', '#37414d']
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#81878d'
            }
          },
        },
        yAxis: {
          type: 'category',
          data: this.days,
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#37414d', '#3a465c']
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#81878d'
            }
          },
        },
        series: [{
          name: '电量',
          type: 'heatmap',
          data: this.text,
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      })
    }
  },
  created() {
    var that = this
    this.axios.get('static/7-24.json')
      .then(function(res) {
        for (var t = 0; t < res.data.length; t++) {
          var e = res.data[t];
          for (var i in e) {
            var item = [Number(i), t, Number(e[i]).toFixed(0)];
            that.text.push(item);
          }
        }
        that.setOption()
      }).catch(function(err) {
        console.log(err)
      })
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('hour'));
    this._init()
  }
}
</script>

<style lang="scss">
.hour {
    float: left;
    width: 48%;
    margin-right: 0.5%;
    height: 305px;
    background-color: #050a1e;
    box-shadow: 0 5px 8px 0 #060112;
    border: solid 1px #131c7d;
}
</style>
