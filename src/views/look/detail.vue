<template>
	<div id="LookDetail">
		<Header title="寻宠详情" :headerLeft="headerLeft" :fixed="isFixed"
		 @clickRouter="back"></Header>
		<div class="detail-wrap" >
			<div class="detail-title">
				<div class="user-info">
					<span class="pic">
						<img src="../../assets/images/member.png"
						 v-if="userInfo.userAvatar == null"/>
					</span>
					<span class="desc">
						<span class="name">{{userInfo.userName}}</span>
						<span class="type">
							{{detailList.petType}}
							<i class="iconfont" :class="{ 'icon-nan' :detailList.petSex == 1, 'icon-nv':detailList.petSex == 2}"></i>
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
					<!-- <span v-for="item in detailList.petAvatar">
						<img :src="item.fileUrl" />
					</span> -->
					<yd-lightbox :num="picList.length">
						 <yd-lightbox-img v-for="(item, index) in picList"
						 :key="index" :src="item.fileUrl"></yd-lightbox-img>
				 </yd-lightbox>
				</div>
				<div class="pet-info">
					<span class="info-colum">
						<span class="colum-item">
							<label>品种</label>
							<span>{{detailList.petType}}</span>
						</span>
						<span class="colum-item">
							<label>性别</label>
							<span>{{detailList.petSex}}</span>
						</span>
						<span class="colum-item">
							<label>{{detailList.isFindPet}}地点</label>
							<span>{{detailList.region}} <br/> {{detailList.address}}</span>
						</span>
						<span class="colum-item">
							<label>{{detailList.isFindPet}}时间</label>
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
			isFixed:true,
			headerLeft:true,
			detailList:{},
			userInfo:{},
			picList:[],
		}
	},
	created(){
		this.getDetail();
	},
	methods:{
		back(){
			this.$router.go(-1);
		},
		getDetail(){
			let vm = this;
			let url = vm.urls.getLookDetail;
			let _id = vm.$route.params.id;
			let data = {
				id : _id
			}
			let options = {
				params:{
					lookid: _id
				}
			}
			let callback = function(r){
				let data = r.data.data[0];
				data.dateTime = vm.utils.changeDate(data.dateTime, "yyyy年MM月dd日 hh:mm");
				data.createTime = vm.utils.changeDate(data.createTime, "yyyy年MM月dd日 hh:mm");
				data.petType = vm.config.petTypeList[data.petType];
				data.petSex = vm.config.petSexList[data.petSex];
				data.petAge = vm.config.petAgeList[data.petAge];
				data.isFindPet = vm.config.isFindPet[data.isFindPet];
				data.userInfo = JSON.parse(data.userInfo);
				data.petAvatar = JSON.parse(data.petAvatar);
				vm.detailList = data;
				vm.picList = data.petAvatar;
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
		padding-top: 90px;
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
				width:100%;
				height: 450px;
				overflow: hidden;
				img{
					width: 100%;
					// height: inherit;
				}
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
					font-size:24px;
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
