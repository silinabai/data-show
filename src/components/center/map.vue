<template lang="html">
  <div class="map" id='map'></div>
</template>

<script>
import {
  baseUrl
} from '../tool'
import echarts from 'echarts/lib/echarts'
import 'echarts/map/js/china'
export default {
  data() {
    return {
      myChart: {},
      // 地图阴暗表示
      items: [{
          name: '北京',
          value: 15
        },
        {
          name: '天津',
          value: 2
        },
        {
          name: '上海',
          value: 5
        },
        {
          name: '重庆',
          value: 1
        },
        {
          name: '河北',
          value: 8
        },
        {
          name: '河南',
          value: 3
        },
        {
          name: '云南',
          value: 2
        },
        {
          name: '辽宁',
          value: 5
        },
        {
          name: '黑龙江',
          value: 2
        },
        {
          name: '湖南',
          value: 1
        },
        {
          name: '安徽',
          value: 5
        },
        {
          name: '山东',
          value: 6
        },
        {
          name: '新疆',
          value: 1
        },
        {
          name: '江苏',
          value: 12
        },
        {
          name: '浙江',
          value: 9
        },
        {
          name: '江西',
          value: 1
        },
        {
          name: '湖北',
          value: 9
        },
        {
          name: '广西',
          value: 1
        },
        {
          name: '甘肃',
          value: 2
        },
        {
          name: '山西',
          value: 2
        },
        {
          name: '内蒙古',
          value: 0
        },
        {
          name: '陕西',
          value: 4
        },
        {
          name: '吉林',
          value: 3
        },
        {
          name: '福建',
          value: 7
        },
        {
          name: '贵州',
          value: 0
        },
        {
          name: '广东',
          value: 8
        },
        {
          name: '青海',
          value: 0
        },
        {
          name: '西藏',
          value: 0
        },
        {
          name: '四川',
          value: 1
        },
        {
          name: '宁夏',
          value: 2
        },
        {
          name: '海南',
          value: 1
        },
        {
          name: '台湾',
          value: 0
        },
        {
          name: '香港',
          value: 0
        },
        {
          name: '澳门',
          value: 0
        }
      ],
      // 查询的map中需要显示的点
      MapList: []
    }
  },
  props: ['poData'],
  watch: {
    poData: function(newVal, oldVal) {
      let lis = newVal.bills
      this.MapList = []
      lis.forEach(e => {
        this.MapList.push({
          name: e.site.title,
          siteId: e.site.id,
          value: [e.site.lng, e.site.lat]
        })
      })
      this.myChart.setOption({
        series: [{
          type: 'map',
          data: this.items
        }, {
          type: 'scatter',
          data: this.MapList,
        }]
      })
    }
  },
  methods: {
    _init() {
      window.addEventListener('resize', function() {
        this.myChart.resize()
      }.bind(this))
    },
    handle(){
      this.myChart.on('click',e =>{
        window.location.href=`${baseUrl}/orderQuery.html?siteId=${e.data.siteId}`
      })
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('map'));
    this.myChart.setOption({
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
        show: false,
        min: 0,
        max: 15,
        itemWidth: '14px',
        itemHeight: '90px',
        left: '20px',
        bottom: '20px',
        text: ['高', '低'],
        seriesIndex: [0],
        textStyle: {
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
        data: this.items
      }, {
        name: '订单',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: [],
        symbolSize: 8,
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
    this._init()
    this.handle()
  }
}
</script>

<style lang="scss" scoped>
.map {
    width: 100%;
    height: 100%;
}
</style>
