<template>
	<div id="ActivityDetail">
		<Header title="活动详情" :headerLeft="headerLeft"
			:fixed="isFixed" @clickRouter="back"></Header>
		<div class="detailTwo">
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
			<div class="address-wrap">
				<div class="address-item">
          <i class="iconfont icon-didian"></i>
  				{{detailOne.address}}
        </div>
				<router-link :to="{ name: 'MyactRegisnList', params: {id: detailOne.id}}"
          class="address-item">
          <i class="iconfont icon-ren2"></i>
  				报名名单
          <i class="icon-right">
						<img src="../../../assets/images/right.svg" />
					</i>
        </router-link>
			</div>
			<div class="desc-wrap">
				<span class="publisher">
					<span class=""><i class="iconfont icon-huodong11"></i>活动内容</span>
				</span>
				<span class="note">
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
				<span v-else @click="goApply">我要报名</span>
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
	mounted() {
		const vm = this;
		vm._id = vm.$route.params.id;
		vm.getDetail(vm._id);
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
				if (data.length !== 0) vm.isAppy = true;
			};
			vm.utils.postData(url, data, callback);
		},
		goApply(){
			const vm = this;
			const url =  vm.urls.apply;
			const data = {
				actId: vm._id,
				userId: vm.id,
			}
			vm.isSaving = true;
			const callback = (r) => {
				const dt = {
					actId: vm._id
				}
				vm.utils.postData(vm.urls.updateTotal, dt);
				vm.$dialog.toast({
					mes: '报名成功',
						icon: 'success',
						timeout: 1000
				});
				vm.isSaving = false;
				vm.isAppy = true;
				vm.detailOne.peopleNum = vm.detailOne.peopleNum + 1;
			};
			const tips = '是否确认报名？报名后不许取消';
			vm.utils.confirmCallback(vm, tips, ()=>{
				vm.utils.postData(url, data, callback);
			});
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
				var dt = r.data.data[0];
				dt.photo = JSON.parse(dt.themePhoto).fileUrl;
				vm.status = vm.utils.completeTime(vm.utils.getNowTime(), dt.endTime);
				dt.startTime = vm.utils.changeDate(dt.startTime, 'yyyy-MM-dd hh:mm');
				dt.endTime = vm.utils.changeDate(dt.endTime, 'yyyy-MM-dd hh:mm');
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
		.address-wrap{
			background: #FFFFFF;
			font-size: 26px;
			color: #666666;
			margin-bottom: 20px;
      padding: 0px 30px;
			border-top: 1px solid #E4E4E4;/*no*/
			border-bottom: 1px solid #E4E4E4;/*no*/
      .address-item {
        display: block;
        padding: 30px 0px;
        border-bottom: 1px solid #E4E4E4;/*no*/
        &:last-child {
          border-bottom: 0px;
        }
        .icon-right{
          float: right;
					display: inline-block;
					width: 15px;
					height: 26px;
					img{
						width: 15px;
						height: 26px;
					}
				}
      }
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
