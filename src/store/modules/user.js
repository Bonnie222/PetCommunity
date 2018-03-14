import Cookies from 'js-cookie';
import axios from 'axios';

import utils from '@/public/utils';
import urls from '@/public/api';

const user = {
	state: {
		id: Cookies.get('userId'),
		//token: Cookies.get('userToken'),
		userInfo: null,
	},

	mutation: {
		SET_UID: (state, id) => {
			state.id = id;
		},
//		SET_TOKEN: (state, token) => {
//			state.token = token;
//		},
		SET_USERINFO: (state, userInfo) => {
			state.userInfo = userInfo;
		},

		LOGIN_SUCCESS: () => {
			console.log('login success!')
		}
	},

	actions: {
		//手机号码登录
		LoginByPhone({ commit }, userInfo) {
			//const phone = userInfo.userPhone.trim();

			return new Promise((resolve, reject) => {
				var url = urls.login;
				var options = userInfo;
				console.log('登录入参', userInfo);
				axios.post(url, options).then((res) => {
					//登录接口，可只返回token 和 uid 。然后可根据uid 查询用户信息
          console.log('-------获取到登录回信息：',res)
					if(res.status == 200){
							let data = res.data;
							vm.userInfo = data.data;
							if(data.code == 1){
								//LOGIN success
								console.log('LOGIN success!');
								window.sessionStorage.userInfo = JSON.stringify(vm.userInfo);
								vm.$store.dispatch('setUserInfo', vm.userInfo);
								vm.$router.push('/home');
							}else{
								console.log(data.message);
								if(data.code == -2){
									vm.errMsg = '密码不正确';
		    						vm.errWindow = true;
								}else if(data.code == -1){
									vm.errMsg = '该用户不存在';
		    						vm.errWindow = true;
								}
							}
						}else{
							console.log('请求出现错误')
						}
						console.log(res);

// 					if(res.status == 200){
// 						var data = res.data[0];
// 						Cookies.set('userId', data.id, {expires: 1/3}); //设置用户id
//
// 						commit('SET_UID', data.id);
//
// 						resolve();
// 					}else{
// 						alert(res.statusText);
// //						Message({
// //							showClose: true,
// //							message: res.statusText,
// //							type:'error'
// //						});
// 					}
				}).catch(err => {
					console.log(err);
					reject(err);
				})
				return false;
			});
		},

		//获取用户信息
		GetUserInFo({commit, state}) {
			return new Promise((resolve, reject) => {
				var url = urls.getPersonal;
				var options = {
					params: userInfo
				}
				console.log('登录入参', userInfo);
				axios.post(url, options).then(function(res){
					//登录接口，可只返回token 和 uid 。然后可根据uid 查询用户信息
          console.log('-------获取到登录回信息：',JSON.stringify(res) )
					if(res.status == 200){
						var data = res.data[0];
						Cookies.set('userId', data.id, {expires: 1/3}); //设置用户id

						commit('SET_UID', data.id);

						resolve();
					}else{
						alert(res.statusText);
//						Message({
//							showClose: true,
//							message: res.statusText,
//							type:'error'
//						});
					}
				}).catch(err => {
					console.log(err);
					reject(err);
				})
				return false;
			});
		}
	}
}

export default user;
