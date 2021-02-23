import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import * as echarts from 'echarts';
import VueRouter from 'vue-router'
import routes from './routes.js'

Vue.use(VueRouter)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

const router = new VueRouter({ routes })

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
