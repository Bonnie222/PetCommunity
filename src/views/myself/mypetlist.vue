<template>
	<div id="Mypet">
		<Header title="我的宠物" :headerLeft="headerLeft"></Header>
		<div>
			<router-link to="" class="pet-wrap">
				<span class="pet-info">
					<img src="" />
					<span class="mess">
						<span class="name">
							刚刚
							<i class="iconfont icon-baoji"></i>
						</span>
						<span>
							<span class="type">大白兔</span>
							<span class="age">1个月</span>
						</span>
					</span>
				</span>
				<span class="right">
					<img src="../../assets/images/right.svg"/>
				</span>
			</router-link>
		</div>
		<router-link to="/myself/addpet" class="btn-create">
			添加宠物
		</router-link>
	</div>
</template>

<script>
import Header from '@/components/header'
export default{
	name:"Mypet",
	components:{
	    Header
	},
	data(){
		return{
			headerLeft: true,
//			show1:false,		    
		}
	},
	methods:{
	}
}
</script>

<style lang="less" scoped>
#Mypet{
	.pet-wrap{
		background: #FFFFFF;
		height: 120px;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #E4E4E4; /*no*/
		padding: 0 25px;
		.pet-info{
			display: flex;
			display: -webkit-flex;
			img{
				background: #E4E4E4;
				width: 80px;
				height: 80px;
				border-radius: 50%;
				margin-right: 20px;
			}
			.mess{
				display: flex;
				display: -webkit-flex;
				flex-direction: column;
				padding: 5px 0;
				.name{
					font-size: 28px;
					font-weight: bold;
					margin-bottom: 15px;
					.iconfont{
						color: #EB695C;
					}
				}
			}
			.type{
				color: #666666;				
				border: 1px solid #666666;/*no*/
				border-radius: 3px;/*no*/
				padding: 0px 12px;
				font-size: 16px;
			}
			.age{
				color: #999999;
				font-size: 16px;
			}
		}
		.right{
			img{
				width: 20px;
				height: 35px;
			}
		}
	}
	.btn-create{
		background: #FFFFFF;
		display: block;
		height: 100px;
		line-height: 100px;
		text-align: center;
		border-bottom: 1px solid #E4E4E4;/*no*/
		color: #999999;
		font-size: 32px;
	}
}	
</style>