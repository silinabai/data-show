<template lang="html">
  <div class="list">
    <div class="title-box"><span>24小时内全部充电订单</span></div>
    <div class="mode-box">
      <div class="mode" v-for='item in items'>
        <div class="center">
          <img :src="item.imageUrl" v-if='flagImg'>
          <div class="order">
            <div class="title">{{item.title}}</div>
            <div class="order-num">{{item.id}}</div>
            <div class="time">{{item.chargeStartTime}}</div>
          </div>
          <div class="timeInfo">
            <div class="info">{{item.chargeInterval}}</div>
            <div class="text">时间(分钟)</div>
          </div>
          <div class="money">
            <div class="info">{{item.feeTotal}}</div>
            <div class="text">金额(元)</div>
          </div>
          <div class="ele">
            <div class="info">{{item.powerCharged}}</div>
            <div class="text">电量(度)</div>
          </div>
        </div>
        <div class="percent" v-if='item.batteryCharged'>{{item.batteryCharged}}%</div>
      </div>
    </div>
  </div>
</template>

<script>
  import defaultImg from '../../assets/head.jpg'
  import {
    baseUrl
  } from '../tool'
  export default {
    data() {
      return {
        flagImg: true,
        items: []
      }
    },
    methods: {
      // 地图的自动响应
      _init() {
        window.addEventListener('resize', function() {
          this.changeFlag()
        }.bind(this))
      },
      // 隐藏或显示用户的头像
      changeFlag() {
        let width = document.documentElement.clientWidth;
        if (width <= 1800) this.flagImg = false
        else this.flagImg = true
      },
      // 格式化时间
      format(date) {
        return date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8) + ' ' + date.slice(8, 10) + ':' + date.slice(10, 12)
      },
      // axios请求
      getList() {
        let that = this
        this.axios({
          url: `${baseUrl}/chargebill?from=0&length=16`,
          withCredentials: true
        }).then(function(response) {
          if (response.data.result.error == null) {
            let arr = []
            response.data.result.forEach(function(e, index) {
              let item = {
                imageUrl: e.wechatUser == null ? defaultImg : e.wechatUser.imageUrl,
                id: e.id,
                title: e.site.title,
                chargeStartTime: that.format(e.createTime),
                chargeInterval: e.chargeInterval == null ? 0 : e.chargeInterval,
                feeTotal: e.feeTotal == null ? '0.00' : (e.feeTotal / 100).toFixed(2),
                powerCharged: e.powerCharged == null ? '0.00' : e.powerCharged,
                batteryCharged: e.batteryCharged ? e.batteryCharged : false
              }
              arr.push(item)
            })
            that.items = arr
          }
        })
      }
    },
    created() {
      this.getList()
      setInterval(() => {
        this.getList()
      }, 5000)
    },
    mounted() {
      this.changeFlag()
      this._init()
    }
  }
</script>

<style lang="scss" scoped>
  .list {
    width: 100%;
    height: 62%;
    background-color: rgba(5, 10, 30, .64);
    box-shadow: 0 5px 8px 0 #060112;
    border: solid 1px #131c7d;
    & .title-box {
      position: relative;
      width: 100%;
      height: 8%;
      text-align: center;
      font-size: 14px;
      letter-spacing: 0.3px;
      color: #c6c6c6;
      opacity: 0.64;
      background-color: rgba(10, 59, 134, 0.51);
      & span{
        position: absolute;
        height: 20px;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
      }
    }
    & .mode-box {
      height: 92%;
      overflow: auto;
      &::-webkit-scrollbar{
        width: 8px;
      }
      &::-webkit-scrollbar-thumb{
        border-radius: 12px;
        background-color: #0a3b86;
      }
      &::-webkit-scrollbar-track{
        border-radius: 12px;
        background-color: #0d1534;
      }
      & .mode {
        position: relative;
        width: 98%;
        height: 90px;
        margin: 10px auto 0;
        padding-top: 20px;
        border-radius: 8px;
        background-color: #0e1634;
        border: 1px solid #131c7d;
        overflow: hidden;
        cursor: pointer;
        &:hover{
          box-shadow: 0 5px 8px 0 #060112;
          border: 1px solid #0072fd;
        }
        & .center {
          width: inherit;
          height: 50px;
          padding: 0 2%;
          color: #999;
          & img {
            float: left;
            display: block;
            width: 54px;
            height: 54px;
            border-radius: 50%;
            border: solid 1px #979797;
          }
          & .order {
            float: left;
            width: 130px;
            height: 50px;
            margin-left: 1.1%;
            @mixin overflow {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            & .title {
              @include overflow;
              font-size: 14px;
              line-height: 1;
              color: #0072fd;
            }
            & .order-num {
              @include overflow;
              font-size: 12px;
              line-height: 1;
              margin-top: 10px;
              color: #fff;
            }
            & .time {
              @include overflow;
              font-size: 12px;
              line-height: 1;
              margin-top: 4px;
            }
          }
          & .timeInfo {
            float: left;
            text-align: right;
            width: 20%;
            height: inherit;
            & .info {
              font-size: 18px;
              color: #fff;
            }
            & .text {
              font-size: 12px;
              margin-top: 8px;
            }
          }
          & .money {
            float: left;
            width: 20%;
            height: inherit;
            text-align: right;
            & .info {
              font-size: 18px;
              color: #fff;
            }
            & .text {
              font-size: 12px;
              margin-top: 8px;
            }
          }
          & .ele {
            float: left;
            width: 20%;
            height: inherit;
            text-align: right;
            & .info {
              font-size: 18px;
              color: #fff;
            }
            & .text {
              font-size: 12px;
              margin-top: 8px;
            }
          }
        }
        & .percent {
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
  }
</style>
