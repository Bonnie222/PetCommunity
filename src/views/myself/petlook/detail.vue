<template>
	<div id="Mylook-detail">
		<Header :title="topTitle" :headerLeft="headerLeft" @clickRouter="back"></Header>
		<div class="">
			<div class="">
				<div class="detail-item">
					<span class="item-label"></span>
					<span class="item-text"></span>
				</div>
			</div>
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
			headerLeft:true,
			topTitle:'',
			detail:{
				isFindPet:{
					label:'类型'
				},
				dateTime:{
					label:'时间'
				},
				loacaition:{
					label:'地点'
				}
				
			}
		}
	},
	created(){
		var _id = this.$route.params.id;
		this.getDetail(_id);
	},
	methods:{
		back:function(){
			this.$router.go(-1);
		},
		getDetail: function(id){
			var vm = this;
			var url = vm.urls.getMyLookDetail;
			var data = {
				id : id
			}
			var options = {
				params:data
			}
			var callback = function(r){
				var item = r.data.data[0];
				console.log(item)
				vm.topTitle = item.isFindPet == 1 ? '寻宠详情':'寻主详情'; 
				item.createTime = vm.utils.changeDate(item.createTime);
				item.dateTime = vm.utils.changeDate(item.dateTime);
				item.petType = vm.config.petTypeList[item.petType];
				item.petAge = vm.config.petAgeList[item.petAge];
				item.petSex = vm.config.petSexList[item.petSex];
				item.findStatus = vm.config.lookStatus[item.findStatus];
				item.petAvatar = JSON.parse(item.petAvatar);
				vm.detail = item;
			}
			vm.utils.postData(url, data, callback, options);
		},
	}
}
</script>

<style lang="less" scoped>
#Mylook-detail{
	
}
</style>