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
        title: '次数(次)',
        num: 3501,
        img: datalist_3
      }, {
        title: '电量(万度)',
        num: 23752,
        img: datalist_2
      }, {
        title: '减少碳排放(千克)',
        num: 237,
        img: datalist_4
      }],
    }
  },
  methods: {
    getTime(num) {
      var date = new Date();
      var month = date.getMonth() + num;
      var strDate = date.getDate();
      var strhour = date.getHours();
      var strmin = date.getMinutes();
      var strsen = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (strhour >= 0 && strhour <= 9) {
        strhour = "0" + strhour
      }
      if (strmin >= 0 && strmin <= 9) {
        strmin = "0" + strmin
      }
      if (strsen >= 0 && strsen <= 9) {
        strsen = "0" + strsen
      }
      var currentdate = date.getFullYear() + month + strDate + strhour + strmin + strsen;
      return currentdate;
    }
  },
  created() {
    let that = this
    let start = this.getTime(0)
    let end = this.getTime(1)
    this.axios({
      url: `http://xcloud.dev.xcharger.net/service/api/chargebill/stats?startTime=${start}&endTime=${end}`,
      withCredentials: true
    }).then(rep => {
      console.log(rep)
    })
  }
}
</script>

<style lang="scss">
.datalist {
    width: 100%;
    height: 496px;
    font-size: 10px;
    background-color: #050a1e;
    border: solid 1px #131c7d;
    box-shadow: 0 5px 8px 0 #060112;
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
