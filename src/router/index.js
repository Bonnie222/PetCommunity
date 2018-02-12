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
const PetshowList = _import('petshow/list');
const PetshowEdit = _import('petshow/edit');
/*医疗*/
const Medical = _import('medical/medical');
const DiseaseList = _import('medical/diseaselist')
/*我的*/
const Myself = _import('myself/myself');
const MypetList = _import('myself/petinfo/list');
const Addpet = _import('myself/petinfo/edit');
const Editpet = _import('myself/petinfo/detail');
const MylookList = _import('myself/petlook/list');
const MylookDetail = _import('myself/petlook/detail');
const MySetting = _import('myself/setting/setting');
const MyInfo = _import('myself/setting/personalInfo');
const MyPsd = _import('myself/setting/changePsd');
/*寻宠*/
const LookList = _import('look/list');
const LookEdit = _import('look/edit');
const LookDetail = _import('look/detail');
/*活动*/
const ActivityList = _import('activity/list');
const ActivityDetail = _import('activity/detail');
const ActivityEdit = _import('activity/edit');

Vue.use(Router)

export default new Router({
  routes: [
	  { path: '/', redirect: '/signhome' },
	  /*登录注册*/
	  { path: '/signhome',         									name: 'Signhome',   	  	component: Signhome 			},
	  { path: '/signhome/login',   									name: 'Login',      			component: Login    			},
	  {	path: '/signhome/register', 								name: 'Register', 				component: Register	 			},
	  /*首页*/
	  {	path: '/home',															name: 'Home',							component: Home						},
	  /*宠物秀*/
	  {	path: '/petshow/list',											name: 'PetshowList',			component: PetshowList		},
	  {	path: '/petshow/edit',											name: 'PetshowEdit',			component: PetshowEdit		},
	  /*医疗*/
	  {	path: '/medical',														name: 'Medical',					component: Medical				},
	  {	path: '/medical/list/:type',								name: 'DiseaseList',			component: DiseaseList		},
	  /*我的*/
	  {	path: '/myself',														name: 'Myself',						component: Myself					},
	  {	path: '/myself/pet/list',										name: 'Mypet',						component: MypetList			},
	  {	path: '/myself/pet/add',										name: 'Addpet',						component: Addpet					},
	  {	path: '/myself/pet/detail/:id',							name: 'Editpet',					component: Editpet				},
	  {	path: '/myself/look/list/:type',						name: 'MylookList',				component: MylookList			},
	  {	path: '/myself/look/detail/:id',						name: 'MylookDetail',			component: MylookDetail		},
	  {	path: '/myself/setting',        						name: 'MySetting',			  component: MySetting  		},
	  {	path: '/myself/info',        								name: 'MyInfo',					  component: MyInfo		  		},
	  {	path: '/myself/psd',        								name: 'MyPsd',					  component: MyPsd		  		},
	  /*寻主/宠*/
	  {	path: '/look/list',										 			name: 'LookList',					component: LookList				},
	  {	path: '/look/edit',													name: 'LookEdit',					component: LookEdit				},
	  {	path: '/look/detail/:id',										name: 'LookDetail',				component: LookDetail			},
	  /*活动*/
	 	{	path: '/activity/list/:type',								name: 'ActivityList',			component: ActivityList 	},
	 	{	path: '/activity/edit',											name: 'ActivityEdit',			component: ActivityEdit 	},
	 	{	path: '/activity/detail/:type/:id',					name: 'ActivityDetail',		component: ActivityDetail	},
  ]
})
