<template lang="html">
  <div class="Multiple">
    <ul>
      <li v-for='(button,index) in buttons' :key='index' :class='{active:button.flag}' @click='changeButton(index)'>{{button.name}}</li>
    </ul>
    <div class="change-box">
      <china-map v-show='flagNum===0' :poData = 'poData'></china-map>
      <site-top v-if='flagNum===1' :TopData='TopData'></site-top>
      <reduce-emissions v-if='flagNum===2' :poData = 'poData'></reduce-emissions>
    </div>
  </div>
</template>

<script>
import {
  baseUrl
} from '../tool'
import ChinaMap from './map'
import SiteTop from './SiteTop5'
import ReduceEmissions from './ReduceEmissions'
  export default {
    data() {
      return {
        flagNum: 0,
        buttons:[{
          name: '全国充电地图',
          flag: true
        },{
          name: '充电站TOP5',
          flag: false
        },{
          name: '节能减排',
          flag: false
        }],
        TopData:[]
      }
    },
    props:['poData'],
    components:{
      ChinaMap,
      SiteTop,
      ReduceEmissions
    },
    methods:{
      changeButton(index){
        this.buttons.map((value) => {
          value.flag = false
        })
        this.buttons[index].flag = true;
        this.flagNum = index
      }
    },
    created(){
      this.axios({
        // 测试环境
        // url: `${baseUrl}/api/op2?site=851283513880743936,851702019604484096`,
        // 正式环境
        url: `${baseUrl}/api/op2?site=854528862003142656,801078335651454976,756037547175714816,756055406572343296,861410817491607552`,
        withCredentials: true
      }).then((response) => {
        this.TopData = response.data.result;
      })
    }
  }
</script>

<style lang="scss" scoped>
  .Multiple {
    width: 100%;
    height: 62%;
    background-color: rgba(5, 10, 30, .64);
    box-shadow: 0 5px 8px 0 #060112;
    border: solid 1px #131c7d;
    & ul {
      list-style: none;
      text-align: center;
      width: 100%;
      height: 10%;
      & li {
        display: inline-block;
        width: 106px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
        border-radius: 2px;
        margin-left: 10%;
        margin-top: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12);
        border: solid 1px #0072fd;
        &:nth-child(1){
          margin-left: 0;
        }
      }
      & .active{
        background-color: #0072fd;
      }
    }
    /*Tab*/
    & .change-box{
      width: 100%;
      height: 90%;
    }
  }
</style>
