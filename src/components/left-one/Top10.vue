<template lang="html">
  <div class="top">
    <div class="title">24小时城市排名 - Top10</div>
    <div class="buttons" ref='buttons'>
      <div class="button" @click='changeBar_one' :class="{'active-one':flagOne}">用电量</div>
      <div class="button" @click='changeBar_two' :class="{'active-two':flagTwo}">用电次数</div>
      <div class="button" @click='changeBar_three' :class="{'active-three':flagThree}">使用率</div>
    </div>
    <div class="bars">
      <bar-one v-if='changeBtn==1'></bar-one>
      <bar-two v-if='changeBtn==2'></bar-two>
      <bar-three v-if='changeBtn==3'></bar-three>
    </div>
  </div>
</template>

<script>
  import barOne from './bar-one'
  import barTwo from './bar-two'
  import barThree from './bar-three'
  export default {
    data() {
      return {
        changeBtn: 1,
        flagOne: true,
        flagTwo: false,
        flagThree: false
      }
    },
    components: {
      barOne,
      barTwo,
      barThree
    },
    methods: {
      changeBar_one:function(){
        this.flagOne = true;
        this.flagTwo = false;
        this.flagThree = false;
        this.changeBtn = 1;
      },
      changeBar_two:function(){
        this.flagOne = false;
        this.flagTwo = true;
        this.flagThree = false;
        this.changeBtn = 2;
      },
      changeBar_three:function(){
        this.flagOne = false;
        this.flagTwo = false;
        this.flagThree = true;
        this.changeBtn = 3;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .top {
    width: 100%;
    height: 460px;
    margin-top: 19px;
    background-color: #050a1e;
    box-shadow: 0 5px 8px 0 #060112;
    border: solid 1px #131c7d;
    text-align: center;
    padding-bottom: 25px;
    & .title {
      padding-top: 30px;
      font-size: 20px;
      color: #fff;
      line-height: 1;
    }
    & .buttons {
      margin: 30px auto 0;
      width: 90%;
      text-align: center;
      &:before,
      &:after {
        display: block;
        content: ''
      }
      &:after {
        clear: both;
      }
      & .button {
        display: inline-block;
        width: 27%;
        height: 35px;
        margin-left: 6%;
        line-height: 35px;
        border-radius: 2px;
        color: #81878d;
        font-size: 13px;
        border-style: solid;
        border-width: 1px;
        border-image-slice: 1;
        cursor: pointer;
        &:nth-child(1) {
          margin-left: 0;
          border: 1px solid #0072fd;
        }
        &:nth-child(2) {
          border: 1px solid #f35f71;
        }
        &:nth-child(3) {
          border: 1px solid #00d569;
        }
      }
      & .active-one{
        background-color: #0072fd;
        color: #fff;
      }
      & .active-two{
        background-color: #f35f71;
        color: #fff;
      }
      & .active-three{
        background-color: #00d569;
        color: #fff;
      }
    }
    & .bars{
      width: 90%;
      height: auto;
      margin: 0 auto;
    }
  }
</style>
