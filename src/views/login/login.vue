<template>
	<div id="Login">
		<Header title="登录" @clickRouter="back"></Header>
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
	font-size: 34px;
	background: #f2f2f2;
	.loginform{
		background: #ffffff;
		margin-top: 40px;
		& ul{
			text-align: center;
			& li{
				margin: 0 50px;
				height: 125px;
				border-bottom: 1px solid #e4e4e4;/*no*/
				&:last-child{
					border: none;
				}
				.labellogo{
					background: yellow;
					margin: 0px 10px 0 0;
					display: inline-block;
					width: 70px;
					height: 70px;
					vertical-align: middle;
					img{
						width: 100%;
						height: 100%;
					}
				}
				input{
					display: inline-block;
					width: 500px;
					height: 125px;
					text-align: left;
				}
		    }
		}
	}
	.validator{
		margin: 50px 0px 0 85px;
		color: red;
		display: inline-block;
		font-size: 36px;
	}
	.btn-wrap{
		margin-top: 80px;
		text-align: center;
		.btn-cancel,.btn-save{
			font-size: 34px;
		}
		.btn-cancel{
			margin-right: 25px;
		}
	}
}
</style>
