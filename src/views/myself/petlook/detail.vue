<template>
	<div id="Mylook-detail">
		<Header :title="topTitle" :headerLeft="headerLeft" :fixed="isFixed"
			@clickRouter="back"></Header>
		<div class="detail-wrap">
			<div class="detail-list">
				<div class="detail-item" v-for="(item,prop) in detail">
					<span class="item-label">{{item.label}}</span>
					<span class="item-text" v-if="prop == 'loacation'" v-html="item.val"></span>
					<span class="item-text" v-else-if="prop == 'findStatus'">
						{{status == 1 ? '进行中':'已结束'}}
					</span>
					<span class="item-text" v-else>{{item.val}}</span>
				</div>
				<div class="detail-area">
					<span class="item-label">备注</span>
					<div class="item-area" v-html="detailNotes"></div>
				</div>
				<div class="detail-area">
					<span class="item-label">图片</span>
					<div class="item-pic">
						<yd-lightbox :num="detailPic.length">
			        <yd-lightbox-img v-for="pic, index in detailPic"
							:key="index" :src="pic.fileUrl"></yd-lightbox-img>
			    	</yd-lightbox>
					</div>
				</div>
			</div>
		</div>
		<div class="btn-wrap">
			<button class="btn-save" @click="changeStatus" :class="{'click':status == 2}">更改状态</button>
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';
export default{
	name:'Mylook-detail',
	components:{
	    Header
	},
	data(){
		return{
			list: [
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s1.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s2.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s3.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s4.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s5.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s6.jpg'}
      ],
			isFixed:true,
			headerLeft:true,
			lookid:'',
			topTitle:'',
			status:null,
			detail:{
				isFindPet:{
					label:'类型'
				},
				dateTime:{
					label:'时间'
				},
				loacation:{
					label:'地点'
				},
				petType:{
					label:'品种'
				},
				petSex:{
					label:'性别'
				},
				findStatus:{
					label:'状态'
				}
			},
			detailPic:[],
			detailNotes:'',
		}
	},
	created(){
		let vm = this;
		vm.lookid = vm.$route.params.id;
		vm.getDetail();
	},
	methods:{
		back:function(){
			this.$router.go(-1);
		},
		getDetail: function(){
			let vm = this;
			let url = vm.urls.getMyLookDetail;
			let data = {
				id : vm.lookid
			}
			let options = {
				params:data
			}
			let callback = function(r){
				let item = r.data.data[0];
				vm.topTitle = item.isFindPet == 1 ? '寻宠详情':'寻主详情';
				vm.status = item.findStatus;
				item.createTime = vm.utils.changeDate(item.createTime);
				item.dateTime = vm.utils.changeDate(item.dateTime);
				item.petType = vm.config.petTypeList[item.petType];
				item.petAge = vm.config.petAgeList[item.petAge];
				item.petSex = vm.config.petSexList[item.petSex];
				item.isFindPet = vm.config.findPetType[item.isFindPet];
				item.findStatus = vm.config.lookStatus[item.findStatus];
				item.loacation = item.region+'<br/>'+ item.address;
				vm.detailPic = JSON.parse(item.petAvatar);
				vm.detailNotes = item.note;
				$.each(vm.detail, function(prop, data) {
					data.val = item[prop];
				});
			}
			vm.utils.postData(url, data, callback, options);
		},
		changeStatus: function(){
			let vm = this;
			if(vm.status == 2) return;
			vm.utils.confirmCallback(vm, '是否更改状态为已结束？确定后不能再更改',function(){
				let url = vm.urls.updateMyLookStatus;
				let data = {
					id:vm.lookid
				}
				let callback = function(){
					vm.status = 2;
				}
				vm.utils.postData(url, data, callback);
			})
		}
	}
}
</script>

<style lang="less" scoped>
#Mylook-detail{
	.detail-wrap{
		padding-top:90px ;
	}
	.detail-list{
		background:#FFFFFF;
		padding:0 25px;
		font-size: 30px;
		.detail-item{
			border-bottom: 1px solid #e4e4e4; /*no*/
			padding: 30px 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			line-height: 36px;
			.item-text{
			  text-align: right;
			  color:#333333;
			}
		}
		.detail-area{
			border-bottom: 1px solid #e4e4e4; /*no*/
			padding: 30px 0;
			display: flex;
			flex-direction: column;
			.item-area{
			  margin-top: 20px;
			  border: 1px solid #e4e4e4;/*no*/
			  width: 100%;
			  min-height: 200px;
			  padding: 10px;
			  font-size: 28px;
			  color: #333333;
			  line-height: 36px;
			}
			img{
				display: inline-block;
				width: 110px;
				height: 110px;
				margin-right:15px;
				border-radius: 20px;
				overflow:hidden;
				margin-top: 10px;
				&:last-child{
					margin: 0;
				}
			}
		}
		.item-label{
		  display: inline-block;
		  color: #999999;
		}
	}
	.btn-wrap{
		margin: 20px;
		text-align: center;
		.btn-save{
			width: 200px;
			height: 75px;
			font-size: 28px;
		}
		.click{
			background: #CCCCCC;
			border: none;
		}
	}
}
</style>
