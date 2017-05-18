<template lang="html">
  <div class="datalist">
    <div class="mode" v-for='item in list'>
      <div class="center">
        <div class="name">{{item.title}}</div>
        <div class="num">{{item.num}}</div>
        <img :src="item.img">
      </div>
    </div>
  </div>
</template>

<script>
import {
  baseUrl
} from '../tool'
import datalist_1 from '../../assets/datalist-1.png'
import datalist_2 from '../../assets/datalist-2.png'
import datalist_3 from '../../assets/datalist-3.png'
import datalist_4 from '../../assets/datalist-4.png'
export default {
  data() {
    return {
      list: [{
        title: '充电桩(个)',
        num: 11325,
        img: datalist_1
      }, {
        title: '电量(万度)',
        num: 0,
        img: datalist_2
      }, {
        title: '服务车次(次)',
        num: 0,
        img: datalist_3
      }, {
        title: '节约碳排放(千克)',
        num: 0,
        img: datalist_4
      }],
    }
  },
  props: ['poData'],
  watch: {
    poData: function(newVal, oldVal) {
      this.list[1].num = (newVal.billStatus.result.powerCharged * 20 / 10000).toFixed(2)
      this.list[2].num = (newVal.billStatus.result.timesCount * 20).toFixed(0)
      this.list[3].num = (newVal.billStatus.result.powerCharged * 0.14 * 20).toFixed(0)
    }
  },
  methods: {
    // 获取当天的时间
    getTime(num) {
      let dd = new Date();
      dd.setDate(dd.getDate() + num); //获取AddDayCount天后的日期
      let Y = dd.getFullYear();
      let M = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1) //获取月份，不足10补0
      let D = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate() //获取几号，不足10补0
      let h = dd.getHours() < 10 ? "0" + dd.getHours() : dd.getHours() //获取几时
      let m = dd.getMinutes() < 10 ? "0" + dd.getMinutes() : dd.getMinutes() // 获取几分
      let s = dd.getSeconds() < 10 ? "0" + dd.getSeconds() : dd.getSeconds() //获取几秒
      return num ? Y + M + D + '000000' : Y + M + D + h + m + s;
    },
    // axios获取列表
    getList() {
      let that = this
      let start = this.getTime(-1)
      let end = this.getTime(0)
      this.axios({
        url: `${baseUrl}/api/chargebill/stats?startTime=20160101000000&endTime=${end}`,
        withCredentials: true
      }).then(rep => {
        that.list[1].num = rep.data.result.timesCount == null ? 0 : (rep.data.result.timesCount * 20).toFixed(0)
        that.list[2].num = rep.data.result.powerCharged == null ? 0 : (rep.data.result.powerCharged * 20).toFixed(0)
        that.list[3].num = rep.data.result.powerCharged == null ? 0 : (rep.data.result.powerCharged * 20 * 0.14).toFixed(0)
      })
    }
  },
  created() {
    // this.getList()
    // setInterval(() => {
    //   this.getList()
    // }, 10000000)
  },
  mounted() {
    // this.list[1].num = (this.poData.billStatus.result.powerCharged).toFixed(0)
  }
}
</script>

<style lang="scss">
.datalist {
    width: 100%;
    height: 62%;
    font-size: 10px;
    background-color: rgba(5, 10, 30, .64);
    box-shadow: 0 5px 8px 0 #060112;
    border: solid 1px #131c7d;
    & .mode {
        position: relative;
        float: left;
        width: 50%;
        height: 50%;
        text-align: center;
        line-height: 1;
        &:nth-child(1) {
            border-right: solid 1px #131c7d;
            border-bottom: solid 1px #131c7d;
        }
        &:nth-child(2) {
            border-bottom: solid 1px #131c7d;
        }
        &:nth-child(3) {
            border-right: solid 1px #131c7d;
        }
        & .center {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 100%;
            height: 12em;
        }
        & .name {
            font-size: 1.4em;
            color: #696f77;
            letter-spacing: 0.3px;
        }
        & .num {
            margin-top: 20px;
            font-size: 3em;
            color: #fff;
        }
        & img {
            display: block;
            width: 4.2em;
            height: 4.2em;
            margin: 30px auto 0;
        }
    }
}
</style>
