<template>
	<div id="ActivitySign">
		<Header title="发布活动" :headerLeft="headerLeft" :fixed="isFixed"
			@clickRouter="back"></Header>
		<ul class="form2">
			<li class="input1">
				<label>报名人姓名</label>
				<input type="text" placeholder="请输入姓名"
					v-model="signName"/>
			</li>
			<li class="input1">
				<label>联系方式</label>
				<input type="text" placeholder="请输入联系方式" v-model="signContact"/>
			</li>
		</ul>
		<div class="btn-wrap">
			<button class="btn-save" @click="goApply">{{saveBtnText}}</button>
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';
import District from 'ydui-district/dist/gov_province_city_id';
import { mapGetters } from 'vuex';

export default{
	name:'ActivitySign',
	components:{
		Header,
	},
	data(){
		return{
			isFixed:true,
			headerLeft:true,
			isSaving:false,
			saveBtnText:'确认报名',
			signName: '',
      signContact: '',
		}
	},
	computed:{
		...mapGetters([
			'userInfo',
			'id',
		])
	},
	mounted(){
		let vm = this;
		if(vm.userInfo.userAvatar){
			vm.userAvatar = JSON.parse(vm.userInfo.userAvatar).fileUrl;
		}
	},
	methods:{
		back(){
			this.$router.go(-1);
		},
    goApply(){
      const vm = this;
      if(!vm.signName || !vm.signContact) {
        vm.$toast('请填写信息');
        return;
      }
      const partten = /^$|^1(3|4|5|7|8)\d{9}$/;
      if(!partten.test(vm.signContact)){
        vm.$toast('请输入正确的手机号格式');
        return;
      }
      const url =  vm.urls.apply;
      const data = {
      	actId: vm.$route.query.actId,
        actTitle:  vm.$route.query.actTitle,
      	userId: vm.id,
        signName: vm.signName,
        signContact:vm.signContact,
      }
      vm.isSaving = true;
      const callback = (r) => {
      	const dt = {
      		actId: vm.$route.query.actId,
      	}
      	vm.utils.postData(vm.urls.updateTotal, dt);
      	vm.$dialog.toast({
      		mes: '报名成功',
      			icon: 'success',
      			timeout: 1000
      	});
      	vm.isSaving = false;
        setTimeout(()=> {
          vm.$router.go(-1);
        }, 1000);
      	// vm.isAppy = true;
      	// vm.detailOne.peopleNum = vm.detailOne.peopleNum + 1;
      };
      const tips = '是否确认报名？报名后不许取消';
      vm.utils.confirmCallback(vm, tips, ()=>{
      	vm.utils.postData(url, data, callback);
      });
    },
	}
}
</script>

<style lang="less" scoped>
#ActivitySign{
	.mint-header{
		background: #FFFFFF;
		border-bottom:1px solid #CCCCCC; /*no*/
		color: #333333;
	}
	.form2{
			background: #ffffff;
			padding: 90px 20px 0;
			border-bottom: 1px solid #E4E4E4;/*no*/
			font-size: 30px;
			color: #333333;
			margin-bottom: 20px;
			.input1{
				display:flex;
				align-items: center;
				input{
					width: 90%;
				}
        label {
          width: 200px;
        }
			}
			& li{
				padding: 30px 5px;
				border-bottom: 1px solid #e4e4e4; /*no*/
				&:last-child{
					border: none;
				}
				label{
					display: inline-block;
					/*width: 150px;*/
					text-align: left;
					color: #666666;
				}

				input::placeholder{
					color:#cccccc;
				}
				.icon-right{
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
	.btn-wrap{
		margin: 50px 0;
	    .btn-save{
	    	display: block;
	    	margin: 0 auto;
	    	width: 80%;
	    }
	}
}
</style>
