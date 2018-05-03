<template>
	<div id="Forget">
		<Header :title="topTitle" @clickRouter="back"></Header>
		<div v-show="!psdProtectWindow">
			<div class="formlist">
				<ul>
					<li class="">
						<label>邮&nbsp;&nbsp;&nbsp;&nbsp;箱</label>
						<input type="email" v-model="form.email"/>
					</li>
					<li class="">
						<label>验证码</label>
						<input type="text" class="code" v-model="form.code" />
							<button class="codeText" @click="getCode" :disabled="sendcode">{{codeText}}</button>
					</li>
				</ul>
			</div>
			<div class="btn-wrap">
				<button class="btn-save"
					@click="goReset">验证</button>
			</div>
		</div>
		<div v-show="psdProtectWindow">
			<div class="formlist">
				<ul>
					<li class="">
						<label>新密码</label>
						<input type="password" v-model="password1"/>
					</li>
					<li class="">
						<label>确认密码</label>
						<input type="password" v-model="password2" />
					</li>
				</ul>
			</div>
			<div class="btn-wrap">
				<button class="btn-save"
					@click="reset">{{saveBtnText}}</button>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '@/components/header'
export default {
    name: 'Forget',
    components:{
    	Header
    },
    data(){
    	return{
    		topTitle:'找回密码',
    		psdProtectWindow: false,
				codeText: '获取验证码',
				saveBtnText: '确认重置',
				sendcode: false,
				checkEmail: false,
				isSaving: false,
				smscode: null,
				canReset: false,
    	  form:{
					email: null,
					code: null,
				},
				password1: null,
				password2: null,
    	}
    },
    methods:{
    	back()  {
				this.$router.go(-1);
			},
			async onEmailBlur(){
    		const vm = this;
    		const email = vm.form.email == null ? '' : vm.form.email.trim();
    		const partten = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    		if(!email){
					vm.utils.alert(vm, '请输入邮箱');
					vm.checkEmail = false;
				}else if(email && !partten.test(email)){
    			vm.utils.alert(vm, '请输入正确的邮箱格式');
					vm.checkEmail = false;
    		}else if(email && partten.test(email)){
    			var url = vm.urls.queryByEmail;
	    		var data = {
	    			userEmail:email
	    		};
	    		var options = {
	    			params:{
	    				email: email
	    			}
	    		}
				await vm.$axios.post(url, data, options).then((res) =>{
					if(res.status == 200){
						let data = res.data;
						if(data.code != -1){
								vm.utils.alert(vm, data.message);
								vm.checkEmail = false;
						} else {
							vm.checkEmail = true;
						}
					}else{
						console.log('请求出现错误')
					}
				}, (err) => {
					console.log('err',err);
				});
			 }
    	},
			async getCode() {
				const vm = this;
				const url = vm.urls.getCode;
			  await vm.onEmailBlur();
				if(!vm.checkEmail) return;
				const data = {
					email: vm.form.email
				}
				const callback = (r) => {
					vm.smscode = r.data.smscode;
					let seconds = 60;
					vm.codeText = `${seconds}s`;
					vm.sendcode = true;
					const resend = setInterval(() => {
						seconds--;
						if(seconds > 0) {
							vm.codeText = `${seconds}s`;
						}else {
							clearInterval(resend);
							vm.codeText = '获取验证码';
							vm.sendcode = false;
						}
					}, 1000);
				}
				vm.utils.postData(url, data, callback);
			},
    	goReset() {
				const vm = this;
    		if(!vm.form.code) {
					vm.utils.alert(vm, '请输入验证码');
					return;
				} else if(vm.form.code != vm.smscode) {
					vm.utils.alert(vm, '验证码错误');
				} else if(vm.form.code == vm.smscode) {
					vm.$dialog.toast({
							mes: '验证成功',
							icon: 'success',
							timeout: 1500
					});
					setTimeout(()=>{
						vm.psdProtectWindow = true;
						vm.topTitle = '重置密码';
					}, 1500);
				}
    	},
			reset() {
				const vm = this;
				if(!vm.password1 || !vm.password2) {
					vm.$dialog.toast({
						mes: '密码请填写完整',
							icon: 'error',
							timeout: 1500
					});
					return;
				}
				if(vm.password1 !== vm.password2) {
					vm.$dialog.toast({
						mes: '确认密码与新密码不一致',
							icon: 'error',
							timeout: 1500
					});
					return;
				}
				if(vm.password1.length > 20 || vm.password1.length < 6) {
					vm.$dialog.toast({
						mes: '密码不能少于6个字符或大于20个字符',
							icon: 'error',
							timeout: 1500
					});
					return;
				}
				const url = vm.urls.resetPsdByEmail;
				const data = {
					userEmail: vm.form.email,
					password: vm.password1,
				}
				vm.isSaving = true;
				vm.saveBtnText = "正在重置...";
				const callback = () => {
					vm.$dialog.toast({
						mes: '重置密码成功',
						icon: 'success',
						timeout: 1500
					});
					vm.isSaving = false;
					setTimeout(function(){
						vm.$router.push('/login');
					},2000);
				}
				vm.utils.postData(url, data, callback);
			}
    }
}
</script>

<style lang="less" scoped>
#Forget{
	.validator{
		margin: 30px 0px 0 20px;
		color: red;
		display: inline-block;
		font-size: 30px;
		.err{
			&::before{
				content: '×';
			    font-size: 36px;
				margin-right: 10px;
			}
		}
	}
	.formlist{
		background: #ffffff;
		margin-top: 40px;
		color: #666666;
		font-size: 32px;
		& ul{
			padding: 0 20px;
			& li{
				display: flex;
				// justify-content: space-between;
				padding: 25px 5px;
				border-bottom: 1px solid #e4e4e4; /*no*/
				&:last-child{
					border: none;
				}
				label{
					display: inline-block;
					width: 140px;
					text-align: left;
					margin-right: 20px;
				}
				input{
					width: 600px;
					&.code{
						width: 400px;
					}
				}
				input::placeholder{
					color:#cccccc;
				}
				.codeText {
					font-size: 30px;
					color: blue;
					display: inline-block;
					width: 200px;
					border: none;
					text-align: center;
				}
		    }
		}
		.tip{
			display: inline-block;
			color: red;
			margin-left: 10px;
		}
	}
	.btn-wrap{
		text-align: center;
		margin-top: 100px;
		.btn-save{
			width: 645px;
			height: 88px;
		}
	}
}
</style>
