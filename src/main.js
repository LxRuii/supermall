import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index'

import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';
import toast from 'components/common/toast/index'
Vue.config.productionTip = false

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms的延时
fastclick.attach(document.body)

// 使用懒加载插件
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store,
  toast,
  fastclick
}).$mount('#app')
