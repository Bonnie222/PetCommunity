import getters from './getter.js';

const state = {
	userInfo: {}
}

const mutations = {
	setUserInfo: (state, userInfo) => {
		state.userInfo = userInfo;
	}
}

export default {
	getters,
	state,
	mutations
}
