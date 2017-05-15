import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: require('../components/admin')
    }, {
      path: '/',
      name: 'login',
      component: require('../components/login')
    }
  ]
})
