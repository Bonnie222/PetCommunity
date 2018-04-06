<template>
	<div id="LookList">
		<Header title="寻宠110" :headerLeft="headerLeft" :fixed="isFixed" @clickRouter="back"></Header>
		<div>
			<div class="list-wrap">
				<router-link :to="{name:'LookDetail', params:{id: item.id}}"
					class="list-item" v-for="(item, index) in looklist" :key="index">
					<div class="item-title">
						<span class="user-pic">
							<img src="../../assets/images/member.png" v-if="!item.userAvatar"/>
							<span v-else>
								<img :src="item.userAvatar.fileUrl"/>
							</span>
						</span>
						<span class="user-name">{{item.userName}}</span>
					</div>
					<div class="item-notes" v-html="item.note"></div>
					<div class="item-pic">
						<span v-for="pic in item.petAvatar">
							<img :src="pic.fileUrl"/>
						</span>
					</div>
					<div class="item-footer">
						<span></span>
						<span>{{item.createTime}}</span>
					</div>
				</router-link>
			</div>
			<div class="link-btn" >
				<router-link to="/look/edit">
					<span><i class="iconfont icon-tianxie"></i>我要寻宠/主</span>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';

export default{
	name:"LookList",
	components:{
	    Header,
	},
	data(){
		return{
			isFixed:true,
			headerLeft:true,
			looklist:{}
		}
	},
	created(){
		this.getLookList();
	},
	methods:{
		back(){
			this.$router.go(-1);
		},
		getLookList(){
			let vm = this;
			let url = vm.urls.getLookList;
			vm.$indicator.open({
			  spinnerType: 'fading-circle'
			});
			let callback = function(r){
				vm.$indicator.close();
				let data = r.data.data.data;
				$.each(data, function(index, item) {
					if (item.userAvatar) {
						item.userAvatar = JSON.parse(item.userAvatar);
					}
					item.createTime = vm.utils.changeDate(item.createTime, "yyyy年MM月dd日 hh:mm");
					item.petAvatar = JSON.parse(item.petAvatar);
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
	.iconfont{
		margin-right: 10px;
	}
	.list-wrap{
		padding: 100px 0;
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
						width: 80px;
						height: 80px;
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
			.item-pic{
				margin-bottom: 20px;
				span{
					display: inline-block;
					width: 150px;
					height: 150px;
					margin-right:10px;
					border-radius: 20px;
					overflow:hidden;
					&:last-child{
						margin: 0;
					}
					img{
						width: inherit;
						height: inherit;
					}
				}
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
