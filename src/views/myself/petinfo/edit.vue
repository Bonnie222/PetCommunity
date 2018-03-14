<template>
	<div id="Addpet">
		<div v-show="showContentWindow">
			<Header title="添加宠物" :headerLeft="headerLeft" @clickRouter="back"></Header>
			<div class="form">
				<div class="pic">
					<span class="imgPic" v-if="!avatar">
						<img src="../../../assets/images/member.png" class="avatar"/>
						<span class="camera">
							<i class="iconfont icon-shangchuantupian_l"></i>
						</span>
						<input class="file-btn" type="file" hidefocus="true" name="avatar" accept="image/*" @change="getImg($event)" ref="avatarInput"/>
					</span>
					<span class="imgPic" v-else>
						<img :src="avatar" class="avatar" @click="previewImg($event)"/>
						<img src="../../../assets/images/removeImg.svg" class="remove" @click="removeImg"/>
					</span>
				</div>
				<div class="info">
					<div class="info-item">
						<span class="item-name">宠物名称<span class="tip">*</span></span>
						<input type="text" class="item-input" placeholder="设置宠物名称" v-model="petInfo.petName"/>
					</div>
					<div class="info-item">
						<span class="item-name">宠物性别<span class="tip">*</span></span>
						<div class="radio-wrap">
							<label class="yd-radio">
								<input type="radio" value="1" name="sex" v-model="petInfo.petSex">
								<span class="yd-radio-icon male">
									<i class="icon"></i>
								</span>
								<span class="yd-radio-text">GG</span>
							</label>
							<label class="yd-radio">
								<input type="radio" value="2" name="sex" v-model="petInfo.petSex">
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
							<input type="text" class="item-input" :value="petTypeText" placeholder="选择宠物品种" @click="showpetTypeWindow"/>
							<span class="link"><img src="../../../assets/images/right.svg"/></span>
						</span>
					</div>
					<div class="info-item">
						<span class="item-name">宠物生日<span class="tip">*</span></span>
						<span>
							<input type="text" class="item-input" placeholder="选择宠物生日" @click="openDatePicker" v-model="petInfo.petBirth"/>
							<span class="link"><img src="../../../assets/images/right.svg"/></span>
						</span>
					</div>
					<div class="info-item">
						<span class="item-name">到家时间</span>
						<span>
							<input type="text"  class="item-input" placeholder="选择到家日期" @click="openArrivalPicker" v-model="petInfo.petArrivedDate"/>
							<span class="link"><img src="../../../assets/images/right.svg"/></span>
						</span>
					</div>
					<div class="info-item">
						<span class="item-name">绝育状态</span>
						<span>
							<input type="text" class="item-input" :value="petStatusText" placeholder="选择绝育状态" @click="showpetStatusWindow"/>
							<span class="link"><img src="../../../assets/images/right.svg"/></span>
						</span>
					</div>
				</div>
				<!--选择器-->
				<mt-datetime-picker ref="petBirthPicker" type="date" @confirm="handlePetBirth"
					:startDate="startDate" :endDate="endDate"></mt-datetime-picker>
				<mt-datetime-picker ref="petArrivalPicker" type="date" @confirm="handlePetArrival"
				:startDate="startDate" :endDate="endDate"></mt-datetime-picker>
			</div>

			<div class="btn-wrap">
				<button class="btn-save" @click="savePetInfo">保存</button>
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
import { mapGetters } from 'vuex';

export default{
	name:"Mypet",
	components:{
	    Header, ImgView, ChoiceWindow
	},
	props: [],
	data(){
		return{
			//窗口
			showContentWindow:true,
			showAgeWindow:false,
			showTypeWindow:false,
			/*selectWindow*/
			windowTitle:'',
			windowheaderLeft:'',
			//主页
			headerLeft: true,
			showImgView: false,
			imgSrc:'',
			petTypePicker:false,
			petStatusPicker: false,
			petTypeText:'',
			petStatusText:'',
			isSaving:false,

			avatar:null,
			files:null,
			petInfo:{
				petAvatar:'',
				petName:'',
				petSex: '',
				petType: '',
				petBirth:'',
				petArrivedDate:null,
				petStatus:null,
				petBelongId:null,
				petCreateDate:null
			},
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
			}]
		}
	},
	computed:{
		...mapGetters([
			'id',
		])
	},
	methods:{
		back:function(){
			this.$router.go(-1);
		},
		windowback: function(){
			let vm = this;
			vm.showContentWindow = true;
			vm.showStatusWindow = false;
			vm.showTypeWindow = false;
		},
		//生日
	   	openDatePicker: function(){
	   		this.$refs.petBirthPicker.open();
	   	},
	   	handlePetBirth: function(value){
	   		var d = value.getFullYear() + '-' + (value.getMonth()+1) + '-' + value.getDate();
	   		d = this.utils.formatDate(d, 'yyyy-MM-dd');
	   		this.petInfo.petBirth = d;
	   	},
	   	//到家时间
	   	openArrivalPicker: function(){
	   		this.$refs.petArrivalPicker.open();
	   	},
	   	handlePetArrival: function(value){
	   		var d = value.getFullYear() + '-' + (value.getMonth()+1) + '-' + value.getDate();
	   		d = this.utils.formatDate(d, 'yyyy-MM-dd');
	   		this.petInfo.petArrivedDate = d;
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
			vm.petTypeText = obj.text;
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
			vm.petStatusText = obj.text;
			vm.petInfo.petStatus = obj.value;
			setTimeout(function(){
				vm.showContentWindow = true;
				vm.showStatusWindow = false;
			},500);
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
    	removeImg: function(){
    		this.avatar = "";
    	},
    	previewImg: function(){
    		this.showImgView = true;
    	},
    	closeView: function(){
    		this.showImgView = false;
    	},
	   	savePetInfo: function(){
	   		var vm = this;
	   		if(vm.isSaving) return;
				if(!vm.petInfo.petName || !vm.petInfo.petSex ||
					!vm.petInfo.petType || !vm.petInfo.petBirth || !vm.avatar){
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
    		vm.utils.upload(vm, e, fname, url, callback);

			function save(){
				vm.isSaving = true;
				var url = vm.urls.addPet;
				var data = vm.petInfo;
				data.petBelongId = vm.id;
				data.petCreateDate = vm.utils.getNowDate();
				var callback = function(r){
					vm.isSaving = false;
					vm.$dialog.toast({
						mes: '添加成功',
	  					icon: 'success',
	  					timeout: 1000
					});
					setTimeout(function(){
						vm.$router.replace("/myself/pet");
					},1500);
				}
				vm.utils.postData(url, data, callback);
			}

	   },

	}
}
</script>

<style lang="less" scoped>
#Addpet{
	.link{
		width: 15px;
		height: 26px;
		img{
			width: 15px;
			height: 26px;
		}
	}
	.form{
		.pic{
			height: 200px;
/*			line-height: 200px;*/
			text-align: center;
			.imgPic{
				display: inline-block;
				position: relative;
				height: 130px;
				width: 130px;
				margin-top: 30px;
				border-radius: 50%;
				/*overflow:hidden;*/
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
				input[type=file]{
					background: green;
					position: absolute;
					bottom: 0;
					z-index: 1;
					width: 50%;
					font-size: 28px;
					opacity: 0;
					cursor: pointer;
				}
				.camera{
					position: absolute;
					font-size: 36px;
					color: #D81E06;
					right: 0;
					bottom:10px;
					display: block;
					width: 40px;
					height: 40px;
					border: 1px solid #CCCCCC;/*no*/
					border-radius: 50%;
					background: #FFFFFF;
				}
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
					text-align: right;
				}
				input::placeholder{
					color:#cccccc;
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
	}
	.btn-wrap{
		margin-top: 50px;
	    .btn-save{
	    	display: block;
	    	margin: 0 auto;
	    	width: 85%;
	    }
	}

}
</style>
