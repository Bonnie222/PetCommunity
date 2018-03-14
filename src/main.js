// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import axios from 'axios';
import $ from 'jquery';
/*引入校验*/
import './public/validate.js';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
/*引入mintUI*/
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
/*引入YdUI*/
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
//import 'vue-ydui/dist/ydui.px.css';


/*引入适配方案*/
import 'lib-flexible/flexible.js';

import utils from './public/utils';
import urls from './public/api';
import config from './public/config';
Vue.prototype.utils = utils;
Vue.prototype.urls = urls;
Vue.prototype.config = config;

Vue.prototype.$axios = axios;

Vue.use(MintUI);
Vue.use(YDUI);
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.productionTip = false;

// 处理刷新的时候vuex被清空但是用户已经登录的情况
// if (window.sessionStorage.userInfo) {
//     store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.userInfo));
// }

/*遍历Vuex的权限列表，加入渠道的路径未在true列表中，则直接重定向为开始页*/
const List = ['/signhome', '/login', '/register'];
// router.beforeEach((to, from, next) => {
// 	if(List.indexOf(to.path) === -1){
// 		if(window.sessionStorage.userInfo){
// 			next();
// 		}else{
// 			next('/signhome');
// 		}
// 	}else{
// 		next();
// 	}
// })
router.beforeEach((to, from, next) => {
  //获取先获取用户信息，从用户信息中拿权限，判断是否手敲
  console.log(from,'路由---->',to )
  if (store.getters.userInfo) {
      //避免F5刷新时，vex数据全无，所以需要重新获取一次数据
      if(!store.getters.userInfo){ //判断是否有用户信息 把token换成userInfo
          console.log('未获取到用户信息',store.getters.userInfo)
         store.dispatch('GetUserInfo').then(res => { // 拉取user_info
            console.log('已获取到用户信息',store.getters.userInfo)
            next();
         }).catch(err => {
             console.log(err);
         });
      }else{
          next();
      }
  }else{
    	if(List.indexOf(to.path) !== -1){  //在内
        next();
    	}else{
    		next('/signhome');
    	}
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
