import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_production');
/*注册登录*/
const Signhome = _import('login/signhome');
const Login = _import('login/login');
const Register = _import('login/register');
/*首页*/
const Home = _import('home/home');

Vue.use(Router)

export default new Router({
  routes: [{
  		path: '/',
  		redirect: '/signhome'
  	},{
  		path: '/signhome',
  		name: 'Signhome',
  		component: Signhome,
  	},{ 
  		path: '/signhome/login', 
  		name: 'Login', 
  		component: Login
  	},{ 
  		path: '/signhome/register', 
  		name: 'Register', 
  		component: Register 
  	},{
  		path: '/home',
  		name: 'Home',
  		component: Home
  	}
  ]
})
