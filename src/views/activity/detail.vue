<template>
	<div id="ActivityDetail">
		<Header :title="topTitle" :headerLeft="headerLeft"
			:fixed="isFixed" @clickRouter="back"></Header>
		<div v-if="_type==1" class="detailOne">
			<div class="title">
				<img :src="detailOne.photo" class="imgbg"/>
				<img :src="detailOne.photo" class="blur"/>
				<div class="info-wrap">
					<span class="photo">
						<img :src="detailOne.photo" />
					</span>
					<span class="info">
						<span class="name">#{{detailOne.actTitle}}#</span>
						<span class="publish">发布者: {{detailOne.publisher}}</span>
						<span class="number">{{detailOne.peopleNum}}参与</span>
					</span>
				</div>
			</div>
			<div class="wrap">
				<div class="wrap-note" v-html="detailOne.notes"></div>
				<div class="wrap-desc">
					<div class="desc-item">
						<label>【活动时间】</label>
						<span>{{detailOne.startTime}} - {{detailOne.endTime}}</span>
					</div>
					<div class="desc-item">
						<label>【参与方式】</label>
						<span>{{detailOne.participateWay}}</span>
					</div>
					<div class="desc-item">
						<label>【评奖规则】</label>
						<span>{{detailOne.rules}}</span>
					</div>
					<div class="desc-item">
						<label>【奖励内容】</label>
						<span v-html="detailOne.awards"></span>
					</div>
				</div>
			</div>
			<div class="link-btn">
				<router-link :to="{path:'/petshow/edit', query:{actId:detailOne.id, actTitle:detailOne.actTitle}}">
					<span>我要参与</span>
				</router-link>
			</div>
		</div>
		<div v-else-if="_type!=1" class="detailTwo">
			<div class="info-wrap">
				<div class="first-wrap">
					<span class="picTure">
						<img :src="detailOne.photo"/>
					</span>
					<span class="title">{{detailOne.actTitle}}</span>
					<span class="deadline">
						{{detailOne.startTime}} - {{detailOne.endTime}}
					</span>
				</div>
				<div class="second-wrap">
					<span class="cost">
						<i class="iconfont icon-qian1"></i>
						{{detailOne.cost}}
					</span>
					<span class="number">{{detailOne.peopleNum}}人报名</span>
				</div>
			</div>
			<div class="address">
				<i class="iconfont icon-didian"></i>
				{{detailOne.address}}
			</div>
			<div class="desc-wrap">
				<span class="publisher">
					<span class=""><i class="iconfont icon-ren"></i>发起人</span>
					<span class="namePic"></span>
				</span>
				<span class="note">
					<p>活动内容</p>
					<span v-html="detailOne.notes"></span>
				</span>
			</div>
			<div class="link-btn" :class="{'click':status == false || isAppy == true
				|| (status==true && detailOne.actNum == detailOne.peopleNum)}">
				<span v-if="status==false || isAppy == true">
					{{ status==true && isAppy == true ? '已报名' : '已结束'}}
				</span>
				<span v-else-if="status==true && detailOne.actNum == detailOne.peopleNum">
					报名已满
				</span>
				<span v-else>
					<router-link :to="{ path: '/activity/sign', query: {actId:detailOne.id, actTitle:detailOne.actTitle}}">
						我要报名</router-link>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';
import { mapGetters } from 'vuex';

export default{
	name:'ActivityDetail',
	components:{
		Header,
	},
	data(){
		return{
			isFixed:true,
			headerLeft:true,
			topTitle:'',
			status:null,
			detailOne:{},
			detailTwo:{},
			_type:'',
			_id:'',
			isAppy: false,
			isSaving: false,
		}
	},
	computed:{
		...mapGetters([
			'id',
		])
	},
	created(){
		var vm = this;
		vm._type = vm.$route.params.type;
		vm.topTitle = vm._type == 1 ? '线上活动' : '活动详情';
		vm._id = vm.$route.params.id;
		vm.getDetail(vm._id);
	},
	mounted() {
		var vm = this;
		vm.getIsApply();
	},
	methods:{
		back() {
			this.$router.go(-1);
		},
		getIsApply() {
			const vm = this;
			const url =  vm.urls.isApply;
			const data = {
				actId: vm._id,
				userId: vm.id,
			}
			const callback = (r) => {
				const data = r.data.data;
				if (JSON.stringify(data) != "{}") vm.isAppy = true;
			};
			vm.utils.postData(url, data, callback);
		},
		getDetail(id){
			var vm = this;
			var url = vm.urls.getActivityDetail;
			var data = {
				id: id
			}
			var options = {
				params: data
			}

			var callback = (r) => {
				var dt = r.data.data;
				dt.photo = JSON.parse(dt.themePhoto).fileUrl;
				vm.status = vm.utils.completeTime(vm.utils.getNowTime(), dt.endTime);
				if(vm._type == 1){
					dt.startTime = vm.utils.changeDate(dt.startTime, 'yyyy年MM月dd日');
					dt.endTime = vm.utils.changeDate(dt.endTime, 'yyyy年MM月dd日');
				}else{
					dt.startTime = vm.utils.changeDate(dt.startTime, 'yyyy-MM-dd hh:mm');
					dt.endTime = vm.utils.changeDate(dt.endTime, 'yyyy-MM-dd hh:mm');
				}
				vm.detailOne = dt;
			}
			vm.utils.postData(url, data, callback, options);
		},
	}
}
</script>

<style lang="less" scoped>
#ActivityDetail{
	.iconfont{
		margin-right: 10px;
		color: red;
		font-size: 26px;
	}
	.detailOne{
		padding-top: 90px;
		.title{
			background: #FFFFFF;
			height: 230px;
			width: 100%;
			position: relative;
			.imgbg{
				width: inherit;
				height: inherit;
			}
			.blur{
				position: absolute;
				top:0;
				width: inherit;
				height: inherit;
				filter: blur(6px);
				-webkit-filter: blur(6px);  /* chrome, opera */
				-ms-filter: blur(6px);
				-moz-filter: blur(6px);
			}
			.info-wrap{
				position: absolute;
				top:0;
				/*background: yellow;*/
				margin: 35px 25px;
				color:#FFFFFF;
				display: flex;
				align-items: center;
				.photo{
					display:inline-block;
					width:210px;
					height: 160px;
					margin-right: 20px;
					border:1px solid #FFFFFF;/*no*/
					overflow:hidden;
					img{
						width: inherit;
						height: inherit;
					}
				}
				.info{
					display: flex;
					flex-direction: column;
					.name{
						font-size: 30px;
						margin-bottom: 20px;
					}
					.publish{
						font-size: 26px;
						margin-bottom: 20px;
					}
					.number{
						font-size: 24px;
					}
				}
			}
		}
		.wrap{
			background: #FFFFFF;
			padding: 20px;
			line-height: 46px;
			color: #666666;
			font-size: 28px;
			margin-bottom: 90px;
			.wrap-desc{
				margin-top:20px;
				.desc-item{
					display: flex;
					margin-bottom: 10px;
					label{
						display: block;
						color: red;
						vertical-align: top;
						flex: 1;
					}
					span{
						flex: 3;
						color: #333333;
					}
				}
			}
		}
	}
	.detailTwo{
		padding-top: 90px;
		margin-bottom: 100px;
		.info-wrap{
			background: #FFFFFF;
			padding: 20px 30px;
			text-align: center;
			margin-bottom: 20px;
			border-bottom: 1px solid #E4E4E4;/*no*/
			.first-wrap{
				border-bottom: 1px solid #E4E4E4;/*no*/
				.picTure{
					display: block;
					width: 100%;
					height: 350px;
					margin-bottom: 20px;
					img{
						width: inherit;
						height: inherit;
					}
				}
				.title{
					display: block;
					font-size: 30px;
					margin-bottom: 15px;
				}
				.deadline{
					display: block;
					font-size: 24px;
					color: #666666;
					margin-bottom: 20px;
				}
			}
			.second-wrap{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20px 0 0;
				font-size: 26px;
				color: #666666;
			}
		}
		.address{
			background: #FFFFFF;
			padding: 30px 30px;
			font-size: 26px;
			color: #666666;
			margin-bottom: 20px;
			border-top: 1px solid #E4E4E4;/*no*/
			border-bottom: 1px solid #E4E4E4;/*no*/
		}
		.desc-wrap{
			background: #FFFFFF;
			padding: 20px 30px;
			border-top: 1px solid #E4E4E4;/*no*/
			border-bottom: 1px solid #E4E4E4;/*no*/
			.publisher{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px 0 20px;
				border-bottom: 1px solid #E4E4E4;/*no*/
				color: #666666;
			}
			.note{
				line-height: 42px;
				font-size: 26px;
				color: #333333;
				p{
					font-size: 28px;
					padding: 20px 0;
				}
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
		font-size: 28px;
	}
	.click{
		background: #CCCCCC;
		color: #FFFFFF;
	}
}
</style>
