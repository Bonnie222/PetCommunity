<template>
	<div id="Mypet">
		<Header title="我的宠物" :headerLeft="headerLeft"></Header>
		<div v-for="item in petList">
			<router-link to="" class="pet-wrap">
				<span class="pet-info">
					<img src="" />
					<span class="mess">
						<span class="name">
							{{ item.petName}}
							<i class="iconfont icon-baoji"></i>
						</span>
						<span>
							<span class="type">{{item.petType}}</span>
							<span class="age">1个月</span>
						</span>
					</span>
				</span>
				<span class="right">
					<img src="../../assets/images/right.svg"/>
				</span>
			</router-link>
		</div>
		<router-link to="/myself/addpet" class="btn-create">
			添加宠物
		</router-link>
	</div>
</template>

<script>
import Header from '@/components/header';
export default{
	name:"Mypet",
	components:{
	    Header
	},
	data(){
		return{
			headerLeft: true,
			petList:{},
			
		}
	},
	created(){
		this.getMypetList();
	},
	methods:{
		getMypetList:function(){
			var vm = this;
			var dt = JSON.parse(window.sessionStorage.userInfo);
			var url = vm.urls.getMyPetList;
			var data = {
				petBelongId : dt.id
			}
			var options = {
				params:{
					userid: dt.id
				}
			}
			var callback = function(r){
				console.log(r);
				var data = r.data.data;
				if(data.length == 0){
					vm.$router.replace('/myself/addpet');
				}else{
					var petTypeList = {
						1:'汪星人',
						2:'喵星人',
						3:'兔星人',
						4:'鼠星人',
						5:'鸟星人',
						6:'龟星人',
						7:'鱼星人',
						8:'其他'
					}
					$.each(data, function(index, item) {
						item.petType = petTypeList[item.petType];
					});
					vm.petList = data;	
				}
			}
			vm.utils.postData(url, data, callback, options);
		}
	}
}
</script>

<style lang="less" scoped>
#Mypet{
	.pet-wrap{
		background: #FFFFFF;
		height: 120px;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #E4E4E4; /*no*/
		padding: 0 25px;
		.pet-info{
			display: flex;
			display: -webkit-flex;
			img{
				background: #E4E4E4;
				width: 80px;
				height: 80px;
				border-radius: 50%;
				margin-right: 20px;
			}
			.mess{
				display: flex;
				display: -webkit-flex;
				flex-direction: column;
				padding: 5px 0;
				.name{
					font-size: 32px;
					font-weight: bold;
					margin-bottom: 15px;
					.iconfont{
						color: #EB695C;
					}
				}
			}
			.type{
				color: #666666;				
				border: 1px solid #666666;/*no*/
				border-radius: 3px;/*no*/
				padding: 3px 12px;
				font-size: 16px;
			}
			.age{
				color: #999999;
				font-size: 16px;
			}
		}
		.right{
			img{
				width: 20px;
				height: 35px;
			}
		}
	}
	.btn-create{
		background: #FFFFFF;
		display: block;
		height: 100px;
		line-height: 100px;
		text-align: center;
		border-bottom: 1px solid #E4E4E4;/*no*/
		color: #999999;
		font-size: 32px;
	}
}	
</style>