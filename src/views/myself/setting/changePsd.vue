<template>
	<div id="ChangePsd">
		<Header title="修改密码" :headerLeft="headerLeft" @clickRouter="back"></Header>
		<div>
			<div class="">
				
			</div>
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';
export default{
	name:"ChangePsd",
	components:{
	    Header,
	},
	data(){
		return{
			
		}
	},
	methods:{
		back:function(){
			this.$router.go(-1);
		},
	}
}
</script>

<style lang="less" scoped>
#ChangePsd{
	
}
</style>