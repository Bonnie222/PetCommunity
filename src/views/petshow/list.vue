<template>
	<div id="Petshow">
		<div class="tab-list">
				<span></span>
				<span class="tab-list-span">
					<span v-for="(item, index) in actTabList.list" >
						<label>
							<input type="radio" name="topTabList" :value="item.value"
								:checked="item.check" @click="changeToTab(item.value)"/>
							<span class="tab-name">
								{{item.name}}
							</span>
						</label>
					</span>
				</span>
				<router-link to="/petshow/edit" class="camera">
					<i class="iconfont icon-shangchuantupian_l"></i>
				</router-link>
		</div>
		<div class="contain">
			<div class="detail-wrap" v-for="(item, index) in petshowlist" :key="index">
				<router-link :to="{ name: 'UserDetail', params: {id: item.userId} }">
					<div class="detail-title">
						<div class="user-info">
							<span class="pic">
								<img src="../../assets/images/member.png"
								 v-if="item.userAvatar == null"/>
								 <span v-else>
									 <img :src="item.userAvatar.fileUrl"/>
								 </span>
							</span>
							<span class="desc">
								<span class="name">{{item.userName}}</span>
								<span>{{item.createTime}}</span>
							</span>
						</div>
					</div>
				</router-link>
				<router-link :to="{ name: 'PetshowDetail', params: {id:item.id},query:{userId: item.userId}}">
					<div class="detail-notes" v-html="item.content"></div>
				</router-link>
					<div class="detail-pic">
						<yd-lightbox :num="item.petAvatar.length">
							 <yd-lightbox-img v-for="(pic, per) in item.petAvatar"
							 :key="per" :src="pic.fileUrl"></yd-lightbox-img>
							 <yd-lightbox-txt>
		            <h1 slot="top">{{item.contentTitle}}</h1>
		            <div slot="content" class="content" v-html="item.contentNote">
		            </div>
		        	</yd-lightbox-txt>
					 </yd-lightbox>
					</div>
					<div class="detail-footer">
						<span>
							<router-link :to="{ name: 'PetshowDetail', params: {id:item.id},query:{userId:id}}">
								<i class="iconfont icon-8pinglun"></i>
								<label>{{item.commentCount==0? '评论':item.commentCount}}</label>
							</router-link>
						</span>
						<span><i class="iconfont" :class="{'icon-shoucang2': item.likeStatus==1,
							'icon-shoucang3':item.likeStatus==0 || item.likeStatus==-1}"></i>
							 <label  @click="like(item)">
								 {{item.likeCount == 0 ? '喜欢' : item.likeCount}}
							 </label>
						</span>
					</div>
			</div>
			<div class="nodata" v-show="noData">
				<img src="../../assets/images/nodata.svg" />
				<p>暂时没有动态哦~</p>
			</div>
		</div>
		<Navmenu></Navmenu>
	</div>
</template>

<script>
import Navmenu from '@/components/navmenu';
import { mapGetters } from 'vuex';

export default{
	name:"Petshow",
	components:{
	    Navmenu
	},
	data(){
		return{
			likeList: [],
			actTabList:{
				list:{
					1:{
						name:'热门',
						value: 1,
						check: true,
					},
					2:{
						name:'广场',
						value: 2,
					},
					3:{
						name:'关注',
						value: 3,
					}
				}
			},
			petshowlist:[],
			noData: false,
		}
	},
	computed:{
		...mapGetters([
			'id',
		])
	},
	mounted(){
		const vm = this;
		vm._type = vm.$route.params.type;
		vm.getLikeList();
	},
	methods:{
		like(obj) {
			const vm = this;
			const ObjId = {
				likeStatus: obj.likeStatus,
				likeTypeId: obj.id
			};
			if(obj.likeStatus==1) {
				const url =vm.urls.updateLike;
				const data = {
					likeStatus: 0,
					likeType: 1,
					likeTypeId: obj.id,
					likeUserId: vm.id,
				}
				const callback = (r) => {
					obj.likeStatus = 0;
					obj.likeCount--;
					let idx;
					vm.likeList.forEach((item,index) => {
						if(item.likeTypeId == obj.id) idx = index;
					})
					vm.likeList[idx].likeStatus = 0;
				}
				vm.utils.postData(url, data, callback);

			}else{
				let idx;
				vm.likeList.forEach((item,index) => {
					if(item.likeTypeId == obj.id) {
						idx = index;
					} else {
						idx = -1;
					}
				})
				const url = idx < 0 ? vm.urls.addLike : vm.urls.updateLike;
				const data = {
					likeTypeId: obj.id,
					likeType: 1,
					likeUserId: vm.id,
					likeStatus: 1,
				};
				const callback = (r) => {
					obj.likeStatus = 1;
					obj.likeCount++;
					if(idx > 0) {
						vm.likeList[idx].likeStatus = 1;
					} else {
						vm.likeList.push({
							likeTypeId: obj.id,
							likeStatus: 1,
						});
					}
				}
				vm.utils.postData(url, data, callback);
			}
		},
		getLikeList(){
			const vm = this;
			const url = vm.urls.getUserLikeList;
			const data = {
				type: 1,
				userId: Number(vm.id),
			}
			const options = {
				params: {
					type: 1,
				}
			}
			const callback = (r) => {
				vm.likeList = r.data.data.data;
				vm.changeToTab(vm._type);
			}
			vm.utils.postData(url, data, callback, options);
		},
		changeToTab(val){
			const vm = this;
			const value = parseInt(val);
			$.each(vm.actTabList.list, function(index,item){
				item.check = false;
				if(index == value){
					item.check = true;
				}
			})
			location.href = location.hash.substring(0,15) + value;
			vm.getList(value);
			console.log(vm.likeList);
		},
		getList(val) {
			const vm = this;
			let url;
			let data = {};
			vm.noData = false;
			vm.$indicator.open({
			  spinnerType: 'fading-circle'
			});
			const callback = (r) => {
				vm.$indicator.close();
				let data = r.data.data.data;
				data.forEach((item) => {
					if(item.userAvatar) {
							item.userAvatar = JSON.parse(item.userAvatar);
					}
					item.createTime = vm.utils.changeDate(item.createTime, "yyyy年MM月dd日 hh:mm");
					item.petAvatar = JSON.parse(item.petAvatar);
					const index = item.content.indexOf('#');
					if(index === 0) {
						item.contentTitle = `#${item.content.split('#')[1]}#`;
						item.contentNote = item.content.split('#')[2]
					} else {
						item.contentNote = item.content;
					}
					item.likeStatus = -1; // 先设置全部为0
				});
				vm.likeList.forEach((item)=> {
					data.forEach((obj)=>{
							if(obj.id == item.likeTypeId) obj.likeStatus = item.likeStatus;
					})
				})
				vm.petshowlist = data;
				console.log(data);
				if(data.length == 0) vm.noData = true;
			};
			if (val == 3) {
				url = vm.urls.followersPetshowList;
				data = {
					id: vm.id,
				}
				vm.utils.postData(url, data, callback);
			} else {
				url = val == 1? vm.urls.getPetshowListTop : vm.urls.getPetshowList;
				vm.utils.getData(url, callback);
			}
		},
	}
}
</script>

<style lang="less" scoped>
#Petshow{
	.nodata{
		text-align: center;
		margin-top: 50%;
		p{
			margin-top: 20px;
			color: #999999;
		}
	}
	.tab-list{
		background: #eb695c;
		position: fixed;
		top:0px;
		width: 100%;
		height:90px;
		line-height: 90px;
		border-bottom: 1px solid #e4e4e4;/*no*/
		text-align: center;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
		.camera{
			// margin-right: -20px
			margin-top: 20px;
			.icon-shangchuantupian_l{
				color: #fff;
				font-size: 46px;
			}
		}
		.tab-list-span{
			display: inline-block;
			height: 55px;
			line-height: 55px;
			vertical-align: middle;
			border: 3px solid #ffffff;
			border-radius: 10px;
			text-align: center;
			overflow: hidden;
			margin-left: 50px;
			span{
				display: inline-block;
				// padding:0 30px;
				// border-right: 1px solid #E4E4E4;/*no*/
				text-align: center;
				height: inherit;
				line-height: inherit;
				.tab-name{
					display: inline-block;
					position: relative;
					height: 49px;
					color: #ffffff;
					font-size: 24px;
					padding: 0 15px;
					font-weight: bold;
				}
				input[type=radio]{
					position: absolute;
					opacity: 0;
					z-index: 100;
					&:checked+.tab-name{
						background: #ffffff;
						color: #EB695C;
						border-radius: 10px
					}
				}
			}
		}

	}
	.contain{
		margin: 90px 0;
	}
	.detail-wrap{
		background: #ffffff;
		margin-bottom: 20px;
		.detail-title{
			padding: 20px;
			border-bottom:1px solid #e4e4e4; /*no*/
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
						width: 80px;
						height: 80px;
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
		.detail-notes{
			max-height: 105px;
			margin-bottom: 10px;
			font-size: 28px;
			line-height: 36px;
			/* 多行文本溢出利用省略号代替,仅用于webkit内核 $line 行数*/
			overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			margin: 10px 0 25px;
			color: #333333;
			padding: 0 20px;
		}
		.detail-pic{
			// margin-bottom: 20px;
			padding: 20px;
			img{
				display: inline-block;
				width: 200px;
				height: 200px;
				border-radius: 10px;
			}
		}
		.detail-footer {
			display: flex;
			align-items: center;
			color: #999999;
			text-align: center;
			border-top: 1px solid #e4e4e4; /*no*/
			font-size: 20px;
			span{
				padding: 25px 0 15px;
				flex:1;
				height: inherit;
				.iconfont{
					display: inline-block;
					font-size: 38px;
					&.icon-shoucang2{
						color: red;
					}
				}
				label {
					font-size: 30px;
				}
			}
			span:first-child{
				border-right: 1px solid #e4e4e4;
			}
		}
	}
}
.yd-lightbox-foot{
	h1 {
		font-size: .45rem;
		font-weight: bold;
		color: #00c3f5;
		margin-bottom: 20px;
	}
	.content{
		font-size: .4rem;
		line-height: .4rem;
	}
}
</style>
