<template lang="html">
  <div class="list">
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
</template>

<script>
export default {
  data() {
    return {
      flagImg: true,
      items: []
    }
  },
  methods: {
    _init() {
      window.addEventListener('resize', function() {
        this.changeFlag()
      }.bind(this))
    },
    changeFlag() {
      let width = document.documentElement.clientWidth;
      if (width <= 1800) this.flagImg = false
      else this.flagImg = true
    }
  },
  created() {
    var that = this
    this.axios({
      url: 'http://xcloud.dev.xcharger.net/service/api/chargebill?from=0&length=4',
      withCredentials: true
    }).then(function(response) {
      if (response.data.result.error == null) {
        response.data.result.forEach(function(e, index) {
          let item = {
            imageUrl: e.wechatUser.imageUrl,
            id: e.id,
            title: e.site.title,
            chargeStartTime: e.chargeStartTime,
            chargeInterval: e.chargeInterval,
            feeTotal: e.feeTotal,
            powerCharged: e.powerCharged,
            batteryCharged: e.batteryCharged ? e.batteryCharged : false
          }
          that.items.push(item)
        })
      }
    })
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
    height: 360px;
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
            padding: 0 2%;
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
                @mixin overflow {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                & .title {
                    @include overflow;
                    font-size: 12px;
                    line-height: 1;
                    color: #fff;
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
                    font-size: 10px;
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
                    color: #2081d1;
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
                    color: #2081d1;
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
                    color: #2081d1;
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
</style>
