<template>
	<div id="MedicalList">
		<Header :title="topTitle" :headerLeft="headerLeft" @clickRouter="back"></Header>
			<div class="list-title">
				<!-- <div class="title-wrap">
					<span class="tip">咳嗽</span>
					<span class="tip">流鼻涕</span>
					<span class="tip">咳嗽</span>
					<span class="tip">流鼻涕</span>
				</div> -->
			</div>
			<div class="list-wrap" v-if="list.length != 0">
				<div v-for="(item, index) in list" :key="index" class="list-item">
					<router-link :to="{ name: 'DiseaseDetail', params: {id:item.id} }" >
						<span>
              <span class="pic">
  							<img :src="JSON.parse(userInfo.userAvatar).fileUrl"/>
  						</span>
              <span>{{item.petName}}</span>
            </span>
						<span class="mess">
							<span class="desc" v-html="item.note"></span>
							<span class="time">
                <span>{{item.createTime}}</span>
              </span>
						</span>
					</router-link>
				</div>
			</div>
			<div class="nodata" v-show="noData">
				<img src="src/assets/images/nodata.svg" />
				<p>暂时没有问诊信息哦~</p>
			</div>

	</div>
</template>

<script>
import Header from '@/components/header';
import ChoiceWindow from '@/components/choiceWindow';
import { mapGetters } from 'vuex';

export default{
	name:"DiseaseList",
	components:{
	    Header, ChoiceWindow
	},
	data(){
		return{
			topTitle: '我的问诊',
			headerLeft: true,
			showType: false,
			title: '',
			list: [],
			noData: false,
			typeList: [{
				type: 0,
				text: '全部'
			}, {
				type: 1,
				text:'呼吸系统',
			},{
				type:	2,
				text:'消化系统',
			}, {
				type:3,
				text:'皮肤病',
			}, {
				type:4,
				text:'骨科、外科',
			}, {
				type:5,
				text:'泌尿生殖',
			}, {
				type:6,
				text:'五官科',
			}, {
				type:7,
				text:'免疫',
			},{
				type:8,
				text:'驱虫'
			}]
		}
	},
  computed:{
		...mapGetters([
			'id',
			'userInfo',
		])
	},
	mounted() {
 		// const type = this.$route.query.type;
		// this.title = this.config.diseaseList[type];
		this.getList();
	},
	methods:{
		back() {
			this.$router.go(-1);
		},
		getList(type) {
			const vm = this;
			const url = vm.urls.getUserDiseaseList;
			let data = {
        id:vm.id,
      };
			vm.$indicator.open({
			  spinnerType: 'fading-circle'
			});
			vm.noData = false;
			const callback = (r) => {
				vm.$indicator.close();
				let list = r.data.data.data;
				list.forEach((item) => {
					item.createTime = vm.utils.changeDate(item.createTime, "yyyy-MM-dd hh:mm");
          if (item.photo) {
						item.photo = JSON.parse(item.photo);
					}
				});
				vm.list = list;
				vm.noData = list.length == 0;
			}
			vm.utils.postData(url, data, callback);
		}
	}
}
</script>

<style lang="less" scoped>
#MedicalList{
	.list-title{
		background: #FFFFFF;
		margin-bottom: 30px;
		.title-wrap{
			padding: 0px 30px;
			height: 100px;
			line-height: 100px;
			border-bottom: 1px solid #E4E4E4; /*no*/
			.title{
				color: #EB695C;
				font-size: 30px;
				display: flex;
				justify-content: space-between;
			}
			.tip{
				color:#666666;
				font-size: 28px;
			}
		}
	}
	.list-wrap{
		background: #FFFFFF;
		.list-item{
			padding: 20px 25px;
			border-bottom: 1px solid #E4E4E4;/*no*/
			overflow:hidden;
			.pic{
				display: inline-block;
				background: yellow;
				width: 80px;
				height: 80px;
				border-radius: 50%;
				margin-right: 20px;
				float: left;
				overflow: hidden;
				img {
					width: inherit;
					height: inherit;
				}
			}
			.mess{
				display: flex;
				display: -webkit-flex;
				flex-direction: column;
				.desc{
					/* 多行文本溢出利用省略号代替,仅用于webkit内核 $line 行数*/
			    overflow : hidden;
			    text-overflow: ellipsis;
			    display: -webkit-box;
			    -webkit-box-orient: vertical;
			    -webkit-line-clamp: 2;
					margin: 10px 0 25px;
					color: #333333;
					line-height: 40px;
					max-height: 70px;
					font-size: 28px;
				}
				.tips{
					font-size: 22px;
					.tip{
						color: #FFFFFF;
						background: #EB695C;
						padding: 5px 12px;
						border-radius: 20px;
					}
				}
				.time{
				  text-align: right;
					color: #999999;
				}
			}
		}
	}

}
</style>
