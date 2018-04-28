<template>
	<div id="Login">
		<!-- <Header title="登录" @clickRouter="back"></Header>
		<div class="loginform">
			<ul>
				<li class="">
					<span class="labellogo">
						<img src="../../assets/images/phone.png" />
					</span>
					<input type="text" placeholder="请输入手机号"
						v-model="loginForm.userPhone"
						@focus="onPhoneFocus" @blur="onPhoneBlur"/>
				</li>
				<li class="">
					<span class="labellogo">
						<img src="../../assets/images/psw.png" />
					</span>
					<input type="password" placeholder="请输入密码"
					v-model="loginForm.userPsd" @focus="onPsdFocus"/>
				</li>
			</ul>
		</div>
		<div class="validator" v-show="errWindow">
			<img src="../../assets/images/fail.png" />
			<span class="err">{{errMsg}}</span>
		</div>
		<div class="btn-wrap">
			<button class="btn-cancel">忘记了？</button>
			<button class="btn-save" @click="login">登录</button>
		</div> -->
		<div class='login-logo-wrap'>
        <img src="../../assets/images/logo.gif" class='login-logo' />
    </div>
    <div class="login-register-wrap">
        <div class='login-register-title'>登 录</div>
        <div class='login-input-wrap'>
            <div class='login-input'>
                <span>手机号</span>
                <input placeholder='请输入手机号' type="number"
								v-model="loginForm.userPhone"
								@focus="onPhoneFocus" @blur="onPhoneBlur"/>
            </div>
            <div class='login-input'>
                <span>密码</span>
                <div class='flex-between'>
                    <input placeholder='请输入密码' type="password"
											v-model="loginForm.userPsd" @focus="onPsdFocus"/>
                </div>
            </div>
        </div>
        <div class="login-err-tip" v-show="errWindow">
            <img src="../../assets/images/fail.png" />
            <span class="err">{{errMsg}}</span>
        </div>
				<div class="small-wrap">
					<router-link :to="{ path: 'forget', query:{phone: loginForm.userPhone}}">
						忘记密码</router-link>
					<router-link to="/register">快速注册</router-link>
				</div>
        <div class="btn-wrap">
            <button class="btn-save login-submit-btn" @click="login">
                提交
            </button>
        </div>
    </div>
	</div>
</template>

<script>
import Header from '@/components/header';
export default {
    name: 'Login',
    components:{
    	Header
    },
    data(){
    	return{
    		errWindow:false,
    		errMsg:'',
    		loginForm:{
    			userPhone: '',
    			userPsd: '',
    		},
    		userInfo:{}
    	}
    },
    created(){

    },
    methods:{
    	back() {
				this.$router.go(-1);
			},
    	onPhoneFocus() {
    		var vm = this;
    		vm.errMsg = '';
    		vm.errWindow = false;
    	},
    	onPhoneBlur() {
    		var vm = this;
    		var partten = /^$|^1(3|4|5|7|8)\d{9}$/;
    		if(!vm.loginForm.userPhone){
    			vm.errMsg = '手机号不能为空';
    			vm.errWindow = true;
    		}else if(!partten.test(vm.loginForm.userPhone)){
    			vm.errMsg = '请输入正确的手机号格式';
    			vm.errWindow = true;
    		}
    	},
    	onPsdFocus() {
    		var vm = this;
    		vm.onPhoneBlur();
    	},
    	login() {
    		var vm = this;
    		var partten = /^$|^1(3|4|5|7|8)\d{9}$/;
    		if(!vm.loginForm.userPhone){
    			vm.errMsg = '手机号不能为空';
    			vm.errWindow = true;
    			return;
    		}else if(!partten.test(vm.loginForm.userPhone)){
    			vm.errMsg = '请输入正确的手机号格式';
    			vm.errWindow = true;
    			return;
    		}else if(!vm.loginForm.userPsd){
    			vm.errMsg = '密码不能为空';
    			vm.errWindow = true;
    			return;
    		}
    		vm.loginForm.userPhone = vm.loginForm.userPhone.trim();
    		vm.loginForm.userPsd = vm.loginForm.userPsd.trim();
    		const data = vm.loginForm;
				vm.$store.dispatch('LoginByPhone', data).then((res) => {
					console.log(res);
					if(res.code == 1){
						console.log('LOGIN success!');
						vm.$router.push('/home');
					}else{
							vm.errMsg = res.message;
    					vm.errWindow = true;
					}
				});
    	}
    }
}
</script>

<style lang='less' scoped>
#Login{
	overflow-y: hidden;
	font-size: 34px;
	padding: 100px 0px 0px;
	height:inherit;
	background: #eb695c;
	// .loginform{
	// 	background: #ffffff;
	// 	margin-top: 40px;
	// 	& ul{
	// 		text-align: center;
	// 		& li{
	// 			margin: 0 50px;
	// 			height: 125px;
	// 			border-bottom: 1px solid #e4e4e4;/*no*/
	// 			&:last-child{
	// 				border: none;
	// 			}
	// 			.labellogo{
	// 				background: yellow;
	// 				margin: 0px 10px 0 0;
	// 				display: inline-block;
	// 				width: 70px;
	// 				height: 70px;
	// 				vertical-align: middle;
	// 				img{
	// 					width: 100%;
	// 					height: 100%;
	// 				}
	// 			}
	// 			input{
	// 				display: inline-block;
	// 				width: 500px;
	// 				height: 125px;
	// 				text-align: left;
	// 			}
	// 	    }
	// 	}
	// }
	// .validator{
	// 	margin: 50px 0px 0 85px;
	// 	color: red;
	// 	display: inline-block;
	// 	font-size: 36px;
	// }
	// .btn-wrap{
	// 	margin-top: 80px;
	// 	text-align: center;
	// 	.btn-cancel,.btn-save{
	// 		font-size: 34px;
	// 	}
	// 	.btn-cancel{
	// 		margin-right: 25px;
	// 	}
	// }
	.login-logo-wrap {
	    text-align: center;
	    // margin-bottom: 70px;
			.login-logo {
			    width: 600px;
			    height: 250px;
					img{
						width: inherit;
						height: inherit;
					}
			}
	}
	.login-register-wrap {
			margin: 10px auto 0;
	    text-align: center;
	    width:620px;
	    height: 720px;
	    padding: 0px 55px;
	    background: #fff;
	    border-radius: 20px;
			.login-register-title{
			    font-size: 48px;
			    line-height: 67px;
			    padding:33px 0 20px;
			    border-bottom: 1px solid #FFE8EE;
			}
			.login-input-wrap{
			    padding-top: 20px;
					.login-input{
					    color: #666;
					    text-align: left;
					    margin: 20px 0px 30px;
							input {
								width: 100%;
						    height: 84px;
						    padding: 0px 20px;
						    margin-top: 20px;
						    background: #F5F5F5;
						    border: 1px solid #e4e4e4;
						    border-radius: 8px;
							}
					}
			}

			.login-err-tip{
				color: #eb695c;
			  text-align: left;
			  line-height:34px;
				img{
				    width: 24px;
				    height: 24px;
				    margin-right: 10px;
				}
			}
			.small-wrap{
				margin-top: 30px;
				display: flex;
				justify-content: space-between;
				font-size: 30px;
				color: #999999;
			}
			.btn-wrap {
				margin-top: 20px;
				.login-submit-btn{
				  font-size: 36px;
				  line-height: 84px;
					width: 100%;
				  height: 84px;
				  border-radius: 8px;
				}
			}
	}
}
</style>
