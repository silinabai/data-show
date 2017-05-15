<template lang="html">
  <div class="reduce" id='reduce'>
    <canvas id="map-panel"></canvas>
    <img id="img-map" src='../../assets/mapChina.png' style='display:none' />
    <img id="img-pos" src='../../assets/treeOne.png' style='display:none' />
    <img id="img-neg" src='../../assets/treeTwo.png' style='display:none' />
    <div class="mode-left">
      <div class="title">减少碳排放(千克)</div>
      <div class="text">237</div>
      <div class="bot"></div>
    </div>
    <div class="mode-right">
      <div class="title">模拟植树(棵)</div>
      <div class="text">1325</div>
    </div>
  </div>
</template>

<script>
  import q2 from '../../assets/Q2.png'
  import circleGreen from '../../assets/circleGreen.png'

  function DataMap(panel, pxWidth, pxHeight, nCols, nRows, total, colorEffectMax, imgPos, imgNeg, imgBg) {
    var ctx = panel.getContext("2d");
    ctx.canvas.width = pxWidth;
    ctx.canvas.height = pxHeight
    // 画笔
    this.ctx = ctx;
    // 宽度
    this.width = pxWidth;
    // 高度
    this.height = pxHeight;
    // 块的宽度
    this.blockWidth = pxWidth / nCols;
    // 块的高度
    this.blockHeight = pxHeight / nRows;
    // 多少列
    this.cols = nCols;
    // 多少行
    this.rows = nRows;
    // 亮树图片
    this.imgPos = imgPos;
    // 暗树图片
    this.imgNeg = imgNeg;
    // 判断色
    this.colorEffectMax = colorEffectMax;

    ctx.drawImage(imgBg, 0, 0);

    var blocks = 0;
    this._doOnMap(function(ctx, x, y) {
      blocks++;
    });

    this.blocksPerData = blocks / total;
  }
  DataMap.prototype._doOnMap = function(cb) {
    var eColor = this.colorEffectMax;
    var width = this.width;
    var height = this.height
    var bwidth = this.blockWidth;
    var bheight = this.blockHeight;
    var ctx = this.ctx;

    for (var y = 0; y < height; y += bheight) {
      for (var x = 0; x < width; x += bwidth) {
        var color;
        var inside = false;
        if (!inside) {
          color = ctx.getImageData(x, y, 1, 1).data;
          if (color[0] <= eColor[0] && color[1] <= eColor[1] && color[2] <= eColor[2] && color[3] >= eColor[3]) inside = true;
        }
        if (!inside) {
          color = ctx.getImageData(x + bwidth - 1, y + bheight - 1, 1, 1).data;
          if (color[0] <= eColor[0] && color[1] <= eColor[1] && color[2] <= eColor[2] && color[3] >= eColor[3]) inside = true;
        }
        if (!inside) {
          color = ctx.getImageData(x, y + bheight - 1, 1, 1).data;
          if (color[0] <= eColor[0] && color[1] <= eColor[1] && color[2] <= eColor[2] && color[3] >= eColor[3]) inside = true;
        }
        if (!inside) {
          color = ctx.getImageData(x + bwidth - 1, y, 1, 1).data;
          if (color[0] <= eColor[0] && color[1] <= eColor[1] && color[2] <= eColor[2] && color[3] >= eColor[3]) inside = true;
        }
        if (inside && cb) cb(ctx, x, y);
      }
    }
  };
  DataMap.prototype.drawData = function(data) {
    var blocks = Math.round(this.blocksPerData * data);
    var THIS = this;

    this._doOnMap(function(ctx, x, y) {
      if (blocks >= 0) {
        ctx.drawImage(THIS.imgPos, x, y);
        blocks--;
      } else
        ctx.drawImage(THIS.imgNeg, x, y);
    });
  };
  export default {
    data() {
      return {
        bubbleImg: [q2, circleGreen]
      }
    },
    methods: {
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
      this.bubbles()
      var cv = document.getElementById('map-panel');
  		var imgMap = document.getElementById('img-map');
  		var imgPos = document.getElementById('img-pos');
  		var imgNeg = document.getElementById('img-neg');

  		var map = new DataMap(cv,660,540, 90, 50, 1000, [5, 5, 5, 255], imgPos, imgNeg, imgMap);
      map.drawData(800);
    }
  }
</script>

<style lang="scss" scoped>
  .reduce {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    & canvas {
      display: block;
      margin: 10px auto 0;
    }
    & #img-pos{
      display: block;
      background: yellow;
      width: 10px;
    }
    & .title {
      font-size: 14px;
      text-align: center;
      line-height: 1;
      padding-top: 16px;
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
