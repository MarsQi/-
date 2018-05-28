// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/iconfont/iconfont.css'
import '@/assets/css/icon/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import '@/assets/css/index.css'
import '@/assets/css/element.css'
Vue.use(ElementUI)
import AMap from 'AMap'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})