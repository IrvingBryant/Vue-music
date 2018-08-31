// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   this.$refs.loading.style='display:block'
//   next()
// })
//
// router.afterEach((to, from, next) => {
//   this.$refs.loading.style='display:none'
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
