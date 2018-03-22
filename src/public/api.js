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
	getMyPetList: host + '/user/petList',
	updataMyInfo: host + '/user/update',
	getUserPsd: host + '/user/checkpsd',
	resetPsd: host + '/user/updatepsd',
	// 我的寻宠
	getMyLookList: host + '/user/looklistAll',
	getMyLookListByStatus: host + '/user/looklistByStatus',
	getMyLookDetail: host + '/user/lookdetail',
	updateMyLookStatus: host + '/user/updatelookStatus',
	deleteMyLook: host + '/user/deletelook',
  // 我的活动
	getMyActJoinList: host + '/user/activityJoinlist',
	getMyActPublList: host + '/user/activityPubllist',
	getMyPublRegisnList: host + '/user/regisnslist',

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
	isApply: host + '/activity/isApply',
	apply: host + '/activity/apply',
	updateTotal: host + '/activity/upadateTotal',

	//宠物秀
	addPetShow: host + '/petshow/add',
	getPetshowList: host + '/petshow/list',
	getPetshowDetail: host + '/petshow/detail',

	//认证号
	getUserList: host + '/user/list',
}
