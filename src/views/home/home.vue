<template>
	<div id="Home">
		<Header title="首页" :headerLeft="headerLeft"></Header>
		<div class="swipe-wrap">
			<mt-swipe :auto="4000">
		  		<mt-swipe-item>1</mt-swipe-item>
		  		<mt-swipe-item>2</mt-swipe-item>
		  		<mt-swipe-item>3</mt-swipe-item>
			</mt-swipe>
		</div>
		<Navmenu></Navmenu>
	</div>
</template>

<script>
import Header from '@/components/header'
import Navmenu from '@/components/navmenu'
export default{
	name:"Home",
	components:{
	    Header,Navmenu
	},
	data(){
		return{
			headerLeft: false
		}
	}
}
</script>

<style lang="less" scoped>
#Home{
	.swipe-wrap{
		background: yellowgreen;
		height: 300px;
	}
}
</style>