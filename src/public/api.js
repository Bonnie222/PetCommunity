const host = "/api";

export default {
	login: host + '/login',
	register: host + '/register',
	
	//注册
	queryByPhone: host + '/queryPhone',
	queryByName: host + '/queryName',
	queryByEmail: host + '/queryEmail',
	
	//我的
	getPersonal: host + '/user/personal',
	
	//宠物
	getMyPetList: host + '/user/petList',
	addPet: host + '/pet/add',
	getPetDetail: host + '/pet/detail',
	delPet: host + '/pet/delete',
	updatePet: host + '/pet/update',
	
	//寻找
	addLook: host + '/look/add',
	getLookList: host + '/look/list',
	
}
