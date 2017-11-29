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
		height: 500px;
		background: yellow;
		color: @commonColor;
		font-size: 20px;margin-bottom: 20px;
	}
	.pic{
		display: block;
		width: 300px;
		height: 170px;
		margin: 0 auto;
		margin-top: 30px;
		background: @commonColor;
	}
	.btn-wrap{
		margin-top: 250px;
	    .btn-save, .btn-cancel{
	    	display: block;
	    	margin: 0 auto;
	    	width: 475px;
	    	margin-bottom: 40px;
	    }
	}
}
</style>