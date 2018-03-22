<template>
	<div id="ActivityAdd">
		<Header title="发布活动" :headerLeft="headerLeft" :fixed="isFixed"
			@clickRouter="back"></Header>
		<div class="header-wrap">
			<div class="pic-wrap">
				<div class="actPhoto">
					<img :src="avatar" v-if="avatar"/>
					<span>
						<button class="uploadBtn" v-if="!avatar">点击上传活动封面</button>
						<input class="file-btn" type="file" hidefocus="true" name="picture"
							accept="image/*" @change="getImg($event)"/>
					</span>
				</div>
				<div class="userInfo">
					<span class="userPic">
						<img :src="userAvatar" v-if="userInfo.userAvatar"/>
						<img src="../../assets/images/member.png" v-else/>
					</span>
					<span class="username">{{userInfo.userName}} 发起</span>
				</div>
			</div>
		</div>
		<ul class="form2">
			<li class="input1">
				<label><i class="iconfont icon-listziyouhuodong bold"></i></label>
				<input type="text" placeholder="请输入活动名称(15字以内)"
					v-model="editList.actTitle"/>
			</li>
			<!--<li class="input2">
				<label><i class="iconfont icon-kaishijiuyuan"></i>报名开始时间</label>
				<span class="" @click="">
					<i class="icon-right">
						<img src="../../assets/images/right.svg" />
					</i>
				</span>
			</li>
			<li class="input2">
				<label><i class="iconfont icon-zanting"></i>报名结束时间</label>
				<span class="" @click="">
					<i class="icon-right">
						<img src="../../assets/images/right.svg" />
					</i>
				</span>
			</li>-->
			<li class="input2">
				<label><i class="iconfont icon-kaishijiuyuan"></i>活动开始时间</label>
				<span class="" @click="openStartTimePicker">
					{{editList.startTime == null ? '请选择' : editList.startTime}}
					<i class="icon-right">
						<img src="../../assets/images/right.svg" />
					</i>
				</span
			</li>
			<li class="input2">
				<label><i class="iconfont icon-plus-stop"></i>活动结束时间</label>
				<span class="" @click="openEndTimePicker">
					{{editList.endTime == null ? '请选择' : editList.endTime}}
					<i class="icon-right">
						<img src="../../assets/images/right.svg" />
					</i>
				</span
			</li>
			<li class="input2">
				<label><i class="iconfont icon-listzhusu"></i>选择活动城市</label>
				<span class="" @click="showCityselect = true">
					{{editList.city == null ? '请选择' : editList.city}}
					<i class="icon-right">
						<img src="../../assets/images/right.svg" />
					</i>
				</span
			</li>
			<li class="input1">
				<label><i class="iconfont icon-weizhib"></i></label>
				<input type="text"  placeholder="请输入活动地点" v-model="editList.address"/>
			</li>
			<li class="input1">
				<label><i class="iconfont icon-dianhua bold"></i></label>
				<input type="text" placeholder="请输入联系方式" v-model="editList.contact"/>
			</li>
		</ul>
		<ul class="form2">
			<li class="input3">
				<label><i class="iconfont icon-ren2 bold"></i>活动人数:</label>
				<input type="text" placeholder="请输入人数" name="number"  v-model="editList.actNum" />
				<div class="radio-wrap">
					<label class="yd-radio">
						<input type="radio" value="不限" name="number" v-model="editList.actNum">
						<span class="yd-radio-icon"></span>
						<span class="yd-radio-text">不限</span>
					</label>
				</div>
			</li>
			<li class="input3">
				<label><i class="iconfont icon-qian1"></i>活动费用:</label>
				<input type="text" placeholder="请输入费用" v-model="editList.cost"/>
				<div class="radio-wrap">
					<label class="yd-radio">
						<input type="radio" value="免费" name="cost"  v-model="editList.cost">
						<span class="yd-radio-icon"></span>
						<span class="yd-radio-text">免费</span>
					</label>
				</div>
			</li>
		</ul>
		<ul class="form2">
			<!-- <li class="input2">
				<label><i class="iconfont icon-huodong11"></i>选择活动主题</label>
				<span class="" @click="">
					<i class="icon-right">
						<img src="../../assets/images/right.svg" />
					</i>
				</span
			</li> -->
			<li class="input4">
				<label><i class="iconfont icon-huodong11"></i>活动说明</label>
				<textarea  placeholder="请输入本次活动的主要说明，注意事项等"  v-model="notes"></textarea>
			</li>
		</ul>
		<yd-cityselect v-model="showCityselect" :callback="resultCity" :items="district"></yd-cityselect>
		<mt-datetime-picker ref="showStartTime" type="datetime"
			@confirm="handleStartTime" :startDate="startDate"></mt-datetime-picker>
		<mt-datetime-picker ref="showEndTime" type="datetime"
			@confirm="handleEndTime" :startDate="endDate"></mt-datetime-picker>
		<div class="btn-wrap">
			<button class="btn-save" @click="saveToPublish">{{saveBtnText}}</button>
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';
import District from 'ydui-district/dist/gov_province_city_id';
import { mapGetters } from 'vuex';

export default{
	name:'ActivityDetail',
	components:{
		Header,
	},
	data(){
		return{
			isFixed:true,
			headerLeft:true,
			isSaving:false,
			showCityselect: false,
			saveBtnText:'确认发布',
			startDate:new Date(this.utils.getNowTime()),
			endDate:new Date(this.utils.getNowTime()),
			district:District,
			// userInfo:{},
			userAvatar:null,
			avatar:null,
			files:null,
			notes:null,
			editList:{
				themePhoto:'',
				actTitle:'',
				actType:3,
				startTime:null,
				endTime:null,
				city:null,
				address:null,
				contact:null,
				actNum:null,
				cost:null,
			},
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
		getImg(e){
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
    	openStartTimePicker() {
    		this.$refs.showStartTime.open();
    	},
    	handleStartTime(value) {
    		let vm = this;
	   		vm.editList.startTime = vm.utils.returnDatetime(value, 'yyyy-MM-dd hh:mm');
    	},
    	openEndTimePicker() {
    		let vm = this;
    		if(vm.editList.startTime){
    			vm.endTime = new Date(vm.editList.startTime);
    			vm.$refs.showEndTime.open();
    		}else{
    			vm.$toast('请先选择活动开始时间');
    		}

    	},
    	handleEndTime(value){
    		let vm = this;
			vm.editList.endTime = vm.utils.returnDatetime(value, 'yyyy-MM-dd hh:mm');
    	},
    	resultCity(ret) {
  			let vm = this;
        vm.editList.city = ret.itemName1 + ' ' + ret.itemName2;
     	},
     	focusNumeberText(){
     		let vm = this;
     		$(vm).siblings("input[type='radio']").attr("checked", true);

     	},
    	saveToPublish() {
    		let vm = this;
    		if(vm.isSaving) return;
				let data = vm.editList;
				console.log(data);
				if(!data.actTitle || !data.address || !data.startTime || !data.endTime ||
					!vm.notes || !data.contact || !data.city || !data.actNum || !data.cost ){
						vm.$toast('信息填写不完整');
						return;
				}
				if(!vm.avatar){
					vm.$toast('请上传活动封面');
					return;
				}
				let partten = /^$|^1(3|4|5|7|8)\d{9}$/;
	    		if(!partten.test(data.contact)){
	    			vm.$toast('请输入正确的手机联系方式');
						return;
	    		}

	    		let e = vm.files;
	      	let url = vm.urls.uploadSingle;
	    		let fname = 'avatar';
	    		vm.isSaving = true;
					vm.saveBtnText = '正在发布中...';
	    		let callback = function(r){
	    			vm.editList.themePhoto = JSON.stringify(r.data.data);
	    			save();
	    		}
	    		vm.utils.upload(vm, e, fname, url, callback);

	    		const save = () => {
	    			let url = vm.urls.addActivity;
						data.publisherId = vm.id;
						data.publisher = vm.userInfo.userName;
						data.createTime = vm.utils.getNowTime();
						data.notes = vm.notes.replace(/\n|\r\n/g,"<br/>");

						let callback = function(r){
							vm.isSaving = false;
							vm.saveBtnText = '确认发布';
							vm.$dialog.toast({
								mes: '发布成功',
			  					icon: 'success',
			  					timeout: 1000
							});
							setTimeout(function(){
								vm.$router.replace('/activity/list/3');
							},1500);
						}
						console.log(data);
						vm.utils.postData(url, data, callback);
	    		}
    	}
	}
}
</script>

<style lang="less" scoped>
#ActivityAdd{
	.bold{
		font-weight: bold;
	}
	.mint-header{
		background: #FFFFFF;
		border-bottom:1px solid #CCCCCC; /*no*/
		color: #333333;
	}
	.header-wrap{
		padding-top: 90px;
		background: #FFFFFF;
		padding-bottom: 70px;
		.pic-wrap{
			background: #EB695C;
			/*opacity: .7;*/
			margin: 20px;
			height: 500px;
			.actPhoto{
				position: relative;
				width:100%;
				height: 100%;
				text-align:  center;
				img{
					width: inherit;
					height: inherit;
				}
				.uploadBtn{
					background: #FFFFFF;
					margin-top: 200px;
					padding: 25px 20px;
					border: none;
					border-radius: 10px;
					font-size: 30px;
				}
				input[type=file]{
					position: absolute;
					left: 0;
					top:0;
					z-index: 1;
					width: 100%;
					height: 85%;
					font-size: 28px;
					opacity: 0;
					cursor: pointer;
				}
			}
		}
		.userInfo{
			height: 100px;
			position: relative;
			.userPic{
				position: absolute;
				top:-50px;
				left:50px;
				display: inline-block;
				width: 110px;
				height: 110px;
				border-radius: 50%;
				border: 2px solid #ffffff;/*no*/
				overflow: auto;
				img{
					width: inherit;
					height: inherit;
				}
			}
			.username{
				display: inline-block;
				font-size: 34px;
				margin-top: 12px;
				margin-left: 170px;
			}
		}
	}
	.form2{
			background: #ffffff;
			padding: 0 20px;
			border-bottom: 1px solid #E4E4E4;/*no*/
			font-size: 30px;
			color: #333333;
			margin-bottom: 20px;
			.input1{
				display:flex;
				align-items: center;
				input{
					width: 100%;
				}
			}
			.input2{
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.input3{
				display: flex;
				align-items: center;
				label{
					margin-right: 10px;
				}
				input{
					width: 180px;
				}
			}
			.input4{
				display: flex;
				flex-direction: column;
				textarea{
					border: none;
					margin-top:10px;
					height: 300px;
					&::placeholder{
						color: #CCCCCC;
					}
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
		.radio-wrap{
			.yd-radio{
				display: inline-block;
				width: 130px;
				line-height: 38px;
				position: relative;
			}
			.yd-radio-icon{
				position: absolute;
				width: 40px;
				height: 40px;
				margin-right: 2px;

			}
			& input[type=radio]{
				display: inline-block;
				/*margin-right: 15px;*/
				opacity: 0;
			}


			& input[type=radio]:checked+.yd-radio-icon{
				background: url(../../assets/images/radioChecked.png);
				background-size: cover;
			}
			.yd-radio-text{
				display: inline-block;
				margin-left: 45px;
				font-size: 30px;
				color: #666;
			}

		}
	.iconfont{
		color: red;
		font-size:46px;
		margin-right: 20px;
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
