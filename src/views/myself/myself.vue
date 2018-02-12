<template>
	<div id="Myself">
		<Header title="个人中心" :headerLeft="headerLeft"></Header>
		<div class="mymessage" :data="myInfo">
			<div class="mymessage-wrap">
				<div class="mymessage-card">
					<div class="card-info">
						<span class="info-pic">
							<img src="../../assets/images/member.png" />
						</span>
						<span class="info-mess">
							<span class="info-name">{{myInfo.userName}}
								<i class="iconfont" :class="{ 'icon-nan':myInfo.userSex == 1, 'icon-nv':myInfo.userSex == 2}"></i>
							</span>
							<span class="info-phone">{{myInfo.userPhone}}</span>
						</span>
					</div>
					<div class="card-id">
						<label>爱宠号:</label>
						<span>{{myInfo.userNumber}}</span>
					</div>
				</div>
			</div>
		</div>
		
		<div class="management">
			<div class="manage-title">
				日常管理
			</div>
			<div class="manage-menu">
				<span v-for="item in manageMenu">
					<router-link :to="item.href" class="menu-item">
						<span class="manage-icon">
							<i :class="item.icon"></i>
						</span>
						<span class="manage-text">{{ item.name }}</span>
					</router-link>
				</span>
			</div>
		</div>
		
		<div class="other-list">
			<div v-for="item in otherMenu">
				<router-link :to="item.href" class="other-item">
					<span>
						<i :class="item.icon"></i>
						<span class="name">{{item.name}}</span>
					</span>
					<span class="link"><img src="../../assets/images/right.svg"/></span>
				</router-link>
			</div>
		</div>
		<Navmenu></Navmenu>
	</div>
</template>

<script>
import Header from '@/components/header';
import Navmenu from '@/components/navmenu';
export default{
	name:"Myself",
	components:{
	    Header,Navmenu
	},
	data(){
		return{
			headerLeft: false,
			show1:false,
			myInfo:{},
			sex:false,
			
			manageMenu:[{
				name: '宠物',
				icon: 'iconfont icon-baoji',
				href: '/myself/pet/list',				
			},{
				name: '宠友',
				icon: 'iconfont icon-pengyou',
				href: ''
			},{
				name: '设置',
				icon: 'iconfont icon-shezhi1',
				href: '/myself/setting'
			}],
			
			otherMenu:[{
				name:'我的问诊',
				icon: 'iconfont icon-shouye',
				href:''
			},{
				name:'我的寻宠/主',
				icon:'iconfont icon-xunzhaochewei',
				href:'/myself/look/list/0'
			},{
				name:'我的活动',
				icon:'iconfont icon-grade-alt',
				href:''
			}]
		    
		}
	},
	created(){
		this.getMyself();
	},
	methods:{
		getMyself: function(){
			var vm = this;
			var dt = JSON.parse(window.sessionStorage.userInfo);
			var url = vm.urls.getPersonal;
			var data = {
				id: dt.id
			}
			var options = {
				params:{
					id: dt.id
				}
			}
			var callback = function(r){
				var data = r.data.data[0];
				vm.myInfo = data;
				//vm.sex = data.userSex;
			}
			vm.utils.postData(url, data, callback, options);
		}
	}
}
</script>

<style lang="less" scoped>
#Myself{
	.mymessage{
		height: 380px;
		.mymessage-wrap{
			background: #eb695c;
			width: 100%;
			height: 222px;
			padding-top:40px;
			.mymessage-card{
				background: #FFFFFF;
				width: 90%;
				height: 300px;
				margin: auto;
				padding: 0 40px;
				border-radius: 10px;
				box-shadow:5px 5px 5px #E4E4E4;
				.card-info{
					padding: 50px 0;
					display:flex;
					display:-webkit-flex;
					border-bottom:1px solid #E4E4E4; /*no*/
					.info-pic{
						display: block;
						width: 110px;
						height: 110px;
						background: #F2F2F2;
						border-radius: 50%;
						margin-right: 20px;
						overflow: hidden;
						img{
							width: 110px;
							height: 110px;
						}
					}
					.info-mess{
						display: flex;
						display: -webkit-flex;
						flex-direction: column;
						justify-content: flex-start;
						.info-name{
							display: block;
							color: #333333;
							font-size: 34px;
							font-weight: bold;
							margin: 10px 0;
							.icon-nan{
								color: #0275D8;
							}
							.icon-nv{
								color: #f00;
							}
						}
						.info-phone{
							display: block;
							color: #666666;
							font-size: 28px;
						}
					}
				}
				.card-id{
					padding: 30px 0;
					color: #999999;
					font-size: 28px;
				}
			}
		}
	}
	.management{
		height: 300px;
		width: 750px;
		background: #FFFFFF;
		margin-bottom: 30px;
		.manage-title{
			height: 100px;
			line-height: 100px;
			padding: 0 35px;
			border-bottom: 1px solid #E4E4E4; /*no*/
			color: #333333;
			font-size: 30px;
		}
		.manage-menu{
			height: 200px;
			width: inherit;
			display: flex;
			display: -webkit-flex;
			justify-content: space-around;
			align-items: center;
			font-size: 28px;
			color: #666666;
			.menu-item{
				width: 249px;
				height: inherit;
				display: flex;
				display: -webkit-flex;				
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				/*border-right:1px solid #E4E4E4;*/ /*no*/
				font-size: 32px;
				.iconfont{
					display: block;
					font-size: 56px;
					margin-bottom: 20px;
					color: #54B0F1;
				}
			}
		}
	}
	
	.other-list{
		background: #FFFFFF;
		.other-item{
			height: 90px;
			line-height: 90px;
			border-bottom: 1px solid #E4E4E4;/*no*/
			padding: 0 35px;
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			font-size:28px;
			color:#999999;
			.iconfont{
				display: inline-block;
				color: #666666;
				margin-right: 10px;
			}
			.link{
				width: 15px;
				height: 26px;
				img{
					width: 15px;
					height: 26px;
				}
			}
		}
	}
}
</style>