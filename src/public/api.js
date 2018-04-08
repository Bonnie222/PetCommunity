const host = "/api";

export default {
	login: host + '/login',
	register: host + '/register',
	//文件上传
	uploadSingle: host + '/uploadSingle',
	uploadArray: host + '/uploadArray',
	//首页
	getHomeLook: host + '/home/look',
	getHomePetshow: host + '/home/petshow',
	//注册
	queryByPhone: host + '/queryPhone',
	queryByName: host + '/queryName',
	queryByEmail: host + '/queryEmail',

	//我的
	getPersonal: host + '/user/personal',
	getMyPetList: host + '/user/petList',
	updataMyInfo: host + '/user/update',
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
	getUserPetshowList: host + '/user/petshowlist',
	// 我的宠友
	getUserAttentions: host + '/user/attentions',
	getUserFans: host + '/user/fans',
	toConcern: host + '/user/toConcern',
	toCancelConcern: host + '/user/toCancelConcern',
	judgeRelation: host + '/user/judgeRelation',
	getMyFollowers: host + '/user/followers',
	getMyFollowings: host + '/user/followings',
	// 我的问诊
	getUserDiseaseList: host + '/user/diseaseList',
	deleteDisease: host + '/disease/delete',
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
	deletePetshow: host + '/petshow/delete',
	followersPetshowList: host + '/petshow/followers',

	//认证号
	getUserList: host + '/user/list',
	userSearch: host + 'user/search',

	// 医疗
	addDisease: host + '/disease/add',
	getDiseaseList: host + '/disease/listAll',
	getDiseaseListByType: host + '/disease/listByType',
	getDiseaseDetail: host + '/disease/detail',

	// 点赞
	getUserLikeList: host + '/user/likeList',
	addLike: host + '/user/likeAdd',
	updateLike: host + '/user/likeUpdate',
}
