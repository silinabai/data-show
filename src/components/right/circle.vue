<template lang="html">
  <div class="circle">
    <div class="title">智充运营商 (北京地区) 实时数据</div>
    <div class="mode">
      <div class="text">直流充电桩实时使用效率</div>
      <circle-demo canvas='canvas-one' :percent = 49></circle-demo>
    </div>
    <div class="mode">
      <div class="text">交流充电桩实时使用效率</div>
      <circle-demo canvas='canvas-two' bottomLine='#e39616' upLine='#f44752' :percent = 88 :speed=4></circle-demo>
    </div>
  </div>
</template>

<script>
  import circleDemo from './circle-demo'
  export default {
    data() {
      return {

      }
    },
    components: {
      circleDemo
    }
  }
</script>

<style lang="scss">
  .circle {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    color: #fff;
    font-size: 20px;
    letter-spacing: 0.4px;
    &:after,
    &:before {
      display: block;
      content: '';
    }
    &:after {
      clear: both;
    }
    & .mode {
      float: left;
      width: 50%;
      height: 220px;
      margin-top: 20px;
      font-size: 14px;
      letter-spacing: 0.3px;
      color: #fff;
      background-color: #050a1e;
      border: 1px solid #131c7d;
      &:nth-child(1) {
        border-left: none;
      }
      & .text {
        margin-top: 20px;
      }
    }
  }
</style>
