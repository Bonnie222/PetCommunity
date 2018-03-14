import Cookies from 'js-cookie';
import axios from 'axios';

import utils from '@/public/utils';
import urls from '@/public/api';

const user = {
	state: {
		id: Cookies.get('userId'),
		token: Cookies.get('userToken'),
		userInfo: null,
	},

	mutations: {
		SET_UID: (state, id) => {
			state.id = id;
		},
		SET_TOKEN: (state, token) => {
			state.token = token;
		},
		SET_USERINFO: (state, userInfo) => {
			state.userInfo = userInfo;
		},
	},

	actions: {
		//手机号码登录
		LoginByPhone({ commit }, userForm) {
			return new Promise((resolve, reject) => {
				var url = urls.login;
				var options = userForm;
				console.log('登录入参', userForm);
				axios.post(url, options).then((res) => {
					//登录接口，可只返回token 和 uid 。然后可根据uid 查询用户信息
          console.log('-------获取到登录回信息：',res)
					if(res.status == 200){
							let data = res.data;
							if(data.code == 1){
								// 按一天8小时工作制设置过期时间
								console.log(commit);
								Cookies.set('userId', data.data.id,{expires:1/3});
								Cookies.set('userToken', data.data.token,{expires:1/3});
								commit('SET_TOKEN', data.data.token);
								commit('SET_UID', data.data.id);
							}
							resolve(data);
						}else{
							reject('请求出现错误')
						}
				}, (res) => {
					reject(res);
				})
				return false;
			});
		},

		//获取用户信息
		GetUserInfo({commit, state}) {
			return new Promise((resolve, reject) => {
				const url = urls.getPersonal;
				const options = {
					id: state.id,
				}
				axios.post(url, options).then((res) => {
					const result = res.data;
					if(result.code == 1){
						const data = result.data[0];
						commit('SET_USERINFO', data);
						resolve(data);
					}else{
						reject(result);
					}
				}, (err) => {
					reject(err);
				})
			});
		},

		//登出
		Logout({commit, state}) {
			return new Promise((resolve, reject) => {
				commit('SET_TOKEN', '');
				Cookies.remove('userToken');
				Cookies.remove('userId');
				resolve();
			});
		},
	},
}

export default user;
