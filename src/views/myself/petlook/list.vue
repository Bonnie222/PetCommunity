<template>
	<div id="Mylook-list">
		<Header title="我的寻宠/主列表" :headerLeft="headerLeft"
			:fixed="isFixed" @clickRouter="back" ></Header>
		<ul id="lookListTab" class="tab-list">
			<li v-for="(item, index) in lookTabList.list" >
				<label>
					<input type="radio" name="topTabList" :value="item.value"
						:checked="item.check" @click="changeToTab(item.value)"/>
					<span class="tab-name">
						{{item.name}}
					</span>
				</label>
			</li>
		</ul>
		<div class="content-wrap">
			<ul class="content-list" v-if="len !=0">
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
				<p>暂时没有数据哦~</p>
			</div>
		</div>


	</div>
</template>

<script>
import Header from '@/components/header';
import { mapGetters } from 'vuex';

export default{
	name:'Mylook-list',
	components:{
	    Header
	},
	data(){
		return{
			isFixed:true,
			headerLeft:true,
			_userId:'',
			lookTabList:{
				list:{
					1:{
						name:'全部',
						value: 0,
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
			len:1,
			lookList:[]
		}
	},
	computed:{
		...mapGetters([
			'id',
		])
	},
	created(){
		let vm = this;
		vm._userId = vm.id;
		vm._type = vm.$route.params.type;
		vm.changeToTab(vm._type);
	},
	methods:{
		back:function(){
			this.$router.replace('/myself');
		},
		changeToTab: function(val){
			let vm = this;
			let value = parseInt(val);
			$.each(vm.lookTabList.list, function(index,item){
				item.check = false;
				if(index == (value+1)){
					item.check = true;
				}
			})
			location.href = location.hash.substring(0,19) + value;
			vm.getList(value);
		},
		getList: function(value){
			let vm = this;
			let url = value == 0 ? vm.urls.getMyLookList : vm.urls.getMyLookListByStatus;
			let data = {
				userId : vm._userId
			}
			if(value == 1){
				data.findStatus = 1;
			}else if(value == 2){
				data.findStatus = 2;
			}

			let callback = function(r){
				let data = r.data.data;
				vm.len = data.length;
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

	}
}
</script>

<style lang="less" scoped>
#Mylook-list{
	.tab-list{
		background: #FFFFFF;
		display: flex;
		padding: 20px 0;
		position: fixed;
		top:90px;
		width: 100%;
		border-bottom: 1px solid #E4E4E4;/*no*/
		li{
			padding:0 30px;
			flex: 1;
			border-right: 1px solid #E4E4E4;/*no*/
			&:last-child{
				border-right: none;
			}
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
		padding-top: 180px;
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
					  font-size: 30px;
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
