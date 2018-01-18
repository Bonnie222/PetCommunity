// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

/*引入mintUI*/
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
/*引入YdUI*/
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.px.css';

/*引入适配方案*/
import 'lib-flexible/flexible.js';

/*引入axios*/
import axios from 'axios';
Vue.prototype.$axios = axios;

Vue.use(MintUI);
Vue.use(YDUI);
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.productionTip = false;

/*遍历Vuex的权限列表，加入渠道的路径未在true列表中，则直接重定向为开始页*/
const List = ['/signhome', '/signhome/login', '/signhome/register'];
router.beforeEach((to, from, next) => {
	if(List.indexOf(to.path) === -1){
		if(sessionStorage.getItem("userId")){
			next();
		}else{
			next('/signhome');
		}
	}else{
		next();
	}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
