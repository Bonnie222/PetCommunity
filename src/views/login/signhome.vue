<template>
	<div id="Signhome">
		<div class="title">爱宠社区</div>
		<span class="pic"></span>
		<div class="btn-wrap">
			<button class="btn-save" @click="goRegister">注册</button>
			<button class="btn-cancel" @click="goLogin">登录</button>
		</div>
	</div>
</template>

<script>
export default{
	name: 'Signhome',
    data(){
    	return{
    	
    	}
    },
    methods:{
    	goRegister: function() {
    		this.$router.push('/signhome/register');
    	},
    	goLogin: function() {
    		this.$router.push('/signhome/login');
    	}
    	
    }
}
</script>

<style lang="less" scoped>
@commonColor:#eb695c;
#Signhome{
	.title{
		height: 150px;
		background: yellow;
		color: @commonColor;
		font-size: 20px;margin-bottom: 20px;
	}
	.pic{
		display: block;
		width: 200px;
		height: 150px;
		margin: 0 auto;
		margin-top: 30px;
		background: @commonColor;
	}
	.btn-wrap{
		margin-top: 80px;
	    .btn-save, .btn-cancel{
	    	display: block;
	    	margin: 0 auto;
	    	width: 150px;
	    	margin-bottom: 15px;
	    }
	}
}
</style>