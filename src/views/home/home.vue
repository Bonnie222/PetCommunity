<template>
	<div id="Home">
		<Header title="首页" :headerLeft="headerLeft"></Header>
		<div class="swipe-wrap">
			<mt-swipe :auto="4000">
				<mt-swipe-item v-for="(item, index) in sliceList" :key="index">
					<img :src="item.pic"/>
				</mt-swipe-item>
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
				<yd-rollnotice autoplay="2000">
			        <yd-rollnotice-item v-for="item in lookList" :key="item.id">
			        	<router-link :to="item.href" class="linklook">
			        		<span class="tip">
											{{item.isFindPet == 1? '寻宠' : '寻主'}}
									</span>
			        		<span class="note">{{item.note}}</span>
			        	</router-link>
			        </yd-rollnotice-item>
				</yd-rollnotice>
			</span>
		</div>
		<div class="pet-list">
			<div class="pet-list-title">
				<span class="tip">新宠露脸</span>
				<span class="more">
					<router-link to="/petshow/list/1">更多＞</router-link>
				</span>
			</div>
			<ul>
				<li v-for="(item, idex) in petshowList" :key="idex">
					<router-link :to="{ name: 'PetshowDetail', params: {id:item.id},
														query:{userId: item.userId} }" class="imglink">
						<img :src="item.petAvatar[0].fileUrl" />
					</router-link>
				</li>
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
	    Header, Navmenu
	},
	data(){
		return{
			headerLeft: false,
			show1:false,
			lookList:[],
			petshowList:[],
			middleMenu:[{
				name:'寻宠110',
				src: require('../../assets/images/xunzhao.svg'),
				href:'/look/list'
			},{
				name:'文章',
				src: require('../../assets/images/huati.svg'),
				href:'/article/list'
			},{
				name:'认证号',
				src:require('../../assets/images/zixun.svg'),
				href:'/user/list'
			},{
				name:'活动',
				src:require('../../assets/images/huodong.svg'),
				href:'/activity/list/1'
			}],
			sliceList: [{
				pic: require('../../assets/images/home(1).jpg'),
			}, {
				pic: require('../../assets/images/medical(2).jpg'),
			}]
		}
	},
	mounted(){
		this.getHomeLook();
		this.getHomePetshow();
	},
	methods:{
		getHomeLook() {
			var vm = this;
			var url = vm.urls.getHomeLook;
			var callback = (r) => {
				let list = r.data.data.data;
				$.each(list, function(index,item) {
					item.href = '/look/detail/' + item.id;
					item.note = item.note.replace(/<br\/>/g, " ");
				});
				vm.lookList = list;
			}
			vm.utils.getData(url,callback);
		},
		getHomePetshow(){
			const vm = this;
			const url = vm.urls.getHomePetshow;
			const callback = (r) => {
				let list = r.data.data.data;
				list.forEach((item) => {
					item.petAvatar = JSON.parse(item.petAvatar);
				});
				vm.petshowList = list;
			}
			vm.utils.getData(url,callback);
		}
	}
}
</script>

<style lang="less" scoped>
#Home{

	.swipe-wrap{
		height: 250px;
		img {
			width: 100%;
			height: 100%;
		}
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
		height: 120px;
		padding: 0 20px;
		background: #FFFFFF;
		border: 1px solid #e4e4e4;/*no*/
		border-radius: 10px;
		display: flex;
		align-items: center;
		.findpet-title{
			margin-right: 10px;
			width: 80px;
			font-size: 32px;
			font-weight: bolder;
			color: #EB695C;
		}
		.findpet-list{
			// width: 85%;
			.yd-rollnotice{

			}
			.yd-rollnotice-item{
				.linklook {
					display: flex;
					align-items: center;
				}
				.tip{
					text-align: center;
					font-size:26px;
					display: inline-block;
					width: 100px;
					border: 1px solid #D81E06; /*no*/
					color: #D81E06;
					padding: 5px 10px;
					border-radius: 5px;
					margin-right: 10px;
				}
				.note{
					font-size: 28px;
					height: 30px;
					line-height: 32px;
					/* 多行文本溢出利用省略号代替,仅用于webkit内核 $line 行数*/
			    overflow : hidden;
			    text-overflow: ellipsis;
			    display: inline-block;
			    -webkit-box-orient: vertical;
			    -webkit-line-clamp: 1;
				}
			}
		}
	}
	.pet-list{
		margin:100px 25px 25px;
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
		ul{
			display: flex;
			flex-wrap: wrap;
			padding: 0 20px;
			li{
				height: 150px;
				width: 200px;
				margin-bottom: 20px;
				margin-right: 25px;
				overflow: hidden;
				&:nth-child(3n) {
					margin-right: 0;
				}
			  .imglink {
					display: inline-block;
					width: inherit;
					height: inherit;
					img {
						height: inherit;
						width: inherit;
					}
				}
			}
		}
	}
}
</style>
