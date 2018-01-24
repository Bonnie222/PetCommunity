<template>
	<div id="LookList">
		<Header title="寻宠110" :headerLeft="headerLeft"></Header>
		<div class="link-btn" >
			<router-link to="/look/edit">
				<span>我要寻宠/主</span>
			</router-link>
			
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';

export default{
	name:"LookList",
	components:{
	    Header
	},
	data(){
		return{
			headerLeft:true
		}
	}
}
	
</script>

<style lang="less" scoped>
#LookList{
	.mint-header{
		background: #FFFFFF;
		border-bottom:1px solid #CCCCCC; /*no*/
		color: #333333;
	}
	.link-btn{
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #FFFFFF;
		height: 80px;
		line-height: 80px;
		text-align: center;
		border-top:1px solid #CCCCCC; /*no*/
		color: #EB695C;
	}
}
</style>