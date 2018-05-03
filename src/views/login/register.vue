<template>
	<div id="Register">
		<Header :title="topTitle" @clickRouter="back"></Header>
		<div :hidden="psdProtectWindow">
			<div class="formlist">
				<ul>
					<li class="">
						<label>手机<span class="tip">*</span></label>
						<input type="tel"  v-model="userInfo.userPhone"
							@focus="onFocus" @blur="onPhoneBlur"/>
					</li>
					<li class="">
						<label>昵称<span class="tip">*</span></label>
						<input type="text"  v-model="userInfo.userName"
							@focus="onFocus" @blur="onNameBlur"/>
					</li>
					<li class="">
						<label>密码<span class="tip">*</span></label>
						<input type="password" placeholder="请设置密码(最小6位数)"
							v-model="userInfo.userPsd" @focus="onFocus" @blur="onPsdBlur"/>
					</li>
					<li class="">
						<label>性别<span class="tip">*</span></label>
						<div class="radio-wrap">
							<label class="yd-radio">
								<input type="radio" value="1" name="sex"
									v-model="userInfo.userSex">
								<span class="yd-radio-icon male">
									<i class="icon"></i>
								</span>
								<span class="yd-radio-text">男</span>
							</label>
							<label class="yd-radio">
								<input type="radio" value="2" name="sex"
									v-model="userInfo.userSex">
								<span class="yd-radio-icon female">
									<i class="icon"></i>
								</span>
								<span class="yd-radio-text">女</span>
							</label>
						</div>
					</li>
					<li class="">
						<label>邮箱<span class="tip">*</span></label>
						<input type="email" v-model="userInfo.userEmail"
							@blur="onEmailBlur" @focus="onFocus"/>
					</li>
					<li class="">
						<label>生日</label>
						<input type="text" v-model="userInfo.userBirth"
							@click="openDatePicker" readonly/>
					</li>
				</ul>
				<!--选择器-->
				<mt-datetime-picker ref="userBirthPicker" type="date"
				 :startDate="startDate" :endDate="endDate"
				 @confirm="handleUserBirth" v-model="userBirthDate"></mt-datetime-picker>
			</div>
			<div class="validator" v-show="errWindow">
				<span class="err">{{errMsg}}</span>
			</div>
			<!-- <div class="psdProtect" @click="setAnswer">
				<label>设置密保(必填)</label>
				<span class="link">
					<img src="../../assets/images/right.svg">
				</span>
			</div> -->
			<div class="readp">
				<yd-checkbox v-model="checkbox" color="#f00" size="15">
					<span>已同意 <span class="article">《爱宠社区协议》</span></span>
				</yd-checkbox>
			</div>
			<div class="btn-wrap">
				<button class="btn-save" :class="{read:!checkbox}"
					@click="goRegister">注册</button>
			</div>
		</div>
		<!-- <div v-show="psdProtectWindow">
			<div class="protect-wrap">
				<span class="protect-title">请设置您的问题</span>
				<div class="protect-input">
					<input type="text" v-model="userInfo.userProblem"/>
				</div>
			</div>
			<div class="protect-wrap">
				<span class="protect-title">请设置您的答案</span>
				<div class="protect-input">
					<textarea v-model="userInfo.userAnswer"/>
				</div>
			</div>
			<div class="protect-tip">*密保主要用于忘记密码时使用</div>
			<div class="btn-wrap">
				<button class="btn-save"  @click="saveProtect">保存</button>
			</div>
		</div> -->
	</div>
</template>

<script>
import Header from '@/components/header';
import utils from '@/public/utils';
export default {
    name: 'Register',
    components:{
    	Header
    },
    data(){
    	return{
				canRegister: false,
    		topTitle:'注册',
    		errWindow:false,
    		errMsg:'',
    		psdProtectWindow:false,
				userBirthDate: new Date(utils.formatDate(utils.getNowTime())),
    		userInfo:{
    			userPhone:null,
    			userName:null,
    			userPsd:null,
    			userEmail:null,
    			userBirth:null,
    		},
    		checkbox:false,
    		/*出生日期范围*/
				startDate:new Date('1960,1,1'),
				endDate:new Date(utils.formatDate(utils.getNowTime())),
    	}
    },
    methods:{
    	back()  {
				if(this.topTitle == '注册') {
					this.$router.go(-1);
				} else {
					this.topTitle = '注册';
	   			this.psdProtectWindow = false;
				}
			},
    	onFocus() {
    		var vm = this;
    		vm.errMsg = '';
    		vm.errWindow = false;
    	},
    	onPhoneBlur() {
    		var vm = this;
    		var phone = vm.userInfo.userPhone == null ? '' : vm.userInfo.userPhone.trim();
    		var partten = /^$|^1(3|4|5|7|8)\d{9}$/;
    		if(!phone){
    			vm.errMsg = '手机号不能为空';
    			vm.errWindow = true;
    		}else if(!partten.test(phone)){
    			vm.errMsg = '请输入正确的手机号格式';
    			vm.errWindow = true;
    		}else{
    			var url = vm.urls.queryByPhone;
	    		var data = {
	    			userPhone:phone
	    		};
	    		var options = {
	    			params:{
	    				phone: phone
	    			}
	    		}
				vm.$axios.post(url, data, options).then((res) =>{
					if(res.status == 200){
						let data = res.data;
						if(data.code != 1){
							if(data.code == -1){
								vm.errMsg = '该号码已被注册';
	    					vm.errWindow = true;
							}else{
								console.log(data.message);
							}
						}

					}else{
						console.log('请求出现错误')
					}
					console.log(res);
				}, (err) => {
					console.log('err',err);
				});
    		}
    	},
    	onNameBlur() {
    		var vm = this;
    		var name = vm.userInfo.userName == null ? '': vm.userInfo.userName.trim();
    		if(!name){
    			vm.errMsg = '昵称不能为空';
    			vm.errWindow = true;
    		}else{
    			var url = vm.urls.queryByName;
	    		var data = {
	    			userName:name
	    		};
	    		var options = {
	    			params:{
	    				name: name
	    			}
	    		}
				vm.$axios.post(url, data, options).then((res) =>{
					if(res.status == 200){
						let data = res.data;
						if(data.code != 1){
							if(data.code == -1){
								vm.errMsg = '该昵称已存在';
	    						vm.errWindow = true;
							}else{
								console.log(data.message);
							}
						}

					}else{
						console.log('请求出现错误')
					}
					console.log(res);
				}, (err) => {
					console.log('err',err);
				});
    		}
    	},
    	onPsdBlur(){
    		var vm = this;
    		var psd = vm.userInfo.userPsd;
    		if(!psd){
    			vm.errMsg = '密码不能为空';
    			vm.errWindow = true;
    		}else if(psd.length < 6){
    			vm.errMsg = '密码长度不能小于6位数';
    			vm.errWindow = true;
    		}
    	},
    	onEmailBlur(){
    		var vm = this;
    		var email = vm.userInfo.userEmail == null ? '' : vm.userInfo.userEmail.trim();
    		var partten = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    		if(!email){
					vm.errMsg = '邮箱不能为空';
    			vm.errWindow = true;
				}else if(email && !partten.test(email)){
    			vm.errMsg = '请输入正确的邮箱格式';
    			vm.errWindow = true;
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
						if(data.code != 1){
							if(data.code == -1){
								vm.errMsg = '该邮箱已被注册';
	    						vm.errWindow = true;
							}else{
								console.log(data.message);
							}
						}

					}else{
						console.log('请求出现错误')
					}
					console.log(res);
				}, (err) => {
					console.log('err',err);
				});
			}
    	},
    	openDatePicker() {
	   		this.$refs.userBirthPicker.open();
	   	},
	   	handleUserBirth(value) {
	   		var d = value.getFullYear() + '-' + (value.getMonth()+1) + '-' + value.getDate();
	   		d = this.utils.formatDate(d, 'yyyy-MM-dd');
	   		this.userInfo.userBirth = d;
				this.userBirthDate = d;
	   	},
    	goRegister() {
    		var vm = this;
    		if(!vm.checkbox){
    			return;
    		}
    	  vm.onPhoneBlur();
    	  vm.onNameBlur();
    		vm.onPsdBlur();
    		vm.onEmailBlur();
    		if(!vm.userInfo.userSex){
					vm.errMsg = '请选择性别';
    				vm.errWindow = true;
					return;
				}
				if(!vm.userInfo.userPhone || !vm.userInfo.userName
					   || !vm.userInfo.usePsd || !vm.userInfo.userEmail){
					vm.$toast('请填写必填选项');
					return;
				}
	    	vm.errWindow = false;
				// if(!vm.canRegister) return;
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
					vm.$router.replace('/login');
				},1500);
			}
			vm.utils.postData(url, data, callback);
    	}
    }
}
</script>

<style lang="less" scoped>
#Register{
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
				justify-content: space-between;
				padding: 25px 5px;
				border-bottom: 1px solid #e4e4e4; /*no*/
				&:last-child{
					border: none;
				}
				label{
					display: inline-block;
					width: 100px;
					text-align: left;
				}
				input{
					width: 500px;
					text-align: right;
				}
				input::placeholder{
					color:#cccccc;
				}
				.radio-wrap{
					.yd-radio{
						display: inline-block;
						padding-right: 20px;
						&:last-child{
							padding: 0;
						}
						&>input[type=radio]{
							position: absolute;
							left: -9999em;
						}
						&>input[type=radio]:checked+.yd-radio-icon{
							border-color: currentcolor;
							&>i{
								opacity: 1;
								transition: all .2s ease-in-out;
								transform: translate(-50%, -50%) scale(.1);
							}
						}
						.yd-radio-icon{
							border: 1px solid #CCC; /*no*/
							border-radius: 50%;
							display: inline-block;
							position: relative;
							z-index: 10;
							vertical-align: bottom;
							pointer-events: none;
							/*color: rgb(76, 216, 100); */
							width: 40px;
							height: 40px;
							.icon{
								display: inline-block;
								width: 100px; /*no*/
								height: 100px;/*no*/
								content: "";
								position: absolute;
								left: 50%;
								top:50%;
								border-radius: 50%;
								background-color: currentcolor;
								opacity: 0;
								transform: translate(-50%, -50%) scale(.1);
							}

						}
						.male{
							color: #0275d8;
						}
						.female{
							color: #f00;
						}
						.yd-radio-text{
							margin-left: 1px;
							font-size: 30px;
							color: #666;
							pointer-events: none;
						}
					}
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
	.readp{
		margin-top: 50px;
		text-align: center;
		color: 28px;
		.article{
			color: #0275D8;
		}
	}
	.psdProtect{
		background: #FFFFFF;
		margin-top:30px;
		padding: 25px 20px;
		color: #666666;
		font-size: 32px;
		display: flex;
		justify-content: space-between;
		.link{
			width: 15px;
			height: 26px;
			img{
				width: 15px;
				height: 26px;
			}
		}
	}
	.protect-wrap{
		color: #666666;
		font-size: 32px;
		margin-top: 60px;
		.protect-title{
			display: block;
			margin-bottom: 20px;
			margin:20px;
		}
		.protect-input{
			background: #FFFFFF;
			padding:20px;
			input{

			}
			textarea{
				width: 100%;
				height: 200px;
				border: none;
			}
		}
	}
	.protect-tip{
		margin-top: 50px;
		padding: 0 20px;
		color: #999999;
		font-size: 28px;
	}
}
</style>
