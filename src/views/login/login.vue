<template>
	<div id="Login">
		<Header title="登录" ></Header>
		<div class="loginform">
			<ul>
				<li class="">
					<span class="labellogo">
						<img src="../../assets/images/phone.png" />
					</span>
					<input type="text" placeholder="请输入手机号" value=""/>
				</li>
				<li class="">
					<span class="labellogo">
						<img src="../../assets/images/psw.png" />
					</span>
					<input type="text" placeholder="请输入密码" value=""/>
				</li>
			</ul>
		</div>
		<div class="btn-wrap">
			<button class="btn-cancel">忘记了？</button>
			<button class="btn-save" @click="login">登录</button>
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';
import utils from '@/public/utils';
import urls from '@/public/api';
export default {
    name: 'Login',
    components:{
    	Header
    },
    data(){
    	return{
    	
    	}
    },
    created(){
    	var data = {
    		name: 'ss',
    		phone: '1252365',
    		password: '123456'
//			id: 1
//			tablename: 'user',
//			id:1
    	}
    	
//  	var callback = function(r){
//  		console.log(r);
//  	}
    	//utils.postData('/api/addUser',data, callback);
//  	this.$http.post('/api/addUser', data,{}).then((response) => {
//	        console.log(response);
//	      })
//  	this.$http.post('/api/addUser', data,{}).then((response) => {
//	        //console.log(response);
//	      })
    },
    methods:{
    	login: function(){
    		this.$router.push('/home');
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
	.btn-wrap{
		margin-top: 100px;
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