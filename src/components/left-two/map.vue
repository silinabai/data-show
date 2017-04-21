<template lang="html">
  <div class="map" id='map'></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/map/js/china'
export default {
  data() {
    return {
      myChart: {},
      data: [{
          name: '海门',
          value: 189
        },
        {
          name: '鄂尔多斯',
          value: 12
        }, {
          name: "招远",
          value: 12
        },
        {
          name: "舟山",
          value: 19
        }
      ],
      geoCoordMap: {
        '海门': [121.15, 31.89],
        '鄂尔多斯': [109.781327, 39.608266],
        "招远": [120.38, 37.35],
        "舟山": [122.207216, 29.985295],
      }
    }
  },
  methods: {
    convertData: function() {
      var res = [];
      for (var i = 0; i < this.data.length; i++) {
        var geoCoord = this.geoCoordMap[this.data[i].name];
        if (geoCoord) {
          res.push({
            name: this.data[i].name,
            value: geoCoord.concat(this.data[i].value)
          });
        }
      }
      return res;
    },
    _init() {
      window.addEventListener('resize', function() {
        this.myChart.resize()
      }.bind(this))
    }
  },
  created(){
    let that = this
    this.axios.get('static/map-value.json').then(rep =>{
      // that.data = rep.mapvalue
      // that.geoCoordMap = rep.mapaddress
    })
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('map'));
    this.myChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        show: false,
        itemWidth: 10,
        itemHeight: 10,
        bottom: 55,
        calculable: true,
        color: ['#0688e5', '#f35f71', '#00d569', '#e39616'],
        left: 100
      },
      legend: {
        orient: 'vertical',
        y: 'bottom',
        x: 'left',
        data: ['pm2.5'],
        textStyle: {
          color: '#fff'
        }
      },
      geo: {
        map: 'china',
        label: {
          emphasis: {
            show: false
          }
        },
        left: 0,
        right: 0,

        itemStyle: {
          normal: {
            areaColor: '#323c48',
            borderColor: '#111'
          },
          emphasis: {
            areaColor: '#2a333d'
          }
        }
      },
      series: [{
          name: '',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: this.convertData(this.data),
          symbolSize: function(val) {
            return val[2] / 10;
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#0072fd'
            }
          }
        },
        {
          name: 'Top 5',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: this.convertData(this.data.sort(function(a, b) {
            return b.value - a.value;
          }).slice(0, 6)),
          symbolSize: function(val) {
            return val[2] / 10;
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            }
          },
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
.map {
    width: 100%;
    height: 698px;
}
</style>
