<template lang="html">
  <div id="year"></div>
</template>

<script>
import echarts from 'echarts'

function getVirtulData(year) {
  year = year || '2017';
  var date = +echarts.number.parseDate(year + '-01-01');
  var end = +echarts.number.parseDate((+year + 1) + '-01-01');
  var dayTime = 3600 * 24 * 1000;
  var data = [];
  for (var time = date; time < end; time += dayTime) {
    data.push([
      echarts.format.formatTime('yyyy-MM-dd', time),
      Math.floor(Math.random() * 10000)
    ]);
  }
  return data;
}

var data = getVirtulData(2016);
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
    this.myChart = echarts.init(document.getElementById('year'));
    this.myChart.setOption({
      backgroundColor: '#050a1e',
      tooltip: {
        trigger: 'item'
      },
      // 日历组件
      calendar: [{
        top: 55,
        left: 'center',
        cellSize: [13, 13],
        range: ['2016-01-01', '2016-06-30'],
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(128, 128, 128, 0.1)',
            width: 1,
            type: 'solid'
          }
        },
        dayLabel: {
          nameMap: 'cn',
          textStyle: {
            color: '#81878d',
            fontSize: 10
          }
        },
        monthLabel: {
          nameMap: 'cn',
          textStyle: {
            color: '#81878d',
            fontSize: 10
          }
        },
        yearLabel: {
          formatter: '{start}  上半年',
          position: 'top',
          textStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
        itemStyle: {
          normal: {
            color: '#323c48',
            borderWidth: 1,
            borderColor: '#111'
          }
        }
      }, {
        top: 205,
        left: 'center',
        cellSize: [13, 13],
        range: ['2016-07-01', '2016-12-31'],
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(128, 128, 128, 0.1)',
            width: 1,
            type: 'solid'
          }
        },
        dayLabel: {
          nameMap: 'cn',
          textStyle: {
            color: '#81878d'
          }
        },
        monthLabel: {
          nameMap: 'cn',
          textStyle: {
            color: '#81878d'
          }
        },
        yearLabel: {
          formatter: '{start}  下半年',
          position: 'top',
          textStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
        itemStyle: {
          normal: {
            color: '#323c48',
            borderWidth: 1,
            borderColor: '#111'
          }
        }
      }],
      series: [{
          name: '步数',
          type: 'scatter',
          coordinateSystem: 'calendar',
          data: data,
          symbolSize: function(val) {
            return val[1] / 800;
          },
          itemStyle: {
            normal: {
              color: '#f4e925'
            }
          }
        },
        {
          name: '步数',
          type: 'scatter',
          coordinateSystem: 'calendar',
          calendarIndex: 1,
          data: data,
          symbolSize: function(val) {
            return val[1] / 800;
          },
          itemStyle: {
            normal: {
              color: '#0072fd'
            }
          }
        },
        {
          name: 'Top 12',
          type: 'effectScatter',
          coordinateSystem: 'calendar',
          calendarIndex: 1,
          data: data.sort(function(a, b) {
            return b[1] - a[1];
          }).slice(0, 12),
          symbolSize: function(val) {
            return val[1] / 1200;
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          itemStyle: {
            normal: {
              color: '#0072fd',
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          zlevel: 1
        },
        {
          name: 'Top 12',
          type: 'effectScatter',
          coordinateSystem: 'calendar',
          data: data.sort(function(a, b) {
            return b[1] - a[1];
          }).slice(0, 12),
          symbolSize: function(val) {
            return val[1] / 1200;
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          itemStyle: {
            normal: {
              color: '#f4e925',
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          zlevel: 1
        }
      ]
    })
    this._init()
  }
}
</script>

<style lang="scss">
#year {
    float: left;
    width: 51.5%;
    height: 305px;
    background-color: #050a1e;
    box-shadow: 0 5px 8px 0 #060112;
    border: solid 1px #131c7d;
}
</style>
