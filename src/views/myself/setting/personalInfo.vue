<template>
	<div id="MyInfo">
		<div v-show="showContentWindow">
			<Header :title="topTitle" :headerLeft="headerLeft" @clickRouter="back" :isFixed="isFixed"></Header>
			<div class="info first">
				<div class="info-item">
					<span class="item-name">头像</span>
					<div class="pic">
						<span class="imgPic">
							<img src="../../../assets/images/member.png" class="avatar" v-if="avatar == ''"/>
							<img :src="avatar" class="avatar" @click="previewImg($event)" v-else/>
						</span>
						<span class="link" :hidden="isDisabled">
							<img src="../../../assets/images/right.svg"/>
							<input class="file-btn" type="file" hidefocus="true" name="avatar" accept="image/*" @change="getImg($event)" ref="avatarInput"/>
						</span>
					</div>
				</div>
				<div class="info-item">
					<span class="item-name">昵称<span class="tip">*</span></span>
					<input type="text" class="item-input" placeholder="请输入" v-model="myInfo.userName" :disabled="isDisabled"/>
				</div>
				<div class="info-item">
					<span class="item-name">爱宠号</span>
					<input type="text" class="item-input" v-model="myInfo.userNumber" disabled/>
				</div>
				<div class="info-item">
					<span class="item-name">邮箱</span>
					<input type="email" class="item-input" placeholder="请输入" v-model="myInfo.userEmail" :disabled="isDisabled"/>
				</div>
			</div>
			<div class="info">
				<div class="info-item">
					<span class="item-name">性别</span>
					<div class="radio-wrap">
						<label class="yd-radio">
							<input type="radio" value="1" name="sex" v-model="myInfo.userSex" :disabled="isDisabled">
							<span class="yd-radio-icon male">
								<i class="icon"></i>
							</span>
							<span class="yd-radio-text">男</span>
						</label>
						<label class="yd-radio">
							<input type="radio" value="2" name="sex" v-model="myInfo.userSex" :disabled="isDisabled">
							<span class="yd-radio-icon female">
								<i class="icon"></i>
							</span>
							<span class="yd-radio-text">女</span>
						</label>
					</div>
				</div>
				<div class="info-item">
					<span class="item-name">年龄</span>
					<span>
						<span  class="item-input" @click="openAgePicker" :disabled="isDisabled">{{userAge}}</span>
						<span class="link" :hidden="isDisabled"><img src="../../../assets/images/right.svg"/></span>
					</span>
				</div>
				<div class="info-item">
					<span class="item-name">城市</span>
					<span>
						<span  class="item-input" @click="showCityselect = true" :disabled="isDisabled">{{userCity}}</span>
						<span class="link" :hidden="isDisabled"><img src="../../../assets/images/right.svg"/></span>
					</span>
				</div>
				<div class="info-item">
					<span class="item-name">情感状态</span>
					<span>
						<span class="item-input" @click="showuserStatusWindow" :disabled="isDisabled">{{userStatus}}</span>
						<span class="link" :hidden="isDisabled"><img src="../../../assets/images/right.svg"/></span>
					</span>
				</div>
				<div class="info-item">
					<span class="item-name">星座</span>
					<span>
						<span class="item-input"  @click="showuserConstWindow" >{{userConst}}</span>
						<span class="link" :hidden="isDisabled"><img src="../../../assets/images/right.svg"/></span>
					</span>
				</div>
				<div class="info-item info-area">
					<p class="item-name">个人说明<span class="count"> ({{count}}/50)</span></p>
					<textarea  v-model="userInfo.note" maxlength="50" @input="countWord"></textarea>
				</div>
	    		<mt-datetime-picker ref="userBirthPicker" type="date" @confirm="handleUserBirth"
					:startDate="startDate" :endDate="endDate"></mt-datetime-picker>
				<yd-cityselect v-model="showCityselect" :callback="resultCity" :items="district"></yd-cityselect>
			</div>
			<div class="btn-wrap">
				<button class="btn-save" @click="updateUserInfo" :hidden="isDisabled">{{saveBtnText}}</button>
			</div>
			<ImgView v-show="showImgView" :imgSrc="avatar" @clickkit="closeView"></ImgView>
		</div>
		<div v-show="showStatusWindow">
			<Header :title="windowTitle" :headerLeft="windowheaderLeft" @clickRouter="windowback"></Header>
			<ChoiceWindow :dataList="userStatusList" @confirm="confirmStatus"></ChoiceWindow>
		</div>
		<div v-show="showConstWindow">
			<Header :title="windowTitle" :headerLeft="windowheaderLeft" @clickRouter="windowback"></Header>
			<ChoiceWindow :dataList="userConstList" @confirm="confirmConst"></ChoiceWindow>
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';
import ChoiceWindow from '@/components/choiceWindow';
import District from 'ydui-district/dist/gov_province_city_id';
import ImgView from '@/components/imageView';
import { mapGetters } from 'vuex';

export default{
	name:"Myinfo",
	components:{
	    Header,ChoiceWindow, ImgView
	},
	data(){
		return{
			//窗口
			showContentWindow:true,
			showStatusWindow:false,
			showConstWindow:false,

			//主页
			topTitle:'个人信息',
			headerLeft:true,
			isFixed: true,
			myInfo:{},
			userInfoText:{},
			isDisabled: false,
			avatar:null,
			showCityselect:false,
			district:District,

			files:'',
			userAge:'',
			userStatus:'',
			userConst:'',
			userCity:'',
			count:'',
			showImgView: false,
			imgSrc:'',
			isSaving:false,
			saveBtnText:'保存修改',
			/*出生日期范围*/
			startDate:new Date('1960,1,1'),
			endDate:new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate()),
			/*selectWindow*/
			windowTitle:'',
			windowheaderLeft:'',

			userStatusList:[{
			      text: '单身', value: 1, isChecked:false
			   },{
			      text: '恋爱', value: 2, isChecked:false
			   },{
			      text: '貌似恋爱',value: 3, isChecked:false
			   },{
			   	  text: '已婚', value:4, isChecked:false
			   },{
			   	  text: '分居', value:5, isChecked:false
			   },{
			   	  text: '离异', value:6, isChecked:false
			   },{
			   	  text: '保密', value:7, isChecked:false
			   }],
			userConstList:[{
			      text: '水瓶座', value: 1, isChecked:false
			   },{
			      text: '双鱼座', value: 2, isChecked:false
			   },{
			      text: '白羊座',value: 3, isChecked:false
			   },{
			   	  text: '金牛座', value:4, isChecked:false
			   },{
			   	  text: '双子座', value:5, isChecked:false
			   },{
			   	  text: '巨蟹座', value:6, isChecked:false
			   },{
			   	  text: '狮子座', value:7, isChecked:false
			   },{
			   	  text: '处女座', value:8, isChecked:false
			   },{
			   	  text: '天枰座', value:9, isChecked:false
			   },{
			   	  text: '天蝎座', value:10, isChecked:false
			   },{
			   	  text: '射手座', value:11, isChecked:false
			   },{
			   	  text: '摩羯座', value:12, isChecked:false
			   }],

			formData:{
				id:null,
				userAvatar:null,
				userName:null,
				userEmail:null,
				userSex:null,
				userBirth:null,
				userCity:null,
				userStatus:null,
				userConst:null,
				userNote:null
			}
		}
	},
	computed:{
		...mapGetters([
			'id',
			'userInfo',
		])
	},
	mounted(){
		this.getUserdetail();
	},
	methods:{
		back: function(){
			let vm = this;
			vm.$router.go(-1);
		},
		windowback: function(){
			let vm = this;
			vm.showContentWindow = true;
			vm.showStatusWindow = false;
			vm.showConstWindow = false;
		},

		getUserdetail:function(){
			let vm = this;
			vm.myInfo = JSON.parse(JSON.stringify(vm.userInfo));
			vm.avatar = vm.myInfo.userAvatar == null? '':JSON.parse(vm.myInfo.userAvatar).fileUrl;
			vm.myInfo.userBirth = vm.utils.changeDate(vm.myInfo.userBirth);
			vm.userAge = vm.myInfo.userBirth == null? '请选择':vm.utils.calculateAge(vm.myInfo.userBirth);
			vm.userCity = vm.myInfo.userCity == null? '请选择':vm.myInfo.userCity;
			vm.userStatus = vm.myInfo.userStatus == null? '请选择':vm.config.userStatusList[vm.myInfo.userStatus];
			vm.userConst = vm.myInfo.userConst == null? '请选择':vm.config.userConstList[vm.myInfo.userConst];
			vm.count = vm.myInfo.userNote == null? 0 : vm.myInfo.userNote.length;
		},
		previewImg: function(){
    		this.showImgView = true;
    	},
    	closeView: function(){
    		this.showImgView = false;
    	},
		//个人说明
		countWord: function(){
			let vm = this;
			let len = vm.userInfo.note.length;
			vm.count = len;
		},
		//星座选择
		showuserConstWindow: function(){
			let vm = this;
			vm.showContentWindow = false;
			vm.showConstWindow = true;
			vm.windowTitle = '星座';
			vm.windowheaderLeft = true;
		},
		confirmConst: function(obj){
			let vm = this;
			$.each(vm.userConstList, function(index, item){
					item.isChecked = false;
			})
			obj.isChecked = true;
			vm.userConst = obj.text;
			vm.userInfo.userConst = obj.value;
			setTimeout(function(){
				vm.showContentWindow = true;
				vm.showConstWindow = false;
			},500);
		},
		//情感选择
		showuserStatusWindow: function(){
			let vm = this;
			vm.showContentWindow = false;
			vm.showStatusWindow = true;
			vm.windowTitle = '情感状态';
			vm.windowheaderLeft = true;
		},
		confirmStatus: function(obj){
			let vm = this;
			$.each(vm.userStatusList, function(index, item){
					item.isChecked = false;
			})
			obj.isChecked = true;
			vm.userStatus = obj.text;
			vm.userInfo.userStatus = obj.value;
			setTimeout(function(){
				vm.showContentWindow = true;
				vm.showStatusWindow = false;
			},500);
		},
		//年龄选择
		openAgePicker: function(){
			this.$refs.userBirthPicker.open();
	   	},
	   	handleUserBirth: function(value){
	   		let vm = this;
	   		let d = vm.utils.returnDatetime(value, 'yyyy-MM-dd');
	   		vm.userInfo.userBirth = d;
	   		vm.userAge = vm.utils.calculateAge(d);
	   	},
	   	//城市选择
	   	resultCity: function(ret) {
    		let vm = this;
    		let value = ret.itemName1 + ' ' + ret.itemName2
            vm.userInfo.userCity = value;
            vm.userCity = value
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

    	updateUserInfo: function(){
    		let vm = this;
    		if(vm.isSaving) return;
    		if(!vm.userInfo.userName){
					vm.$toast('昵称未填写');
					return;
			}
    		let partten = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    		let email = vm.userInfo.userEmail;
    		if(email && !partten.test(email)){
    			vm.$toast('请输入正确的邮箱格式');
				return;
    		}

			  var e = vm.files;
      	var url = vm.urls.uploadSingle;
    		var fname = 'avatar'
    		var callback = function(r){
    			vm.userInfo.userAvatar = JSON.stringify(r.data.data);
    			save();
    		}

    		vm.saveBtnText = '正在保存中...';
    		console.log(e);
    		if(e){
    			vm.utils.upload(vm, e, fname, url, callback);
    		}else{
//  			vm.userInfo.userAvatar = JSON.stringify(vm.userInfo.userAvatar);
    			save();
    		}

			function save(){
				$.each(vm.formData, function(prop,value) {
					vm.formData[prop] = vm.myInfo[prop];
				});
	    		var url = vm.urls.updataMyInfo;
	    		var data = vm.formData;
	    		var options = {
					params:{
						userid: data.id
					}
				}
	    		console.log(vm.formData)
	    		var callback = function(r){
					vm.$dialog.toast({
						mes: '修改成功',
	  					icon: 'success',
	  					timeout: 1000
					});
					vm.getUserdetail();
					vm.$store.dispatch('GetUserInfo');
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
#MyInfo{
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
	.first {
		padding-top: 90px;
	}
	.info{
		background: #FFFFFF;
		padding: 0 20px;
		margin-bottom: 20px;
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
		.info-area{
			display: block;
			.count{
				color: #999999;
			}
		    textarea{
		    	margin: 10px 0;
		    	width: 100%;
		    	height: 135px;
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
		margin: 20px 0;
		text-align: center;
		.btn-save{
	    	height: 80px;
	    	line-height: 80px;
	    	display: block;
	    	margin: 0 auto;
	    	width:80%;
	    	font-size: 32px;
		}
	}
}
</style>
