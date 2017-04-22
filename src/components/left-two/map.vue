<template lang="html">
  <div class="map" id='map'></div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china'
export default {
  data() {
    return {
      myChart: {},
      data: [],
      geoCoordMap: {}
    }
  },
  methods: {
    convertData: function(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
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
  mounted() {
    this._init()
    let that = this
    this.myChart = echarts.init(document.getElementById('map'));
    this.axios.get('static/map-value.json').then(rep => {
      that.data = rep.data.mapvalue
      that.geoCoordMap = rep.data.mapaddress
      that.myChart.setOption({
        tooltip: {
          show: false
        },
        legend: {
          orient: 'vertical',
          y: 'bottom',
          x: 'left',
          data: ['充电数据'],
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
          data: that.convertData(that.data),
          symbolSize: function(val) {
            return val[2] / 5;
          },
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: '#0688e5'
            }
          }
        }, {
          name: '前五名',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: that.convertData(that.data.sort(function(a, b) {
            return b.value - a.value;
          }).slice(0, 6)),
          symbolSize: function(val) {
            return val[2] / 5;
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
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
              color: '#0072fd',
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          zlevel: 1
        }]
      })
    })
  }
}
</script>

<style lang="scss">
.map {
    width: 100%;
    height: 698px;
}
</style>
