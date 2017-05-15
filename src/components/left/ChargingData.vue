<template lang="html">
  <div class="datalist">
    <div class="mode" v-for='item in list'>
      <div class="name">{{item.title}}</div>
      <div class="num">{{item.num}}</div>
      <img :src="item.img">
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
        num: null,
        img: datalist_2
      }, {
        title: '服务车次(次)',
        num: null,
        img: datalist_3
      }, {
        title: '节约碳排放(千克)',
        num: null,
        img: datalist_4
      }],
    }
  },
  methods: {
    // 获取当天的时间
    getTime(num) {
      var date = new Date();
      var month = date.getMonth() + 1;
      var strDate = date.getDate() - num;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + month + strDate + "000000";
      return currentdate;
    },
    // axios获取列表
    getList() {
      let that = this
      let start = this.getTime(1)
      let end = this.getTime(0)
      this.axios({
        url: `${baseUrl}/chargebill/stats?startTime=${start}&endTime=${end}`,
        withCredentials: true
      }).then(rep => {
        that.list[1].num = (rep.data.result.timesCount * 55).toFixed(0)
        that.list[2].num = rep.data.result.powerCharged == null ? 0 : (rep.data.result.powerCharged * 55).toFixed(0)
        that.list[3].num = rep.data.result.powerCharged == null ? 0 : (rep.data.result.powerCharged * 55 * 0.14).toFixed(0)
      })
    }
  },
  created() {
    this.getList()
    setInterval(() => {
      this.getList()
    }, 5000)
  }
}
</script>

<style lang="scss">
.datalist {
    width: 100%;
    height: 62%;
    font-size: 10px;
    background-color: rgba(5,10,30,.64);
    box-shadow: 0 5px 8px 0 #060112;
    border: solid 1px #131c7d;
    & .mode {
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
        & .name {
            padding-top: 41px;
            font-size: 1.4em;
            color: #696f77;
            letter-spacing: 0.3px;
        }
        & .num {
            margin-top: 20px;
            font-size: 3.2em;
            color: #fff;
        }
        & img {
            display: block;
            width: 42px;
            height: 42px;
            margin: 30px auto 0;
        }
    }
}
</style>
