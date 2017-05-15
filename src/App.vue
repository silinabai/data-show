<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,body{
  width: 100%;
  height: 100%;
  background: #050a1e url('./assets/admin-bg.jpg') no-repeat center;
  background-size: cover;
}
</style>
