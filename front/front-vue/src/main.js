import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/css.css'
import SimpleMessage from '@/components/SimpleMessage/SimpleMessage.js';

Vue.config.productionTip = false

Vue.prototype.$message = SimpleMessage

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
