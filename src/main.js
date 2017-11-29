// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/*引入mintUI*/
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
/*引入YdUI*/
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.px.css';

/*引入适配方案*/
import 'lib-flexible/flexible.js';

Vue.use(MintUI)
Vue.use(YDUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
