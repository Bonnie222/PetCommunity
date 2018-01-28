<template>
	<div id="LookList">
		<Header title="寻宠110" :headerLeft="headerLeft"></Header>
		<div class="list-wrap">
			<router-link :to="item.url" class="list-item" v-for="item in looklist">
				<div class="item-title">
					<span class="user-pic">
						<img src="../../assets/images/member.png" v-if="item.userInfo.userAvatar == null"/>
					</span>
					<span class="user-name">{{item.userInfo.userName}}</span>
				</div>
				<div class="item-notes" v-html="item.note"></div>
				<div class="item-footer">
					<span></span>
					<span>{{item.createTime}}</span>
				</div>
			</router-link>
		</div>
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
			headerLeft:true,
			looklist:{}
		}
	},
	created(){
		this.getLookList();
	},
	methods:{
		getLookList: function(){
			var vm = this;
			var url = vm.urls.getLookList;
			var callback = function(r){
				var data = r.data.data;
				$.each(data, function(index, item) {
					item.url = "/look/detail/" + item.id;
					item.userInfo = JSON.parse(item.userInfo);
					item.createTime = vm.utils.changeDate(item.createTime, "yyyy年MM月dd日 hh:mm");
				});
				vm.looklist = data;
			}
			vm.utils.getData(url,callback);
		}
	}
}
	
</script>

<style lang="less" scoped>
#LookList{
	/*.mint-header{
		background: #FFFFFF;
		border-bottom:1px solid #CCCCCC; /*no*/
		/*color: #333333;
	}*/
	.list-wrap{
		.list-item{
			display: block;
			background: #FFFFFF;
			width: 95%;
			min-height: 150px;
			border-radius: 10px;
			border: 1px solid #E4E4E4;
			margin: 10px auto;
			padding: 15px;
			.item-title{
				display:flex;
				align-items:center;
				margin-bottom:15px;
				.user-pic{
					display: inline-block;
					width: 80px;
					height: 80px;
					border-radius: 50%;
					margin-right: 20px;
					overflow: hidden;
					img{
						width: inherit;
						height: inherit;
					}
				}
				.user-name{
					font-size: 32px;
				}
			}
			.item-notes{
				max-height: 210px;
				margin-bottom: 15px;
				font-size: 28px;
				line-height: 36px;
				/* 多行文本溢出利用省略号代替,仅用于webkit内核 $line 行数*/
			    overflow : hidden;
			    text-overflow: ellipsis;
			    display: -webkit-box;
			    -webkit-box-orient: vertical;
			    -webkit-line-clamp: 6;
				margin: 10px 0 25px;
				color: #333333;
			}
			.item-footer{
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #999999;
			}
		}
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
		font-size: 26px;
	}
}
</style>