<template>
	<div id="ResetPsd">
		<Header title="重置登录密码" :headerLeft="headerLeft" @clickRouter="back"></Header>
		<div class="info">
			<div class="info-item">
				<span class="item-name">旧密码</span>
				<input type="password" class="item-input" v-model="oldPsd"/>
			</div>
			<div class="info-item">
				<span class="item-name">新密码</span>
				<input type="password" class="item-input" v-model="newPsd"/>
			</div>
			<div class="info-item">
				<span class="item-name">确认新密码</span>
				<input type="password" class="item-input" v-model="newPsd2"/>
			</div>
		</div>
		<p class="tip">密码由6-20位字母和数字组成，区分大小写</p>
		<div class="btn-wrap">
			<button class="btn-save" @click="reset"
				:class="{noText: !oldPsd || !newPsd || !newPsd2}">{{saveBtnText}}</button>
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';
import { mapGetters } from 'vuex';

export default{
	name:"ResetPsd",
	components:{
	    Header,
	},
	computed:{
		...mapGetters([
			'id',
			'userInfo'
		])
	},
	data(){
		return{
			headerLeft: true,
			saveBtnText: '重置密码',
			oldPsd: null,
			newPsd: null,
			newPsd2: null,
			psd: null,
			isSaving: false,
		}
	},
	mounted(){
		// const checkPsd = ()=> {
		// 	const vm = this;
		// 	const url = vm.urls.getUserPsd;
		// 	const data = {
		// 		id: vm.id,
		// 	}
		// 	const callback = (r) => {
		// 		const psd = r.data.data[0].userPsd;
		// 		vm.psd = psd;
		// 	};
		// 	vm.utils.postData(url, data, callback);
		// }
		// checkPsd();
	},
	methods:{
		back(){
			this.$router.go(-1);
		},
		reset(){
			const vm = this;
			if(!vm.oldPsd ||!vm.newPsd || !vm.newPsd2) return;
			if(vm.userInfo.userPsd !== vm.oldPsd) {
				vm.$dialog.toast({
					mes: '原密码输入有误，请重新输入',
						icon: 'error',
						timeout: 1500
				});
				return;
			}
			if(vm.newPsd !== vm.newPsd2) {
				vm.$dialog.toast({
					mes: '确认密码与新密码不一致',
						icon: 'error',
						timeout: 1500
				});
				return;
			}
			if(vm.newPsd.length > 20 || vm.newPsd.length < 6) {
				vm.$dialog.toast({
					mes: '密码不能少于6个字符或大于20个字符',
						icon: 'error',
						timeout: 1500
				});
				return;
			}
			if(vm.oldPsd == vm.newPsd) {
				vm.$dialog.toast({
					mes: '新密码不能与旧密码相同',
						icon: 'error',
						timeout: 1500
				});
				return;
			}
			const url = vm.urls.resetPsd;
			const data = {
				id: vm.id,
				psd: vm.newPsd,
			}
			vm.isSaving = true;
			vm.saveBtnText = "正在重置...";
			const callback = () => {
				vm.$dialog.toast({
					mes: '重置密码成功',
					icon: 'success',
					timeout: 1500
				});
				vm.saveBtnText = "重置密码";
				vm.isSaving = false;
				setTimeout(function(){
					vm.$router.go(-2);
				},2000);
			}
			vm.utils.postData(url, data, callback);
		},

	}
}
</script>

<style lang="less" scoped>
#ResetPsd{
	.info{
		background: #FFFFFF;
		padding: 0 20px;
		margin-top:20px;
		.info-item{
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			align-items: center;
			font-size:32px;
			color: #666666;
			padding:30px 5px;
			border-bottom: 1px solid #E4E4E4; /*no*/
			&:last-child{
				border-bottom: none;
			}
			.item-name{
				width: 200px;
			}
			.item-input{
				display: inline-block;
				text-align: left;
				flex: 1;
			}
		}
	}
	.tip{
		font-size: 26px;
		padding: 20px;
		color: #999999;
	}
	.btn-wrap{
		text-align: center;
		margin-top: 20px;
		.btn-save{
			width:90%;
		}
		.noText {
			background-color: #cccccc;
			border: 0px;
		}
	}
}
</style>
