import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_production');
/*注册登录*/
const Signhome = _import('login/signhome');
const Login = _import('login/login');
const Register = _import('login/register');
/*首页*/
const Home = _import('home/home');
/*宠物秀*/
const Petshow = _import('pet/petshow');
/*医疗*/
const Medical = _import('medical/medical');
const DiseaseList = _import('medical/diseaselist')
/*我的*/
const Myself = _import('myself/myself');
const MypetList = _import('myself/mypetlist');
const Addpet = _import('myself/addpet');

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
  	},{
  		path: '/petshow',
  		name: 'Petshow',
  		component: Petshow
  	},{
  		path: '/medical',
  		name: 'Medical',
  		component: Medical
  	},{
  		path: '/medical/list/:type',
  		name: 'DiseaseList',
  		component: DiseaseList
  	},{
  		path: '/myself',
  		name: 'Myself',
  		component: Myself
  	},{
  		path: '/myself/mypetlist',
  		name: 'Mypet',
  		component: MypetList
  	},{
  		path: '/myself/addpet',
  		name: 'Addpet',
  		component: Addpet
  	}
  ]
})
