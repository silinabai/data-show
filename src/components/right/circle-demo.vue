<template lang="html">
  <canvas class='canvas' :id="canvas" :width="width" :height="height"></canvas>
</template>

<script>
export default {
  props: {
    canvas: {
      required: true,
      type: String
    },
    width: {
      default: 122,
      type: Number
    },
    height: {
      default: 122,
      type: Number
    },
    percent: {
      type: Number
    },
    bottomLine: {
      type: String,
      default: '#00d569'
    },
    upLine: {
      type: String,
      default: '#0072fd'
    },
    speed: {
      type: Number,
      default: 2
    }
  },
  methods: {
    circle: function() {
      var that = this;
      var canvas = document.getElementById(that.canvas);
      var ctx = canvas.getContext('2d');
      if (that.percent < 0 || that.percent > 100) {
        throw new Error('百分比必须在0到100之间');
        return
      }
      var angle = 0;
      var timer;
      (function draw() {
        timer = requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 4;
        ctx.strokeStyle = that.bottomLine;
        ctx.beginPath();
        /*
  		  arc(x,y,r,sAngle,eAngle,counterclockwise)
  		  sAngle: 起始角
  		  eAngle: 结束角
  		  counterclockwise: false顺时针， true逆时针
  		 */
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - ctx.lineWidth, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.stroke();
        ctx.save();
        ctx.lineWidth = 8;
        ctx.strokeStyle = that.upLine;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - ctx.lineWidth / 2, 0, angle * Math.PI / 180, false);
        angle += that.speed;
        var percentAge = ((angle / 360) * 100).toFixed(1);
        if (angle > (that.percent / 100 * 360)) {
          percentAge = that.percent
          window.cancelAnimationFrame(timer);
        }
        ctx.stroke();
        ctx.closePath();
        ctx.save();
        ctx.beginPath();
        var fontSize = 26;
        ctx.rotate(90 * Math.PI / 180);
        ctx.font = fontSize + 'px' + ' ' + 'Arial';
        ctx.fillStyle = '#fff';
        var text = percentAge + '%';
        ctx.textAlign = "center";
        ctx.fillText(text, canvas.width / 2, -(canvas.height / 2 - fontSize / 2));
        ctx.closePath()
        ctx.restore();
      })()
    }
  },
  watch:{
    percent:function(){
      this.circle()
    }
  },
  mounted() {
    this.circle()
  }
}
</script>

<style lang="scss">
.canvas {
    display: block;
    margin: 24px auto 0;
    transform: rotate(-90deg);
}
</style>
