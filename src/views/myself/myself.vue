<template>
	<div id="Myself">
		<Header title="个人中心" :headerLeft="headerLeft"></Header>
		<div class="mymessage">
			<div class="mymessage-wrap">
				<div class="mymessage-card">
					<div class="card-info">
						<span class="info-pic">
							<img src="../../assets/images/member.png" />
						</span>
						<span class="info-mess">
							<span class="info-name">name</span>
							<span class="info-phone">number</span>
						</span>
					</div>
					<div class="card-id">
						<label>有宠号:</label>
						<span>xss</span>
					</div>
				</div>
			</div>
		</div>
		
		<div class="management">
			<div class="manage-title">
				日常管理
			</div>
			<div class="manage-menu">
				<a class="menu-item" v-for="item in manageMenu">
					<span class="manage-icon">1
						<img />
					</span>
					<span class="manage-text">{{ item.name }}</span>
				</a>
			</div>
		</div>
		
		<div class="other-list">
			<div class="other-item">
				<span>xsss</span>
				<span>></span>
			</div>
			<div class="other-item">
				<span>xsss</span>
				<span>></span>
			</div>
			<div class="other-item">
				<span>xsss</span>
				<span>></span>
			</div>
		</div>
		<Navmenu></Navmenu>
	</div>
</template>

<script>
import Header from '@/components/header'
import Navmenu from '@/components/navmenu'
export default{
	name:"Myself",
	components:{
	    Header,Navmenu
	},
	data(){
		return{
			headerLeft: false,
			show1:false,
			
			manageMenu:[{
				name: '宠物',
				icon: 'xx',
				href: '',				
			},{
				name: '宠友',
				icon: '',
				href: ''
			},{
				name: '设置',
				icon: '',
				href: ''
			}]
		    
		}
	},
	methods:{
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
			display: flex;
			display: -webkit-flex;
			justify-content: space-around;
			padding: 30px 0;
			/*align-items: center;*/
			font-size: 28px;
			color: #666666;
			.menu-item{
				display: flex;
				display: -webkit-flex;
				flex:1;
				flex-direction: column;
				align-items: center;
				border-right:1px solid #E4E4E4; /*no*/
				&:last-child{
					border-right: none;
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
		}
	}
}
</style>