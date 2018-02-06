<template>
	<div id="Mylook-list">
		<Header title="我的寻宠/主列表" :headerLeft="headerLeft" @clickRouter="back"></Header>
		<ul id="lookListTab" class="tab-list">
			<li v-for="(item, index) in lookTabList.list" >
				<label>
					<input type="radio" name="topTabList" :value="item.value" :checked="item.check" @click="changeToTab(item.value)"/>
					<span class="tab-name">
						{{item.name}}
					</span>
				</label>
			</li>
		</ul>
		<div class="content-wrap">
			<ul class="content-list" v-if="lookList.length !=0">
				<router-link :to="item.href" v-for="item in lookList" :key="item.id">
					<li>
					 	<span class="item-title">
				         	<span>{{item.createTime}}</span>
				         	<span>{{item.isFindPet == 1 ? '寻宠':'寻主'}}</span>
				      	</span>
				      	<span class="item-wrap">
				      		<span class='opinion-text'>品种：{{item.petTypeText}}</span>
				         	<span class='opinion-text'>地点：{{item.address}}</span>
				         	<span class='opinion-text'>时间：{{item.dateTime}}</span>
				         	<span class='opinion-text'>状态：{{item.findStatus}}</span>
				      	</span>
					</li>
				</router-link>
			</ul>
			<div class="nodata" v-else>
				<img src="../../../assets/images/no-data.png" />
				<p>oh no!暂时没有数据哦~</p>
			</div>
		</div>
		
		
	</div>
</template>

<script>
import Header from '@/components/header';
export default{
	name:'Mylook-list',
	components:{
	    Header
	},
	data(){              
		return{
			headerLeft:true,
			_userId:'',
			lookTabList:{
				list:{
					1:{
						name:'全部',
						value: 0,
						check:true
					},
					2:{
						name:'进行中',
						value: 1,
					},
					3:{
						name:'已结束',
						value: 2,
					}
				}
			},
			lookList:[]
		}
	},
	created(){
		this._userId = JSON.parse(window.sessionStorage.userInfo).id;
		this.getList(0);
	},
	methods:{
		back:function(){
			this.$router.replace('/myself');
		},
		getList: function(value){
			var vm = this;
			var url = value == 0 ? vm.urls.getMyLookList : vm.urls.getMyLookListByStatus;
			var data = {
				userId : vm._userId
			}
			if(value == 1){
				data.findStatus = 1;
			}else if(value == 2){
				data.findStatus = 2;
			}
			
			var callback = function(r){
				var data = r.data.data;
				$.each(data, function(index, item){
					item.createTime = vm.utils.changeDate(item.createTime);
					item.dateTime = vm.utils.changeDate(item.dateTime);
					item.petTypeText = vm.config.petTypeList[item.petType];
					item.findStatus = vm.config.lookStatus[item.findStatus];
					item.href = "/myself/look/detail/" + item.id;
				})
				vm.lookList = data;
			}
			vm.utils.postData(url, data, callback);
		},
		changeToTab: function(value){
			$.each(this.lookTabList.list, function(index,item){
				item.check = false;
				if(index == (value+1)){
					item.check = true;
				}
			})
			this.getList(value);
		}
	}
}
</script>

<style lang="less" scoped>
#Mylook-list{
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
	.content-wrap{
		.nodata{
			text-align: center;
			margin-top: 50%;
			p{
				margin-top: 20px;
				color: #999999;
			}
		}
		.content-list{
			li{
			  display: block;
			  background: #ffffff;
			  padding:0 25px;
			  /*height: 336rpx;
			  margin-top: 20rpx;*/
		 	  margin-bottom: 10px;
				 .item-title{
				  display: flex;
				  justify-content: space-between;
				  height: 80px;
				  line-height: 80px;
				  color: #999999;
				  font-size: 28px;
				  border-bottom: 1px solid #e4e4e4;  /*no*/
				}
				.item-wrap{
				  display: flex;
				  display: -webkit-flex; /* Safari */
				 /* height: 256rpx;*/
				  flex-direction: column;
				  padding: 20px 0px;
				 	.opinion-text{
					  font-size: 32px;
					  margin-bottom: 20px;
					}
					.opinion-text:last-child{
					  margin-bottom: 0;
					}
				}
			}
		}
	}
}
</style>