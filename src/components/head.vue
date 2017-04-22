<template lang="html">
  <div class="head">
    <div class="name">智充充电数据监控</div>
    <div class="info">
      <img :src="imgUrl">
      <div class="exit" @click='exit'>退出</div>
      <div class="name">{{title}}</div>
    </div>
  </div>
</template>

<script>
import {baseUrl} from './tool'
import headPhoto from '../assets/head.jpg'
export default {
  data(){
    return{

    }
  },
  props: {
    title:{
      type: String,
      default: '智充科技'
    },
    imgUrl:{
      type: String,
      default: headPhoto
    },
    id:{
      type: String
    }
  },
  methods:{
    exit:function(){
      let that = this
      this.axios({
        method: 'post',
        url: `${baseUrl}/logout`,
        withCredentials: true,
        data:{
          loginId: that.id
        }
      }).then(res =>{
        that.$router.push('/')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.head{
  width: 100%;
  height: 64px;
  padding:0 30px;
  font-size: 20px;
	letter-spacing: 0.4px;
  color: #fff;
  background-color: rgba(4,0,23,0.2);
  & .name{
    float: left;
    height: inherit;
    line-height: 64px;
  }
  & img{
    display: inline-block;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    margin-top: 10px;
  }
  & .info{
    text-align: right;
    font-size: 14px;
    & .name{
      float: right;
      height: 20px;
      margin-top: 22px;
      line-height: 20px;
      padding:0 10px;
      border-right: 1px solid #fff;
    }
    & .exit{
      float: right;
      height: 20px;
      margin-top: 22px;
      line-height: 20px;
      padding-left: 10px;
      cursor: pointer;
      &:hover{
        color: #017bce;
      }
    }
  }
}
</style>
