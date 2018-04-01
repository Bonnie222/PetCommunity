<template>
	<div id="ActivityList">
		<Header :title="topTitle" :headerLeft="headerLeft"
			:fixed="isFixed" @clickRouter="back"></Header>
		<ul class="tab-list">
			<li v-for="(item, index) in actTabList.list" >
				<label>
					<input type="radio" name="topTabList" :value="item.value"
						:checked="item.check" @click="changeToTab(item.value)"/>
					<span class="tab-name">
						{{item.name}}
					</span>
				</label>
			</li>
		</ul>
		<div v-if="actTabList.list[0].check" class="tab1">
			<div class="detail-item" v-for="item in listOne">
				<router-link :to="{name:'ActivityDetail',
					params:{type: item.actType, id:item.id}}">
					<div class="title">
						<span class="name">{{item.actTitle}}</span>
						<span class="status">
							{{item.status == false? '已结束':'进行中'}}
						</span>
					</div>
					<div class="wrap">
						<span class="picTure">
							<img :src="item.themePhoto.fileUrl" />
						</span>
						<span class="desc">
							<span class="deadline">
								<i class="iconfont icon-59"></i>
								<label>{{item.startTime}}~{{item.endTime}}</label>
							</span>
              <span class="address">
								<i class="iconfont icon-didian"></i>
								{{item.address}}
							</span>
							<span class="number">
								<i class="iconfont icon-ren"></i>已有
								<label>{{item.peopleNum}}</label>人报名
							</span>
						</span>
					</div>
				</router-link>
			</div>
			<div class="nodata" v-show="noData">
				<img src="../../../assets/images/nodata.svg" />
				<p>暂时没有数据哦~</p>
			</div>
		</div>
		<div v-else class="tab2">
			<div class="detail-item" v-for="item in listTwo">
				<router-link :to="{ name: 'MyactivityDetail', params: {id: item.id} }">
					<div class="photo">
						<span class="picTure">
							<img :src="item.themePhoto.fileUrl" />
						</span>
						<span class="status"></span>
					</div>
					<div class="desc">
						<span class="title">{{item.actTitle}}</span>
						<span class="deadline">
							<i class="iconfont icon-59"></i>
							{{item.startTime}} - {{item.endTime}}
						</span>
						<span class="info">
							<span class="address">
								<i class="iconfont icon-didian"></i>
								{{item.address}}
							</span>
							<span class="number">
								<i class="iconfont icon-ren"></i>
								<label>{{item.peopleNum}}</label>人报名
							</span>
						</span>
					</div>
				</router-link>
			</div>
			<div class="nodata" v-show="noData">
				<img src="../../../assets/images/nodata.svg" />
				<p>暂时没有数据哦~</p>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';
import { mapGetters } from 'vuex';

export default{
	name:'ActivityList',
	components:{
		Header,
	},
	data(){
		return{
			noData: false,
			isFixed:true,
			headerLeft:true,
			topTitle:'我的活动',
			_type:null,
			actTabList:{
				list:{
					0:{
						name:'我参与的',
						value: 0,
					},
					1:{
						name:'我发布的',
						value: 1,
					}
				}
			},
			listOne:[],
			listTwo:[],
		}
	},
  computed:{
		...mapGetters([
			'id',
		])
	},
	created(){
		let vm = this;
		vm._type = vm.$route.params.type;
		vm.changeToTab(vm._type);
	},
	methods:{
		back() {
			this.$router.replace('/myself');
		},
		changeToTab(val) {
      const vm = this;
			const value = parseInt(val);
			$.each(this.actTabList.list, function(index,item){
				item.check = false;
				if(index == value){
					item.check = true;
				}
			})
			location.href = location.hash.substring(0,23) + value;
			vm.noData = false;
			if ( value == 0) {
        vm.listTwo = [];
        vm.getList(value);
      } else {
        vm.listOne = [];
        vm.getList(value);
      }
		},
		getList(value) {
			 const vm = this;
			 const url = value == 0 ? vm.urls.getMyActJoinList : vm.urls.getMyActPublList;
			 const data = {
         userId: vm.id,
       };
 			 vm.$indicator.open({
 			  spinnerType: 'fading-circle'
 			 });
			 const callback = (r) => {
 				 vm.$indicator.close();
         const list = r.data.data.data;
         list.forEach((item) => {
           item.status = vm.utils.completeTime(vm.utils.getNowTime(), item.endTime);
					 item.themePhoto = JSON.parse(item.themePhoto);
 					 item.startTime = vm.utils.changeDate(item.startTime, 'yyyy-MM-dd hh:mm');
 					 item.endTime = vm.utils.changeDate(item.endTime, 'yyyy-MM-dd hh:mm');
         });
         if (value == 0) {
					 vm.listOne = list;
				 } else {
					 vm.listTwo = list;
				 }
 				 if(list.length == 0) vm.noData = true;
				 console.log(list);
       };
       vm.utils.postData(url, data, callback);
		},
    getMyJoinList() {
      const vm = this;
      const url = vm.urls.getMyActJoinList ;
      const data = {
        userId: vm.id,
      };
			vm.$indicator.open({
			  spinnerType: 'fading-circle'
			});
      const callback = (r) => {
				vm.$indicator.close();
        const list = r.data.data;
        list.forEach((item) => {
          item.status = vm.utils.completeTime(vm.utils.getNowTime(), item.endTime);
					item.themePhoto = JSON.parse(item.themePhoto);
					item.href = '/activity/detail/' + item.actType + '/' + item.id;
					item.startTime = vm.utils.changeDate(item.startTime, 'yyyy-MM-dd hh:mm');
					item.endTime = vm.utils.changeDate(item.endTime, 'yyyy-MM-dd hh:mm');
        });
        vm.listOne = list;
				if(list.length == 0) vm.noData = true;
      };
      vm.utils.postData(url, data, callback);
    },
    getMyPublList() {
      const vm = this;
      const url = vm.urls.getMyActPublList;
      const data = {
        userId: vm.id,
      };
			vm.$indicator.open({
			  spinnerType: 'fading-circle'
			});
      const callback = (r) => {
				vm.$indicator.close();
        const list = r.data.data;
        list.forEach((item) => {
          item.status = vm.utils.completeTime(vm.utils.getNowTime(), item.endTime);
					item.themePhoto = JSON.parse(item.themePhoto);
					item.href = '/myself/activity/detail/' + item.id;
					item.startTime = vm.utils.changeDate(item.startTime, 'yyyy-MM-dd hh:mm');
					item.endTime = vm.utils.changeDate(item.endTime, 'yyyy-MM-dd hh:mm');
        });
        vm.listTwo = list;
				if(list.length == 0) vm.noData = true;
      };
      vm.utils.postData(url, data, callback);
    },
	}
}
</script>

<style lang="less" scoped>
#ActivityList{
	.iconfont{
		margin-right: 10px;
		color: #666666;
		font-size: 24px;
	}
	.nodata{
		text-align: center;
		margin-top: 50%;
		p{
			margin-top: 20px;
			color: #999999;
		}
	}
	.tab-list{
		background: #FFFFFF;
		display: flex;
		padding: 20px 0;
		margin-bottom: 20px;
		position: fixed;
		top:90px;
		width: 100%;
		border-bottom: 1px solid #e4e4e4;/*no*/
		li{
			padding:0 30px;
			flex: 1;
			border-right: 1px solid #E4E4E4;/*no*/
			text-align: center;
			.tab-name{
				position: relative;
				color: #999999;
				font-size: 30px;
				padding: 0 15px 14px;
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
		padding-top: 160px;
		.detail-item{
			background: #FFFFFF;
			margin: 20px;
			border-radius: 15px;
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
						font-size: 24px;
						padding: 15px 0;
						label{
							color: #D81E06;
						}
					}
					.notes{
						color: #333333;
						font-size: 26px;
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
						font-size: 24wpx;
						label{
							color: #D81E06;
						}
					}
				}
			}
		}
	}
	.tab2{
		padding-top: 160px;
		.detail-item{
			background: #FFFFFF;
			border-radius: 15px;
			margin: 20px;
			overflow: hidden;
			.photo{
				.picTure{
					display: inline-block;
					width: 100%;
					height: 400px;
					background: yellow;
					margin-right:20px;
					img{
						width: inherit;
						height: inherit;
					}
				}
			}
			.desc{
				display: flex;
				padding: 15px;
				flex-direction: column;
				.title{
					font-size: 30px;
					color: #333333;
					margin-bottom: 15px;
					/* 多行文本溢出利用省略号代替,仅用于webkit内核 $line 行数*/
				    overflow : hidden;
				    text-overflow: ellipsis;
				    display: -webkit-box;
				    -webkit-box-orient: vertical;
				    -webkit-line-clamp: 1;
				}
				.deadline{
					font-size: 24px;
					color: #666666;
					margin-bottom: 15px;
				}
				.info{
					display: flex;
					justify-content: space-between;
					font-size: 24px;
					color: #666666;
					label{
						color: #D81E06;
					}
				}
			}
		}
	}
}
</style>
