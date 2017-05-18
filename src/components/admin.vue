<template lang="html">
  <div class="admin">
    <head-nav :title='title' :id='id'></head-nav>
    <div class="frame">
      <div class="left">
        <charging-data :poData = 'poData'></charging-data>
        <ring></ring>
      </div>
      <div class="center">
        <multiple :poData = 'poData'></multiple>
        <twelve-month :poData = 'poData'></twelve-month>
      </div>
      <div class="right">
        <charging-list :poData = 'poData'></charging-list>
        <hour-line :poData = 'poData'></hour-line>
      </div>
    </div>
  </div>
</template>

<script>
import {
  baseUrl
} from './tool'
import headNav from './head'
import ChargingData from './left/ChargingData'
import Ring from './left/ring'
import Multiple from './center/Multiple'
import TwelveMonth from './center/TwelveMonth'
import ChargingList from './right/list'
import HourLine from './right/24Hours'
export default {
  data() {
    return {
      title: '',
      imgUrl: '',
      id: '',
      poData: []
    }
  },
  components: {
    headNav,
    ChargingData,
    Ring,
    Multiple,
    TwelveMonth,
    ChargingList,
    HourLine
  },
  methods: {
    getList() {
      var that = this;
      this.axios({
        url: `${baseUrl}/api/myinfo`,
        withCredentials: true
      }).then(function(rep) {
        if (rep.data.error != null) {
          that.$router.push('/analyse/');
          return false
        } else {
          that.title = rep.data.result.title;
          that.imgUrl = rep.data.result.imageUrl;
          that.id = rep.data.result.id
        }
      })
      this.axios({
        url: `${baseUrl}/api/op1`,
        withCredentials: true
      }).then(response => {
        this.poData = response.data.result
      })
    }
  },
  created: function() {
    this.getList()
    setInterval(() =>{
      this.getList()
    },60000)
  }
}
</script>

<style lang="scss" scoped>
.admin {
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 1350px;
    min-height: 750px;
    & .frame {
        width: 100%;
        height: 100%;
        padding: 84px 30px 0;
        & .left {
            float: left;
            width: 25%;
            height: 100%;
        }
        & .center {
            float: left;
            height: 100%;
            width: 38%;
            margin-left: 1%;
        }
        & .right {
            float: left;
            width: 35%;
            height: 100%;
            margin-left: 1%;
        }
    }
}
</style>
