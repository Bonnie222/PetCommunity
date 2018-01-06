<template>
	<div id="Medical">
		<Header title="医疗" :headerLeft="headerLeft"></Header>
		<div class="swipe-wrap">
			<mt-swipe :auto="4000">
		  		<mt-swipe-item>1</mt-swipe-item>
		  		<mt-swipe-item>2</mt-swipe-item>
		  		<mt-swipe-item>3</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="medical-menu">
			<span class="menu-item">
				<span>tu</span>
				<span>1</span>
			</span>
			<span class="menu-item">
				<span>tu</span>
				<span>2</span>
			</span>
			<span class="menu-item">
				<span>tu</span>
				<span>3</span>
			</span>
			<span class="menu-item">
				<span>tu</span>
				<span>5</span>
			</span>
			<span class="menu-item">
				<span>tu</span>
				<span>6</span>
			</span>
			<span class="menu-item">
				<span>tu</span>
				<span>7</span>
			</span>
			<span class="menu-item">
				<span>tu</span>
				<span>8</span>
			</span>
			<span class="menu-item">
				<span>tu</span>
				<span>9</span>
			</span>
		</div>
		<div class="medical-btn">
			<span class="btn">
				ss
			</span>
			<span class="btn">sss</span>
		</div>
		<Navmenu></Navmenu>
	</div>
</template>

<script>
import Header from '@/components/header'
import Navmenu from '@/components/navmenu'
export default{
	name:"Medical",
	components:{
	    Header,Navmenu
	},
	data(){
		return{
			headerLeft: false,
			show1:false
		}
	},
	methods:{
	}
}
</script>

<style lang="less" scoped>
#Medical{
	.swipe-wrap{
		background: yellowgreen;
		height: 250px;
	}
	.medical-menu{
		background: #FFFFFF;
		height: 380px;
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		.menu-item{
			display: inline-block;
			width: 25%;
			border-right:1px solid #e4e4e4; /*no*/
			border-bottom: 1px solid #e4e4e4; /*no*/
		    &:nth-of-type(4n){
		    	border-right:none
		    }
		}
	}
	.medical-btn{
		height: 100px;
		display: flex;
		display: -webkit-flex;
		background: #FFFFFF;
		.btn{
			display: inline-block;
			width: 50%;
			border-bottom: 1px solid #e4e4e4;/*no*/
			&:last-child{
				border-left: 1px solid #e4e4e4;/*no*/
			}
		}
	}
}
</style>