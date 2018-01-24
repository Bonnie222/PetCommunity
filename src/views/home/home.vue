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
		<div class="home-menu-wrap">
			<div v-for="item in middleMenu">
				<router-link :to="item.href" class="home-menu-list">
					<span class="menu-pic">
						<img :src="item.src" />
					</span>
					<span class="menu-title">{{item.name}}</span>
				</router-link>
			</div>
		</div>
		<div class="findpet">
			<span class="findpet-title">寻宠启示</span>
			<span class="findpet-list">
				<yd-rollnotice autoplay="2000" speed="500">
			        <yd-rollnotice-item><span style="color:#F00;"> 荐 </span>荣耀V9 3月超级钜惠！</yd-rollnotice-item>
			        <yd-rollnotice-item><span style="color:#F00;"> 荐 </span>3.23京东超级品牌日格力盛典</yd-rollnotice-item>
			        <yd-rollnotice-item><span style="color:#F00;"> 荐 </span>京东服饰 早春新品低至7折</yd-rollnotice-item>
    			   <yd-rollnotice-item><span style="color:#F00;"> 荐 </span>sss</yd-rollnotice-item>
				</yd-rollnotice>
			</span>
		</div>
		<div class="pet-list">
			<div class="pet-list-title">
				<span class="tip">新宠露脸</span>
				<span class="more">更多＞</span>
			</div>
			<ul>
				<li>s</li><li>s</li>
				<li>s</li>
				<li>s</li>
				<li>s</li>
				<li>s</li>
			</ul>
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
			headerLeft: false,
			show1:false,
			
			middleMenu:[{
				name:'寻宠110',
				src: require('../../assets/images/xunzhao.svg'),
				href:'/look/list'
			},{
				name:'话题',
				src: require('../../assets/images/huati.svg'),
				href:''
			},{
				name:'咨询',
				src:require('../../assets/images/zixun.svg'),
				href:''
			},{
				name:'活动',
				src:require('../../assets/images/huodong.svg'),
				href:''
			}]
		}
	},
	create:{
		
	},
	methods:{
	}
}
</script>

<style lang="less" scoped>
#Home{
	.swipe-wrap{
		background: yellowgreen;
		height: 250px;
	}
	.home-menu-wrap{
		background: #FFFFFF;
		height: 170px;
		border-bottom: 1px solid #e4e4e4;/*no*/
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 100px 0;
		.home-menu-list{
			display: flex;
			flex-direction: column;
			align-items:center;
			span{
				display: block;
			}
			.menu-pic{
				width: 90px;
				height: 90px;
				border-radius: 100%;
				margin-bottom: 15px;
				img{
					display: block;
					width: inherit;
					height: inherit;
				}
			}
		}
	}
	.findpet{
		margin:30px 25px;
		height: 130px;
		background: #FFFFFF;
		border: 1px solid #e4e4e4;/*no*/
		border-radius: 10px;		
		.findpet-title{
			margin:20px;
			vertical-align: middle;
			display: inline-block;
			width: 100px;
			font-size: 46px;
			font-weight: bolder;
			color: #EB695C;
		}
		.findpet-list{
			margin-top: 20px;
			display: inline-block;
			vertical-align: middle;
			.yd-rollnotice{
		
			}
			.yd-rollnotice-item{
				font-size: 36px;
			}
		}
	}
	.pet-list{
		margin:0px 25px 25px;
		background: #FFFFFF;
		border: 1px solid #e4e4e4;/*no*/
		border-radius: 10px;
		.pet-list-title{
			padding:25px 20px;
			color: #666666;
			font-size: 32px;
			overflow:hidden;
			.more{
				display: inline-block;
				float: right;
				font-size: 28px;
				color: #999999;
			}			
		}
		& ul{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			& li{
				height: 150px;
				width: 200px;
				background: yellow;
				margin-bottom: 20px;
			}
		}
	}
}
</style>