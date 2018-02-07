<template>
	<div id="ActivityList">
		<Header :title="topTitle" :headerLeft="headerLeft" @clickRouter="back"></Header>
		<ul class="tab-list">
			<li v-for="(item, index) in actTabList.list" >
				<label>
					<input type="radio" name="topTabList" :value="item.value" :checked="item.check" @click="changeToTab(item.value)"/>
					<span class="tab-name">
						{{item.name}}
					</span>
				</label>
			</li>
		</ul>
		<div v-if="actTabList.list[1].check" class="tab1">
			<div class="detail-item" v-for="item in listOne">
				<router-link to="">
					<div class="title">
						<span class="name">#{{item.actTitle}}#</span>
						<span class="status">{{item.status == true? '已结束':'进行中'}}</span>
					</div> 
					<div class="wrap">
						<span class="picTure">
							<img :src="item.themePhoto.fileUrl" />
						</span>
						<span class="desc">
							<span class="deadline">{{item.startTime}}~{{item.endTime}}</span>
							<span class="notes">{{item.notes}}</span>
							<span class="number">已有<label>{{item.peopleNum}}</label>人参与</span>
						</span>
					</div>
				</router-link>
			</div>
		</div>
		<div v-else-if="actTabList.list[2].check">2</div>
		<div v-else>3</div>
	</div>
</template>

<script>
import Header from '@/components/header';
export default{
	name:'ActivityList',
	components:{
		Header,
	},
	data(){
		return{
			headerLeft:true,
			topTitle:'线上活动',
			actTabList:{
				list:{
					1:{
						name:'线上活动',
						value: 0,
						check:true
					},
					2:{
						name:'官方活动',
						value: 1,
					},
					3:{
						name:'宠友自发',
						value: 2,
					}
				}
			},
			listOne:[],
		}
	},
	created(){
		this.getList(0);
	},
	methods:{
		back:function(){
			this.$router.go(-1);
		},
		changeToTab: function(value){
			$.each(this.actTabList.list, function(index,item){
				item.check = false;
				if(index == (value+1)){
					item.check = true;
				}
			})
			if(value != 0){
				this.topTitle = value == 1 ? '官方活动':'宠友自发';
			}else{
				this.topTitle = '线上活动';
			}
			this.getList(value);
		},
		getList: function(value){
			var vm = this;
			var url = vm.urls.getActivityList;
			var data = {
				actType: value+1
			}
			
			var options = {
				params: data
			}
			
			var callback = function(r){
				var data = r.data.data;
				$.each(data,function(index,item){
					item.status = vm.utils.completeTime(vm.utils.getNowTime(), item.endTime);
					item.startTime = vm.utils.changeDate(item.startTime, 'yyyy.MM.dd');
					item.endTime = vm.utils.changeDate(item.endTime, 'yyyy.MM.dd');
					item.themePhoto = JSON.parse(item.themePhoto);
					
				})
				if(value == 0){
					vm.listOne = data;
				}
			}
			
			vm.utils.postData(url, data, callback, options)
		}
	}
}
</script>

<style lang="less" scoped>
#ActivityList{
	.tab-list{
		background: #FFFFFF;
		display: flex;
		padding: 20px 0;
		margin-bottom: 20px;
		li{
			padding:0 30px;
			flex: 1;
			border-right: 1px solid #E4E4E4;/*no*/
			
			text-align: center;
			.tab-name{
				position: relative;	
				color: #999999;
				font-size: 30px;
				padding: 0 30px 14px;
			}
			input[type=radio]{
				position: absolute;
				opacity: 0;
				z-index: 100;
				&:checked+.tab-name{
					color: #EB695C;
					border-bottom: 3px solid #EB695C;/*no*/
				}
			}
		}
	}
	.tab1{
		.detail-item{
			background: #FFFFFF;
			margin: 20px 15px;
			border-radius: 10px;
			.title{
				padding: 15px;
				border-bottom: 1px solid #E4E4E4; /*no*/
				display: flex;
				justify-content: space-between;
				align-items: center;
				.name{
					font-size:30px;
					color: #333333;
				}
				.status{
					font-size: 22px;
					color: #999999;
				}
			}
			.wrap{
				padding: 15px;
				display: flex;
				align-items:center;
				.picTure{
					display: inline-block;
					width: 160px;
					height: 140px;
					background: yellow;
					margin-right:20px;
					img{
						width: inherit;
						height: inherit;
					}
				}
				.desc{
					display: flex;
					flex-direction: column;
					.deadline{
						color: #D81E06;
						font-size: 22px;
						padding: 15px 0;
					}
					.notes{
						color: #333333;
						font-size: 24px;
						line-height: 36px;
						/* 多行文本溢出利用省略号代替,仅用于webkit内核 $line 行数*/
					    overflow : hidden;
					    text-overflow: ellipsis;
					    display: -webkit-box;
					    -webkit-box-orient: vertical;
					    -webkit-line-clamp: 2;
					}
					.number{
						padding: 10px 0;
						color: #999999;
						font-size: 22px;
						label{
							color: #D81E06;
						}
					}
				}
			}
		}
	}
}
</style>