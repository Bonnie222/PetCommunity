<template>
	<div id="Signhome">
		<div class="title">爱宠社区</div>
		<span class="pic"></span>
		<div class="btn-wrap">
			<router-link to="/register" class="btn-save">注册</router-link>
			<router-link to="/login" class="btn-cancel">登录</router-link>
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
    	goRegister() {
    		this.$router.push('/signhome/register');
    	},
    	goLogin() {
				console.log(111);
    		// this.$router.push('/signhome/login');
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
				line-height: 80px;
	    	margin-bottom: 40px;
				text-align: center;
	    }
	}
}
</style>
