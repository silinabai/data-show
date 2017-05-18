<template lang="html">
  <div class="login">
    <div class="content">
      <div class="box">
        <div class="title">
          <img src="../assets/logo.png">
          <span>充电数据监控系统</span>
        </div>
        <div class="login-box">
          <div class="mode">
            <div class="name">登录账号:</div>
            <input type="text" v-model='name' placeholder='请输入登录账号'>
          </div>
          <div class="mode">
            <div class="name">登录密码:</div>
            <input type="password" v-model='password' placeholder='请输入登录密码' @keyup.enter='login'>
          </div>
          <div class="button" @click='login'>登录</div>
          <transition name="fade">
            <div class="error" v-show='flagError'>您的账号或密码错误！请重新输入</div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {baseUrl} from './tool'
  export default {
    data() {
      return {
        flagError: false,
        name: '',
        password: ''
      }
    },
    methods: {
      login: function() {
        var that = this;
        if (this.name == '' || this.password == '') {
          this.error()
          return false
        }
        this.axios({
          method: 'post',
          url: `${baseUrl}/api/login`,
          withCredentials: true,
          data: {
            loginId: that.name,
            password: that.password
          }
        }).then(rep => {
          if(rep.data.error == null){
            that.$router.push('/analyse/admin')
          }else{
            that.error()
          }
        }).catch(err => {
          console.log(err)
        })
      },
      error() {
        let that = this
        this.flagError = true
        setTimeout(function() {
          that.flagError = false
        }, 3500)
      }
    }
  }
</script>

<style lang="scss" scoped>
   ::-webkit-input-placeholder {
    font-size: 15px;
    line-height: 40px;
    color: #7485a3;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  .login {
    width: 100%;
    height: 100%;
    background:#050a1e url('../assets/login_bg.jpg') no-repeat center;
    background-size: cover;
    & .content {
      position: relative;
      width: 600px;
      height: 100%;
      margin: 0 auto;
      text-align: center;
      & .box {
        position: absolute;
        width: inherit;
        height: 460px;
        bottom: 0;
        top: 0;
        margin: auto;
        & .title {
          font-size: 30px;
          color: #fff;
          height: 80px;
          line-height: 80px;
          & img {
            width: 44px;
            margin-right: 10px;
            vertical-align: middle;
          }
        }
        & .login-box {
          width: inherit;
          height: 350px;
          margin-top: 20px;
          box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.1);
          opacity: .8;
          background-color: #2c3040;
          border-radius: 10px;
          padding-top: 28px;
          & .mode {
            width: 420px;
            height: 40px;
            line-height: 40px;
            margin: 0 auto;
            margin-top: 35px;
            & .name {
              float: left;
              font-size: 18px;
              color: #fff;
              letter-spacing: 2px;
            }
            & input {
              display: block;
              float: right;
              width: 300px;
              padding: 18px;
              border-radius: 30px;
              outline: none;
              height: 40px;
              border: 1px solid #fff;
              background: none;
              color: #fff;
              font-size: 15px;
            }
          }
          & .button {
            width: 420px;
            height: 50px;
            margin: 60px auto 0;
            line-height: 50px;
            border-radius: 50px;
            background: #0072FD;
            color: #fff;
            font-size: 22px;
            letter-spacing: 6px;
            cursor: pointer;
            &:hover {
              background: #3977E7;
            }
          }
          & .error {
            font-size: 16px;
            margin-top: 20px;
            text-align: center;
            color: #F44752;
          }
        }
      }
    }
  }
</style>
