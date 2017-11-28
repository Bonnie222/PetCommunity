<template>
	<div id="Login">
		<Header title="登录" ></Header>
		<div class="loginform">
			<ul>
				<li class="">
					<span>s</span>
					<input type="text" placeholder="sss" value=""/>
				</li>
				<li class="">
					<span>s</span>
					<input type="text" placeholder="sss" value=""/>
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
import Header from '@/components/header'
export default {
    name: 'Login',
    components:{
    	Header
    },
    data(){
    	return{
    	
    	}
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
	font-size: 36px;
	background: #f2f2f2;
	.loginform{
		background: #ffffff;
		margin-top: 20px;
		& ul{
			text-align: center;
			& li{
				margin: 0 50px;
				height: 125px;
				border-bottom: 1px solid #e4e4e4;
				&:last-child{
					border: none;
				}
				input{
					height: inherit;
				}
		    }
		}
	}
	.btn-wrap{
		margin-top: 30px;
		text-align: center;
		.btn-cancel,.btn-save{
			font-size: 34px;
		}
		.btn-cancel{
			margin-right: 20px;
		}
	}
}
</style>