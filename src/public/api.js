const host = "/api";

export default {
	login: host + '/login',
	
	//我的
	getPersonal: host + '/user/personal',
	
	//宠物
	getMyPetList: host + '/user/petList',
	addPet: host + '/pet/add',
	getPetDetail: host + '/pet/detail',
	delPet: host + '/pet/delete',
	updatePet: host + '/pet/update',
	
}
