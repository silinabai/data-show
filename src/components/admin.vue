<template lang="html">
  <div class="admin">
    <head-nav :title='title' :id='id'></head-nav>
    <div class="frame">
      <div class="left-one">
        <real-time></real-time>
        <top10></top10>
      </div>
      <div class="left-two">
        <map-chart></map-chart>
        <div class="center-bottom">
          <hour24></hour24>
          <year></year>
        </div>
      </div>
      <div class="right">
        <circle-data></circle-data>
        <list></list>
        <week></week>
      </div>
    </div>
  </div>
</template>

<script>
import headNav from './head'
import realTime from './left-one/real-time'
import Top10 from './left-one/Top10'
import mapChart from './left-two/map'
import hour24 from './left-two/hour24'
import year from './left-two/year'
import circleData from './right/circle'
import list from './right/list'
import week from './right/week'
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
    realTime,
    Top10,
    mapChart,
    hour24,
    year,
    circleData,
    list,
    week
  },
  created: function() {
    var that = this;
    this.axios({
      url: 'http://xcloud.dev.xcharger.net/service/api/myinfo',
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
    width: 100%;
    min-height: 100%;
    background: url('../assets/bg.jpg') no-repeat center;
    background-size: cover;
    min-width: 1320px;
    & .frame {
        width: 100%;
        height: auto;
        margin: 0 auto;
        &:after,
        &:before {
            display: block;
            content: '';
        }
        &:after {
            clear: both;
        }
        & .left-one {
            float: left;
            width: 19.2%;
            padding-top: 28px;
        }
        & .left-two {
            float: left;
            width: 906px;
            height: auto;
            width: 53.2%;
            margin-left: 0.3%;
            & .center-bottom {
                width: 100%;
                height: auto;
                &:after,
                &:before {
                    display: block;
                    content: '';
                }
                &:after {
                    clear: both;
                }
            }
        }
        & .right {
            float: left;
            width: 475px;
            width: 27%;
            height: auto;
            margin-left: 0.3%;
            &:after,
            &:before {
                display: block;
                content: '';
            }
            &:after {
                clear: both;
            }
        }
    }
}
</style>
