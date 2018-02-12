<template>
	<div id="Mysetting">
		<Header title="设置" :headerLeft="headerLeft" @clickRouter="back"></Header>
		<div class="other-list">
			<div v-for="item in firstMenu">
				<router-link :to="item.href" class="other-item">
					<span class="name">{{item.name}}</span>
					<span class="link"><img src="../../../assets/images/right.svg"/></span>
				</router-link>
			</div>
		</div>
		
		<div class="btn-create">
			退出账号
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';

export default{
	name:"MySetting",
	components:{
	    Header
	},
	data(){
		return{
			headerLeft: true,
			
			firstMenu:[{
				name: '个人资料',
				href: '/myself/info',				
			},{
				name: '修改密码',
				href: '/myself/psd'
			}],

		    
		}
	},
	created(){
	},
	methods:{
		back:function(){
			this.$router.replace('/myself');
		},
	}
}
</script>

<style lang="less" scoped>
#Mysetting{
	.other-list{
		background: #FFFFFF;
		margin-top: 30px;
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
	.btn-create{
		background: #FFFFFF;
		margin-top: 30px;
		display: block;
		height: 90px;
		line-height: 90px;
		text-align: center;
		border-bottom: 1px solid #E4E4E4;/*no*/
		color: #999999;
		font-size: 28px;
	}
}
</style>