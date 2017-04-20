<template lang="html">
  <div class="list">
    <div class="mode" v-for='item in items'>
      <div class="center">
        <img src="../../assets/logo.png" v-if='flagImg'>
        <div class="order">
          <div class="title">{{item.siteName}}</div>
          <div class="order-num">{{item.orderNum}}</div>
          <div class="time">{{item.orderTime}}</div>
        </div>
        <div class="timeInfo">
          <div class="info">{{item.timeInfo}}</div>
          <div class="text">时间(分钟)</div>
        </div>
        <div class="money">
          <div class="info">{{item.moneyInfo}}</div>
          <div class="text">金额(元)</div>
        </div>
        <div class="ele">
          <div class="info">{{item.eleInfo}}</div>
          <div class="text">电量(度)</div>
        </div>
      </div>
      <div class="percent">69%</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flagImg: true,
        items: [{
          head:'',
          siteName: '瞰都国际充电站',
          orderNum: '786764340733354528',
          orderTime: '2016-10-14 13:23:43',
          timeInfo: '14',
          moneyInfo: '0.00',
          eleInfo: '5.05'
        },{
          head:'',
          siteName: '瞰都国际充电站',
          orderNum: '786764340733354528',
          orderTime: '2016-10-14 13:23:43',
          timeInfo: '14',
          moneyInfo: '0.00',
          eleInfo: '5.05'
        },{
          head:'',
          siteName: '瞰都国际充电站',
          orderNum: '786764340733354528',
          orderTime: '2016-10-14 13:23:43',
          timeInfo: '14',
          moneyInfo: '0.00',
          eleInfo: '5.05'
        },{
          head:'',
          siteName: '瞰都国际充电站',
          orderNum: '786764340733354528',
          orderTime: '2016-10-14 13:23:43',
          timeInfo: '14',
          moneyInfo: '0.00',
          eleInfo: '5.05'
        }]
      }
    },
    methods:{
      _init(){
        window.addEventListener('resize', function() {
          this.changeFlag()
        }.bind(this))
      },
      changeFlag(){
        let width = document.documentElement.clientWidth;
        if(width<=1800) this.flagImg = false
        else this.flagImg = true
      }
    },
    mounted(){
      this.changeFlag()
      this._init()
    }
  }
</script>

<style lang="scss" scoped>
  .list {
    width: 100%;
    margin-top: 25px;
    background-color: #050a1e;
    box-shadow: 0 5px 8px 0 #060112;
    border: solid 1px #131c7d;
    & .mode {
      position: relative;
      width: inherit;
      height: 90px;
      padding-top: 20px;
      border-bottom: 1px solid #131c7d;
      &:last-child {
        border-bottom: none;
      }
      & .center {
        width: inherit;
        height: 50px;
        padding:0 2%;
        color: #999;
        & img {
          float: left;
          display: block;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: solid 1px #979797;
        }
        & .order {
          float: left;
          width: 130px;
          height: 50px;
          margin-left: 1.1%;
          @mixin overflow{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          & .title{
            @include overflow;
            font-size: 12px;
            line-height: 1;
            color: #fff;
          }
          & .order-num{
            @include overflow;
            font-size: 12px;
            line-height: 1;
            margin-top: 10px;
            color: #fff;
          }
          & .time{
            @include overflow;
            font-size: 10px;
            line-height: 1;
            margin-top: 4px;
          }
        }
        & .timeInfo{
          float: left;
          text-align: right;
          width: 20%;
          height: inherit;
          & .info{
            font-size: 18px;
            color: #2081d1;
          }
          & .text{
            font-size: 12px;
            margin-top: 8px;
          }
        }
        & .money{
          float: left;
          width: 20%;
          height: inherit;
          text-align: right;
          & .info{
            font-size: 18px;
            color: #2081d1;
          }
          & .text{
            font-size: 12px;
            margin-top: 8px;
          }
        }
        & .ele{
          float: left;
          width: 20%;
          height: inherit;
          text-align: right;
          & .info{
            font-size: 18px;
            color: #2081d1;
          }
          & .text{
            font-size: 12px;
            margin-top: 8px;
          }
        }
      }
      & .percent{
        position: absolute;
        right: 0;
        top: 0;
        width: 36px;
        height: 16px;
        line-height: 16px;
        background: #0072fd;
        font-size: 12px;
        color: #fff;
        text-align: center;
        border-bottom-left-radius: 10px;
      }
    }
  }
</style>
