<template lang="html">
  <div class="map" id='map'></div>
</template>

<script>
function randomData() {
    return Math.round(Math.random()*1000);
}
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
        visualMap: {
          min: 0,
          max: 2500,
          itemWidth: '14px',
          itemHeight: '90px',
          left: '20px',
          bottom: '20px',
          text: ['高','低'],
          seriesIndex: [0],
          textStyle:{
            color: '#fff'
          },
          inRange: {
            color: ['#0072FD', '#0E1B44']
          },
          calculable: false
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          top: 0,
          bottom: 0,

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
          type: 'map',
          geoIndex: 0,
          data: [{
              name: '北京',
              value: randomData()
            },
            {
              name: '天津',
              value: randomData()
            },
            {
              name: '上海',
              value: randomData()
            },
            {
              name: '重庆',
              value: randomData()
            },
            {
              name: '河北',
              value: randomData()
            },
            {
              name: '河南',
              value: randomData()
            },
            {
              name: '云南',
              value: randomData()
            },
            {
              name: '辽宁',
              value: randomData()
            },
            {
              name: '黑龙江',
              value: randomData()
            },
            {
              name: '湖南',
              value: randomData()
            },
            {
              name: '安徽',
              value: randomData()
            },
            {
              name: '山东',
              value: randomData()
            },
            {
              name: '新疆',
              value: randomData()
            },
            {
              name: '江苏',
              value: randomData()
            },
            {
              name: '浙江',
              value: randomData()
            },
            {
              name: '江西',
              value: randomData()
            },
            {
              name: '湖北',
              value: randomData()
            },
            {
              name: '广西',
              value: randomData()
            },
            {
              name: '甘肃',
              value: randomData()
            },
            {
              name: '山西',
              value: randomData()
            },
            {
              name: '内蒙古',
              value: randomData()
            },
            {
              name: '陕西',
              value: randomData()
            },
            {
              name: '吉林',
              value: randomData()
            },
            {
              name: '福建',
              value: randomData()
            },
            {
              name: '贵州',
              value: randomData()
            },
            {
              name: '广东',
              value: randomData()
            },
            {
              name: '青海',
              value: randomData()
            },
            {
              name: '西藏',
              value: randomData()
            },
            {
              name: '四川',
              value: randomData()
            },
            {
              name: '宁夏',
              value: randomData()
            },
            {
              name: '海南',
              value: randomData()
            },
            {
              name: '台湾',
              value: randomData()
            },
            {
              name: '香港',
              value: randomData()
            },
            {
              name: '澳门',
              value: randomData()
            }
          ]
        }, {
          name: '前五名',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: that.convertData(that.data.sort(function(a, b) {
            return b.value - a.value;
          }).slice(0, 6)),
          symbolSize: 10,
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
              color: '#0BB33C',
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          zlevel: 1
        }]
      })
    })
    this.myChart.on('click',function(e){
      console.log(e)
    })
  }
}
</script>

<style lang="scss" scoped>
.map {
    width: 100%;
    height: 100%;
}
</style>
