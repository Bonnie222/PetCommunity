<template>
	<div id="LookDetail">
		<Header title="寻宠详情" :headerLeft="headerLeft" @clickRouter="back"></Header>
		<div class="detail-wrap" >
			<div class="detail-title">
				<div class="user-info">
					<span class="pic">
						<img src="../../assets/images/member.png" v-if="userInfo.userAvatar == null"/>
					</span>
					<span class="desc">
						<span class="name">{{userInfo.userName}}</span>
						<span class="type">
							{{detailList.petType}}
							<i class="iconfont" :class="{ 'icon-nan':detailList.petSex == 1, 'icon-nv':detailList.petSex == 2}"></i>
						</span>
					</span>
				</div>
				<div class="title-footer">
					<span></span>
					<span>{{detailList.createTime}}</span>
				</div>
			</div>
			<div class="detail-info">
				<div class="pet-avatar">
					<span v-for="item in detailList.petAvatar">
						<img :src="item.fileUrl" />
					</span>
				</div>
				<div class="pet-info">
					<span class="info-colum">
						<span class="colum-item">
							<label>品种</label>
							<span>{{detailList.petType}}</span>
						</span>
						<span class="colum-item">
							<label>性别</label>
							<span v-if="detailList.petType != 3">
								{{detailList.petType == 1 ? "GG" : "MM"}}
							</span>
							<span v-else>未知</span>
						</span>
						<span class="colum-item">
							<label>{{detailList.isFindPet == 1 ? "丢失":"捡宠"}}地点</label>
							<span>{{detailList.region}} <br/> {{detailList.address}}</span>
						</span>
						<span class="colum-item">
							<label>{{detailList.isFindPet == 1 ? "丢失":"捡宠"}}时间</label>
							<span>{{detailList.dateTime}}</span>
						</span>
						
					</span>
					<span class="info-colum">
						<span class="colum-item">
							<label>年龄</label>
							<span>{{detailList.petAge}}</span>
						</span >
						<span class="colum-item">
							<label>联系方式</label>
							<span>{{detailList.contact}}</span>
						</span>
					</span>
				</div>
				<div class="detail-note" v-html="detailList.note"></div>
			</div>
			
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';
export default{
	name:'LookDetail',
	components:{
	    Header
	},
	data(){
		return{
			headerLeft:true,
			detailList:{},
			userInfo:{}
		}
	},
	created(){
		this.getDetail();
	},
	methods:{
		back:function(){
			this.$router.go(-1);
		},
		getDetail: function(){
			var vm = this;
			var url = vm.urls.getLookDetail;
			var _id = vm.$route.params.id;
			var data = {
				id : _id
			}
			var options = {
				params:{
					lookid: _id
				}
			}
			var callback = function(r){
				var data = r.data.data[0];
				var petTypeList = {
					1:'汪星人',
					2:'喵星人',
					3:'兔星人',
					4:'鼠星人',
					5:'鸟星人',
					6:'龟星人',
					7:'鱼星人',
					8:'其他'
				}
				var petAgeList = {
					0:'无信息',
					1:'小于1岁',
					2:'1岁',
					3:'2岁',
					4:'3岁',
					5:'4岁',
					6:'5岁',
					7:'6岁',
					8:'7岁',
					9:'8岁',
					10:'9岁',
					11:'10岁以上',
				}
				data.dateTime = vm.utils.changeDate(data.dateTime, "yyyy年MM月dd日 hh:mm");
				data.createTime = vm.utils.changeDate(data.createTime, "yyyy年MM月dd日 hh:mm");
				data.petType = petTypeList[data.petType];
				data.petAge = petAgeList[data.petAge];
				data.userInfo = JSON.parse(data.userInfo);
				data.petAvatar = JSON.parse(data.petAvatar);
				console.log(data);
				vm.detailList = data;
				vm.userInfo = data.userInfo;
			}
			vm.utils.postData(url, data, callback);
		}
	}
}
</script>

<style lang="less" scoped>
#LookDetail{
	.detail-wrap{
		background: #FFFFFF;
		border-bottom:1px solid #CCCCCC; /*no*/
		.detail-title{
			padding: 20px;
			border-bottom:1px solid #CCCCCC; /*no*/
			.user-info{
				display: flex;
				align-items:center;
				margin-bottom: 10px;
				.pic{
					display: inline-block;
					width: 80px;
					height: 80px;
					background: yellow;
					border-radius: 50%;
					margin-right: 20px;
					overflow: hidden;
					img{
						width: inherit;
						height: inherit;
					}
				}
				.desc{
					display: flex;
					flex-direction: column;
					.name{
						font-size: 28px;
						margin-bottom: 10px;
					}
					.type{
						color: #999999; 
						&::before{
							content: "|";
							margin-right: 5px;
						}
						.icon-nan{
							color: #0275D8;
						}
						.icon-nv{
							color: #f00;
						}
					}
				}
			}
			.title-footer{
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #999999;
			}
		}
		.detail-info{
			padding: 20px;
			.detail-note{
				margin-top: 20px;	
				font-size: 26px;
				line-height: 34px;
				color: #333333;
			}
			.pet-avatar{
				margin-bottom: 20px;
				span{
					display: block;
					width: 100%;
				/*	height: 110px;*/
					margin-bottom:10px;
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
			.pet-info{
				display: flex;
				padding-bottom: 10px;
				border-bottom: 1px solid #CCCCCC; /*no*/
				.info-colum{
					display: flex;
					flex-direction: column;
					margin-right: 10px;
					font-size:22px; 
					&:last-child{
						margin-right: 0;
					}
					.colum-item{
						display: inline-block;
						margin-bottom: 10px;
						line-height: 32px;
						label{
							color: #666666;
							vertical-align: top;
						}
						span{
							color: #EB695C;
							display: inline-block;
						}
					}
				}
			}
		}
	}
}
</style>