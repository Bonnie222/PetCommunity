<template>
	<div id="Editpet">
		<div v-show="showContentWindow">
			<Header :title="topTitle" :headerLeft="headerLeft" @clickRouter="back"></Header>
			<div class="info" :data="petInfo">
				<div class="info-item">
					<span class="item-name">宠物头像<span class="tip">*</span></span>
					<div class="pic">
						<span class="imgPic">
							<img :src="avatar" class="avatar" @click="previewImg($event)"/>
							<!--<img src="../../assets/images/removeImg.svg" class="remove" @click="removeImg"/>-->
						</span>
						<span class="link" :hidden="isDisabled">
							<img src="../../../assets/images/right.svg"/>
							<input class="file-btn" type="file" hidefocus="true" name="avatar" accept="image/*" @change="getImg($event)" ref="avatarInput"/>
						</span>
					</div>
				</div>
				<div class="info-item">
					<span class="item-name">宠物名称<span class="tip">*</span></span>
					<input type="text" class="item-input" placeholder="设置宠物名称" v-model="petInfo.petName" :disabled="isDisabled"/>
				</div>
				<div class="info-item">
					<span class="item-name">宠物性别<span class="tip">*</span></span>
					<div class="radio-wrap">
						<label class="yd-radio">
							<input type="radio" value="1" name="sex" v-model="petInfo.petSex" :disabled="isDisabled">
							<span class="yd-radio-icon male">
								<i class="icon"></i>
							</span>
							<span class="yd-radio-text">GG</span>
						</label>
						<label class="yd-radio">
							<input type="radio" value="2" name="sex" v-model="petInfo.petSex" :disabled="isDisabled">
							<span class="yd-radio-icon female">
								<i class="icon"></i>
							</span>
							<span class="yd-radio-text">MM</span>
						</label>
					</div>
				</div>
				<div class="info-item">
					<span class="item-name">宠物品种<span class="tip">*</span></span>
					<span>
						<span class="item-input"  @click="showpetTypeWindow" >{{petInfo.petTypeText}}</span>
						<span class="link" :hidden="isDisabled"><img src="../../../assets/images/right.svg"/></span>
					</span>
				</div>
				<div class="info-item">
					<span class="item-name">宠物生日<span class="tip">*</span></span>
					<span>
						<span class="item-input" @click="openDatePicker" >{{petInfo.petBirth}}</span>
						<span class="link" :hidden="isDisabled"><img src="../../../assets/images/right.svg"/></span>
					</span>
				</div>
				<div class="info-item">
					<span class="item-name">加入爱宠</span>
					<span class="item-input">{{petInfo.petCreateDate}}</span>
				</div>
				<div class="info-item">
					<span class="item-name">到家时间</span>
					<span>
						<span  class="item-input" @click="openArrivalPicker" :disabled="isDisabled">
							{{petInfo.petArrivedDate}}</span>
						<span class="link" :hidden="isDisabled"><img src="../../../assets/images/right.svg"/></span>
					</span>
				</div>
				<div class="info-item">
					<span class="item-name">绝育状态</span>
					<span>
						<span class="item-input" @click="showpetStatusWindow" :disabled="isDisabled">{{petInfo.petStatusText}}</span>
						<span class="link" :hidden="isDisabled"><img src="../../../assets/images/right.svg"/></span>
					</span>
				</div>

				<!--选择器-->
				<mt-datetime-picker ref="petBirthPicker" type="date" @confirm="handlePetBirth"
					:startDate="startDate" :endDate="endDate"></mt-datetime-picker>
				<mt-datetime-picker ref="petArrivalPicker" type="date" @confirm="handlePetArrival"
				:startDate="startDate" :endDate="endDate"></mt-datetime-picker>

			</div>
			<div class="btn-wrap">
				<button class="btn-save" @click="updatePetInfo" :hidden="isDisabled">{{saveBtnText}}</button>
				<!--<button class="btn-save" @click="editPetInfo" v-show="isDisabled">编辑资料</button>-->
				<button class="btn-cancel" @click="delPet" :hidden="isDisabled" >删除宠物</button>

				<!--<button class="btn-cancel" @click="cancelToUpdate" :hidden="isDisabled" >取消</button>-->
			</div>
			<ImgView v-show="showImgView" :imgSrc="avatar" @clickkit="closeView"></ImgView>
		</div>
		<div v-show="showTypeWindow">
			<Header :title="windowTitle" :headerLeft="windowheaderLeft" @clickRouter="windowback"></Header>
			<ChoiceWindow :dataList="petTypeList" @confirm="confirmType"></ChoiceWindow>
		</div>
		<div v-show="showStatusWindow">
			<Header :title="windowTitle" :headerLeft="windowheaderLeft" @clickRouter="windowback"></Header>
			<ChoiceWindow :dataList="petStatusList" @confirm="confirmStatus"></ChoiceWindow>
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';
import ChoiceWindow from '@/components/choiceWindow';
import ImgView from '@/components/imageView';
export default{
	name:"Editpet",
	components:{
	    Header,ImgView, ChoiceWindow
	},
	data(){
		return{
			//窗口
			showContentWindow:true,
			showStatusWindow:false,
			showTypeWindow:false,
			/*selectWindow*/
			windowTitle:'',
			windowheaderLeft:'',
			//主页
			topTitle:'宠物详情',
			headerLeft:true,
			petTypePicker:false,
			petStatusPicker: false,
			isDisabled: false,
			petInfo:{},
			files:'',
			avatar:'',
			showImgView: false,
			imgSrc:'',
			isSaving:false,
			saveBtnText:'保存修改',
			/*宠物出生日期范围*/
			startDate:new Date('1990,1,1'),
			endDate:new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate()),

			petTypeList:[{
				text:'汪星人', value:1, isChecked:false
			},{
				text:'喵星人', value:2, isChecked:false
			},{
				text:'兔星人', value:3, isChecked:false
			},{
				text:'鼠星人', value:4, isChecked:false
			},{
				text:'鸟星人', value:5, isChecked:false
			},{
				text:'龟星人', value:6, isChecked:false
			},{
				text:'鱼星人', value:7, isChecked:false
			},{
				text:'其它', value:8, isChecked:false
			}],
			petStatusList:[{
				text: '未绝育', value: 1, isChecked:false
			},{
				text: '已绝育', value: 2, isChecked:false
			},{
				text: '不确定', value: 3, isChecked:false
			}],
			formData:{
				petAvatar:null,
				petName:null,
				petSex:null,
				petType:null,
				petBirth:null,
				petArrivedDate:null,
				petStatus:null,
			}
		}
	},
	created(){
		this.getPetdetail();
	},
	methods:{
		back: function(){
			this.$router.go(-1);
		},
		windowback: function(){
			let vm = this;
			vm.showContentWindow = true;
			vm.showStatusWindow = false;
			vm.showTypeWindow = false;
		},
		getPetdetail:function(){
			var vm = this;
			var _id = vm.$route.params.id;
			var url = vm.urls.getPetDetail;
			var data = {
				id : _id
			}
			var options = {
				params:{
					petid: _id
				}
			}
			var callback = function(r){
				var data = r.data.data;
				data.petTypeText = vm.config.petTypeList[data.petType];
				data.petBirth = vm.utils.changeDate(data.petBirth);
				data.petArrivedDate = data.petArrivedDate == null ? '请选择': vm.utils.changeDate(data.petArrivedDate);
				data.petCreateDate = data.petCreateDate == null ? '': vm.utils.changeDate(data.petCreateDate);
				data.petStatusText = data.petStatus == null ? '请选择': vm.config.petStatusList[data.petStatus];
				data.petAvatar = JSON.parse(data.petAvatar);
				vm.avatar = data.petAvatar.fileUrl;
				vm.petInfo = data;

			}
			vm.utils.postData(url, data, callback, options);
		},
		previewImg: function(){
    		this.showImgView = true;
    	},
    	closeView: function(){
    		this.showImgView = false;
    	},
    	//品种
       	showpetTypeWindow:function(){
       		let vm = this;
       		vm.showContentWindow = false;
       		vm.showTypeWindow = true;
       		vm.windowTitle = '宠物品种';
			vm.windowheaderLeft = true;
       	},
       	confirmType: function(obj){
			let vm = this;
			$.each(vm.petTypeList, function(index, item){
					item.isChecked = false;
			})
			obj.isChecked = true;
			vm.petInfo.petTypeText = obj.text;
			vm.petInfo.petType = obj.value;
			setTimeout(function(){
				vm.showContentWindow = true;
				vm.showTypeWindow = false;
			},500);
		},
		//状态
		showpetStatusWindow:function(){
       		let vm = this;
       		vm.showContentWindow = false;
       		vm.showStatusWindow = true;
       		vm.windowTitle = '绝育状态';
			vm.windowheaderLeft = true;
       	},
       	confirmStatus: function(obj){
			let vm = this;
			$.each(vm.petStatusList, function(index, item){
					item.isChecked = false;
			})
			obj.isChecked = true;
			vm.petInfo.petStatusText = obj.text;
			vm.petInfo.petStatus = obj.value;
			setTimeout(function(){
				vm.showContentWindow = true;
				vm.showStatusWindow = false;
			},500);
		},
		//出生日期
		openDatePicker: function(){
			this.$refs.petBirthPicker.open();
	   	},
	   	handlePetBirth: function(value){
	   		let vm =this;
	   		let d = value.getFullYear() + '-' + (value.getMonth()+1) + '-' + value.getDate();
	   		d = vm.utils.formatDate(d, 'yyyy-MM-dd');
	   		vm.petInfo.petBirth = d;
	   	},
	   	//到家时间
	   	openArrivalPicker: function(){
			this.$refs.petArrivalPicker.open();
	   	},
	   	handlePetArrival: function(value){
	   		let vm = this;
	   		let d = value.getFullYear() + '-' + (value.getMonth()+1) + '-' + value.getDate();
	   		d = vm.utils.formatDate(d, 'yyyy-MM-dd');
	   		vm.petInfo.petArrivedDate = d;
	   	},
    	delPet: function(){
    		var vm = this;
    		var _id = vm.$route.params.id;
    		var url = vm.urls.delPet;
    		var data = {
    			id:_id
    		}
    		var options = {
				params:{
					petid: _id
				}
			}
			var callback = function(r){
				var routeUrl = '/myself/pet';
				var mesText = '删除成功';
				vm.utils.toastCallback(vm,mesText,routeUrl);
			}

			var tips = '删除宠物后相关资料不可恢复 <br/>您确定要删除吗？';
			vm.utils.confirmCallback(vm, tips,function(){
				vm.utils.postData(url, data, callback, options);
			});

    	},
    	getImg: function(e){
    		var vm = this;
    		vm.files = e;
    		var file = e.target.files[0];
    		if((file.type).indexOf("image/")==-1){
    			vm.$dialog.toast({
		            mes: '该文件必须为图片格式',
		            timeout: 1000,
		            icon: 'error'
		        });
    			return false;
    		}
    		var reader = new FileReader();
    		reader.readAsDataURL(file);
    		reader.onload = function(e){
    			vm.avatar = this.result;
    		}
    	},

    	updatePetInfo: function(){
    		var vm = this;
    		if(vm.isSaving) return;
    		if(!vm.petInfo.petName || !vm.petInfo.petSex ||
				!vm.petInfo.petType || !vm.petInfo.petBirth){
					vm.$toast('信息填写不完整');
					return;
			}
			var e = vm.files;
      		var url = vm.urls.uploadSingle;
    		var fname = 'avatar'
    		var callback = function(r){
    			vm.petInfo.petAvatar = JSON.stringify(r.data.data);
    			save();
    		}
    		vm.saveBtnText = '正在保存中...'
    		if(e){
    			vm.utils.upload(vm, e, fname, url, callback);
    		}else{
    			vm.petInfo.petAvatar = JSON.stringify(vm.petInfo.petAvatar);
    			save();
    		}

			function save(){
				vm.petInfo.petArrivedDate = vm.petInfo.petArrivedDate == '请选择' ? null : vm.petInfo.petArrivedDate;
				vm.petInfo.petStatusText = vm.petInfo.petStatusText == '请选择' ? null : vm.petInfo.petStatusText;
	    		var url = vm.urls.updatePet;
	    		var _id = vm.$route.params.id;
	    		var data = vm.petInfo;
	    		var options = {
					params:{
						petid: _id
					}
				}
	    		var callback = function(r){
					vm.$dialog.toast({
						mes: '修改成功',
	  					icon: 'success',
	  					timeout: 1000
					});
					vm.isSaving = false;
	    			vm.saveBtnText = '保存修改';
				}
				vm.isSaving = true;
				vm.utils.postData(url, data, callback);
			}

    	}
	}
}
</script>

<style lang="less" scoped>
#Editpet{
	.link{
		position: relative;
		width: 15px;
		height: 26px;
		margin-left:10px;
		img{
			width: 15px;
			height: 26px;
		}
	}
	.info{
		background: #FFFFFF;
		padding: 0 20px;
		.tip{
			display: inline-block;
			color: red;
			margin-right: 10px;
		}
		.info-item{
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			align-items: center;
			font-size:32px;
			color: #666666;
			padding:25px 5px;
			border-bottom: 1px solid #E4E4E4; /*no*/
			&:last-child{
				border-bottom: none;
			}
			.item-name{

			}
			.item-input{
				display: inline-block;
				text-align: right;
			}
			input::placeholder{
				color:#cccccc;
			}
			.pic{
				display: flex;
				align-items: center;
				/*height: 110px;
				width: 110px;
				border-radius: 50%;*/
				.imgPic{
					display: inline-block;
					position: relative;
					height: 110px;
					width: 110px;
					border-radius: 50%;
					overflow:hidden;

					img{
						height:inherit;
						width: inherit;
						border-radius: 50%;
					}
					.avatar{
						height: inherit;
						width: inherit;
						border-radius: 50%;
						border:1px solid #CCCCCC; /*no*/
					}
					.remove{
						cursor: pointer;
						position: absolute;
						width: 40px;
						height: 40px;
						right: 0;
						top:0;
					}
				}
				input[type=file]{
					background: green;
					position: absolute;
					bottom: 0;
					z-index: 1;
					width: 100%;
					font-size: 28px;
					opacity: 0;
					cursor: pointer;
				}
			}
		}
		.radio-wrap{
			.yd-radio{
				display: inline-block;
				padding-right: 20px;
				&:last-child{
					padding: 0;
				}
				&>input[type=radio]{
					position: absolute;
					left: -9999em;
				}
				&>input[type=radio]:checked+.yd-radio-icon{
					border-color: currentcolor;
					&>i{
						opacity: 1;
						transition: all .2s ease-in-out;
						transform: translate(-50%, -50%) scale(.1);
					}
				}
				.yd-radio-icon{
					border: 1px solid #CCC; /*no*/
					border-radius: 50%;
					display: inline-block;
					position: relative;
					z-index: 10;
					vertical-align: bottom;
					pointer-events: none;
					/*color: rgb(76, 216, 100); */
					width: 40px;
					height: 40px;
					.icon{
						display: inline-block;
						width: 100px; /*no*/
						height: 100px;/*no*/
						content: "";
						position: absolute;
						left: 50%;
						top:50%;
						border-radius: 50%;
						background-color: currentcolor;
						opacity: 0;
						transform: translate(-50%, -50%) scale(.1);
					}

				}
				.male{
					color: #0275d8;
				}
				.female{
					color: #f00;
				}
				.yd-radio-text{
					margin-left: 1px;
					font-size: 30px;
					color: #666;
					pointer-events: none;
				}
			}
		}
	}
	.btn-wrap{
		margin-top: 80px;
		text-align: center;
		.btn-cancel,.btn-save{
			font-size: 30px;
			width: 220px;
	    	height: 70px;
		}
		.btn-save{
			margin-right: 55px;
		}
	}
}
</style>
