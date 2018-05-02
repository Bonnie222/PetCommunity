<template>
	<div id="Forget">
		<Header :title="topTitle" @clickRouter="back"></Header>
		<div :hidden="psdProtectWindow">
			<div class="formlist">
				<ul>
					<li class="">
						<label>邮&nbsp;&nbsp;&nbsp;&nbsp;箱</label>
						<input type="email" v-model="form.email"/>
					</li>
					<li class="">
						<label>验证码</label>
						<input type="text" class="code" v-model="form.code"/>
							<span class="codeText" @click="getCode">{{codeText}}</span>
					</li>
				</ul>
			</div>
			<div class="btn-wrap">
				<button class="btn-save"
					@click="goRegister">注册</button>
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
    		psdProtectWindow:false,
				codeText: '获取验证码',
				checkEmail: false,
				smscode: null,
    	  form:{
					email: null,
					code: null,
				},
    	}
    },
    methods:{
    	back()  {
				this.$router.go(-1);
			},
			onEmailBlur(){
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
				vm.$axios.post(url, data, options).then((res) =>{
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
			getCode() {
				const vm = this;
				const url = vm.urls.getCode;
			  vm.onEmailBlur();
				if(!vm.checkEmail) return;
				const data = {
					email: vm.form.email
				}
				const callback = (r) => {
					vm.smscode = r.data.smscode;
				}
				vm.utils.postData(url, data, callback);
			},

    	goRegister() {
    		var vm = this;
    		if(!vm.checkbox){
    			return;
    		}
    		vm.onEmailBlur();
    		if(!vm.userInfo.userSex){
					vm.errMsg = '请选择性别';
    				vm.errWindow = true;
					return;
			}else{
    			vm.errWindow = false;
			}
    		if(!vm.userInfo.userProblem || !vm.userInfo.userAnswer){
					vm.$toast('密保信息未填写');
					return;
			}
				var  d = new Date();
    		var url = vm.urls.register;
    		var data = vm.userInfo;
    		data.userNumber = d.getFullYear() +''+(d.getMonth() + 1) +''+
					d.getDate() +''+ d.getHours() +''+ d.getMinutes() +''+ d.getSeconds();
    		var callback = function(r){
				vm.$dialog.toast({
					mes: '注册成功',
  					icon: 'success',
  					timeout: 1000
				});
				setTimeout(function(){
					vm.$router.replace('/signhome/login');
				},1500);
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
					width: 100px;
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
					text-align: right;
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
		.read{
			background: #CCCCCC;
			border:none;
		}
	}
}
</style>
