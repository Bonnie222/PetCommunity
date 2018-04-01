<template>
	<div id="Mypet">
		<Header title="我的宠物" :headerLeft="headerLeft" :fixed="isFixed" @clickRouter="back"></Header>
		<div class="petList">
			<div v-for="item in petList">
				<router-link :to="{ name: 'Editpet', params: { id: item.id }}" class="pet-wrap">
					<span class="pet-info">
						<img :src="item.avatar" />
						<span class="mess">
							<span class="name">
								{{ item.petName}}
								<i v-if="item.petSex == 1" class="iconfont icon-icon-test maleColor"></i>
								<i v-else class="iconfont icon-icon-test femaleColor"></i>
							</span>
							<span>
								<span class="type">{{item.petType}}</span>
								<span class="age">{{item.petBirth}}</span>
							</span>
						</span>
					</span>
					<span class="right">
						<img src="../../../assets/images/right.svg"/>
					</span>
				</router-link>
			</div>
		</div>
		<router-link to="/myself/pet/add" class="btn-create">
			添加宠物
		</router-link>
	</div>
</template>

<script>
import Header from '@/components/header';
import { mapGetters } from 'vuex';

export default{
	name:"Mypet",
	components:{
	    Header
	},
	data(){
		return{
			isFixed:true,
			headerLeft: true,
			petList:{},
		}
	},
	computed:{
		...mapGetters([
			'id',
		])
	},
	created(){
		this.getMypetList(this.id);
	},
	methods:{
		back(){
			this.$router.go(-1);
		},
		getMypetList(_id){
			var vm = this;
			var url = vm.urls.getMyPetList;
			var data = {
				petBelongId :_id
			}
			var options = {
				params:{
					userid: _id
				}
			}
			const callback = (r) => {
				var data = r.data.data.data;
				if(data.length == 0){
					vm.$router.replace('/myself/pet/add');
				}else{
					data.forEach((item) => {
						item.petType = vm.config.petTypeList[item.petType];
						item.petBirth = vm.utils.calculateAge(item.petBirth);
						item.avatar = JSON.parse(item.petAvatar).fileUrl;
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
	.petList{
		padding-top: 90px;
	}
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
					.maleColor{
						color: #0275d8;
					}
					.femaleColor{
						color: #f00;
					}
				}
			}
			.type{
				color: #666666;
				border: 1px solid #666666;/*no*/
				border-radius: 3px;/*no*/
				padding: 3px 12px;
				font-size: 16px;
				margin-right: 10px;
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
