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
			        <yd-rollnotice-item v-for="item in lookList" key="item.id">
			        	<router-link :to="item.href">
			        		<span class="tip"> {{item.isFindPet == 1? '寻宠' : '寻主'}} </span>
			        		<span class="note">{{item.note}}</span>
			        	</router-link>
			        </yd-rollnotice-item>
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
			lookList:[],
			
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
	created(){
		this.getHomeLook();
	},
	methods:{
		getHomeLook: function(){
			var vm = this;
			var url = vm.urls.getHomeLook;
			var callback = function(r){
				$.each(r.data.data, function(index,item) {
					item.href = '/look/detail/' + item.id;
					item.note = item.note.replace(/<br\/>/g, " ");
				});
				vm.lookList = r.data.data;
				console.log(vm.lookList)
			}
			vm.utils.getData(url,callback);
		}
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
		display: flex;
		align-items: center;
		/*overflow: hidden;		*/
		.findpet-title{
			margin:20px;
			vertical-align: middle;
			display: block;
			width: 15%;
			font-size: 46px;
			font-weight: bolder;
			color: #EB695C;
		}
		.findpet-list{
			width: 85%;
			margin-top: 20px;
			display: inline-block;
			vertical-align: middle;
			.yd-rollnotice{
		
			}
			.yd-rollnotice-item{
				background: yellow;
				
				.tip{
					font-size:28px;
					display: inline-block;
					border: 1px solid #D81E06; /*no*/
					color: #D81E06;
					padding: 5px 10px;
					border-radius: 5px;
					margin-right: 10px;
				}
				.note{
					font-size: 36px;
					height: 40px;
					line-height: 40px;
					/* 多行文本溢出利用省略号代替,仅用于webkit内核 $line 行数*/
				    overflow : hidden;
				    text-overflow: ellipsis;
				    display: inline-block;
				    /*-webkit-box-orient: vertical;*/
				    -webkit-line-clamp: 1;
				}
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