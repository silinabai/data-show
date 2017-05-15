<template lang="html">
  <div class="admin">
    <head-nav :title='title' :id='id'></head-nav>
    <div class="frame">
      <div class="left">
        <charging-data></charging-data>
        <ring></ring>
      </div>
      <div class="center">
        <multiple></multiple>
        <twelve-month></twelve-month>
      </div>
      <div class="right">
        <charging-list></charging-list>
        <hour-line></hour-line>
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
        id: ''
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
    created: function() {
      var that = this;
      this.axios({
        url: `${baseUrl}/myinfo`,
        withCredentials: true
      }).then(function(rep) {
        if (rep.data.error != null) {
          that.$router.push('/');
          return false
        } else {
          that.title = rep.data.result.title;
          that.imgUrl = rep.data.result.imageUrl;
          that.id = rep.data.result.id
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .admin {
    position: relative;
    width: 100%;
    height: 100%;
    & .frame {
      width: 100%;
      height: 100%;
      padding: 84px 30px 0 30px;
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
