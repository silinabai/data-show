<template lang="html">
  <div class="reduce" id='reduce'>
    <img src="../../assets/showMap.png">
    <div class="mode-left">
      <div class="center">
        <div class="title">减少碳排放(千克)</div>
        <div class="text">{{reduce}}</div>
      </div>
    </div>
    <div class="mode-right">
      <div class="center">
        <div class="title">模拟植树(棵)</div>
        <div class="text">{{tree}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  baseUrl
} from '../tool'
import q2 from '../../assets/Q2.png'
import circleGreen from '../../assets/circleGreen.png'

export default {
  props: ['poData'],
  data() {
    return {
      bubbleImg: [q2, circleGreen],
      reduce: (this.poData.billStatus.result.powerCharged * 0.14 * 20).toFixed(0),
      tree: (this.poData.billStatus.result.powerCharged * 0.14 * 20 / 5.02).toFixed(0)
    }
  },
  methods: {
    // 检测浏览器是否支持css3属性
    supportCss3(style) {
      var prefix = ['webkit', 'Moz', 'ms', 'o'],
        i,
        humpString = [],
        htmlStyle = document.documentElement.style,
        _toHumb = function(string) {
          return string.replace(/-(\w)/g, function($0, $1) {
            return $1.toUpperCase();
          });
        };

      for (i in prefix)
        humpString.push(_toHumb(prefix[i] + '-' + style));

      humpString.push(_toHumb(style));

      for (i in humpString)
        if (humpString[i] in htmlStyle) return true;

      return false;
    },
    // 气泡动画
    bubbles: function(size = 10) {
      let divs = []
      let box = document.getElementById('reduce')
      let width = box.offsetWidth
      let height = box.offsetHeight
      for (let i = 0; i < 60; i++) {
        let img = document.createElement('img')
        img.setAttribute('src', this.bubbleImg[Math.floor(Math.random() * 2)])
        img.style.cssText =
          `position:absolute;
        width:${Math.round(size*Math.random()+size)}px;
        left:${Math.round(Math.random()*width)}px;
        bottom: -20px;
        display:block;
        overflow: hidden;
        opacity:${Math.random()+0.2};
        transition:bottom 4s ease-in ${Math.random()*4}s`
        divs.push(img)
        box.appendChild(img)
      }
      setTimeout(() => {
        divs.forEach((value, index) => {
          divs[index].style.bottom = `${height/2}px`
          divs[index].addEventListener('transitionend', function() {
            this.style.transition = null
            this.style.bottom = '-20px'
            this.style.left = `${Math.round(Math.random()*width)}px`
            setTimeout(() => {
              this.style.transition = `bottom 4s ease-in ${Math.random()*4}s`
              this.style.bottom = `${height/2}px`
            }, 0)
          })
        })
      }, 0)
    }
  },
  mounted() {
    // 气泡动画
    if(this.supportCss3('transition')){
      this.bubbles()
    }
  }
}
</script>

<style lang="scss" scoped>
.reduce {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    & img {
        display: block;
        width: 70%;
        height: auto;
        margin: 0 auto;
    }
    & .center {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 50px;
        margin: auto;
    }
    & .title {
        font-size: 14px;
        text-align: center;
        line-height: 1;
        color: #fff;
    }
    & .text {
        font-size: 28px;
        text-align: center;
        line-height: 1;
        margin-top: 10px;
        color: #fff;
    }
    & .mode-left {
        position: absolute;
        bottom: 3%;
        left: 5%;
        width: 25%;
        height: 18%;
        background-color: rgba(11, 179, 60, 0.3);
        border: solid 2px #0bb33c;
        &:after {
            content: '';
            display: block;
            position: absolute;
            width: 0;
            height: 0;
            font-size: 0;
            overflow: hidden;
            border-width: 10px;
            border-style: solid dashed dashed;
            border-color: transparent transparent transparent #0bb33c;
            right: -20px;
            top: 40%;
        }
    }
    & .mode-right {
        position: absolute;
        bottom: 3%;
        right: 5%;
        width: 25%;
        height: 18%;
        background-color: rgba(11, 179, 60, 0.3);
        border: solid 2px #0bb33c;
        &:before {
            content: '';
            display: block;
            position: absolute;
            width: 0;
            height: 0;
            overflow: hidden;
            border-width: 10px;
            border-style: solid dashed dashed;
            border-color: transparent #0bb33c transparent transparent;
            left: -20px;
            top: 40%;
        }
    }
}
</style>
