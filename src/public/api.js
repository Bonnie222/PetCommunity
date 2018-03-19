const host = "/api";

export default {
	login: host + '/login',
	register: host + '/register',
	//文件上传
	uploadSingle: host + '/uploadSingle',
	uploadArray: host + '/uploadArray',
	//首页
	getHomeLook: host + '/home/look',
	//注册
	queryByPhone: host + '/queryPhone',
	queryByName: host + '/queryName',
	queryByEmail: host + '/queryEmail',

	//我的
	getPersonal: host + '/user/personal',
	getMyLookList: host + '/user/looklistAll',
	getMyLookListByStatus: host + '/user/looklistByStatus',
	getMyLookDetail: host + '/user/lookdetail',
	getMyPetList: host + '/user/petList',
	updateMyLookStatus: host + '/user/updatelookStatus',
	updataMyInfo: host + '/user/update',
	deleteMyLook: host + '/user/deletelook',


	//宠物
	addPet: host + '/pet/add',
	getPetDetail: host + '/pet/detail',
	delPet: host + '/pet/delete',
	updatePet: host + '/pet/update',

	//寻找
	addLook: host + '/look/add',
	getLookList: host + '/look/list',
	getLookDetail: host + '/look/detail',

	//活动
	getActivityList: host + '/activity/list',
	getActivityDetail: host + '/activity/detail',
	addActivity: host + '/activity/add',
	isAppy: host + '/activity/isAppy',

	//宠物秀
	addPetShow: host + '/petshow/add',
	getPetshowList: host + '/petshow/list',
	getPetshowDetail: host + '/petshow/detail',

	//认证号
	getUserList: host + '/user/list',
}
