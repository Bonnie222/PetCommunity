<template>
	<div id="LookEdit">
		<Header title="发布寻宠/主信息" :headerLeft="headerLeft" @clickRouter="back"></Header>
		<div class="form">
			<div class="form1">
				<textarea placeholder="宠物说明..." v-model="notes" maxlength="255" @input="countWord"></textarea>
				<p>{{count}}/255</p>
				<div class="pic">
					<span class="addBtn" v-for="(item, index) in picList" v-if="picList.length!=0">
						<img :src="item.picture" @click="previewImg(index)"/>
						<img src="../../assets/images/removeImg.svg" class="remove" @click="removeImg(index)"/>
					</span>
					<span class="addBtn" v-show="picList.length != 3">
						<img src="../../assets/images/tianjia.png" />
						<input class="file-btn" type="file" hidefocus="true" name="picture" accept="image/*" @change="getImg($event)"/>
					</span>
				</div>
			</div>
			<ul class="form2">
				<li class="">
					<label>寻宠寻主</label>
					<div class="radio-wrap">
						<label class="yd-radio">
							<input type="radio" value="1" name="type" v-model="editList.isFindPet">
							<span class="yd-radio-icon"></span>
							<span class="yd-radio-text">寻宠</span>
						</label>
						<label class="yd-radio">
							<input type="radio" value="2" name="type" v-model="editList.isFindPet">
							<span class="yd-radio-icon"></span>
							<span class="yd-radio-text">寻主</span>
						</label>
					</div>			
				</li>
				<li class="">
					<label>{{editList.isFindPet == 1 ? '丢失地区' : '捡宠地区'}}</label>
					<span class="" @click="showCityselect = true">
						{{editList.region == '' ? '请选择' : editList.region}}
						<i class="icon-right">
							<img src="../../assets/images/right.svg" />
						</i>
					</span>
				</li>
				<li class="">
					<label>详细地址</label>
					<input type="text"  v-model="editList.address"/>
				</li>
				<li class="">
					<label>{{editList.isFindPet == 1 ? '丢失时间' : '捡宠时间'}}</label>
					<span class="" @click="openTimePicker">
						{{editList.dateTime == '' ? '请选择' : editList.dateTime}}
						<i class="icon-right">
							<img src="../../assets/images/right.svg" />
						</i>
					</span>
				</li>
				<li class="" v-if="editList.isFindPet == 1">
					<label>宠物年龄</label>
					<span class="" @click="petAgePicker=true">
						{{petAgeText == '' ? '请选择':petAgeText}}
						<i class="icon-right">
							<img src="../../assets/images/right.svg" />
						</i>
					</span>
				</li>
				<li class="">
					<label>宠物品种</label>
					<span class="" @click="petTypePicker=true">
						{{petTypeText == '' ? '请选择':petTypeText}}
						<i class="icon-right">
							<img src="../../assets/images/right.svg" />
						</i>
					</span>
				</li>
				<li class="">
					<label>宠物性别</label>
					<div class="radio-wrap">
						<label class="yd-radio">
							<input type="radio" value="1" name="sex" checked v-model="editList.petSex">
							<span class="yd-radio-icon"></span>
							<span class="yd-radio-text">GG</span>
						</label>
						<label class="yd-radio">
							<input type="radio" value="2" name="sex" v-model="editList.petSex">
							<span class="yd-radio-icon"></span>
							<span class="yd-radio-text">MM</span>
						</label>
						<label class="yd-radio">
							<input type="radio" value="3" name="sex" v-model="editList.petSex">
							<span class="yd-radio-icon"></span>
							<span class="yd-radio-text">未知</span>
						</label>
					</div>			
				</li>
				<li class="">
					<label>联系方式</label>
					<input type="text" placeholder="请输入" v-model="editList.contact"/>
				</li>
			</ul>
			<!--选择器-->
			<yd-cityselect v-model="showCityselect" :callback="resultCity" :items="district"></yd-cityselect>
			<mt-datetime-picker ref="showDatetime" type="datetime" @confirm="handleDatetime"
				:endDate="endDate"></mt-datetime-picker>
			<vue-pickers :show="petTypePicker" :selectData="petTypeList"  v-on:cancel="closeTypePicker"
    		v-on:confirm="confirmTypePicker"></vue-pickers>
    		<vue-pickers :show="petAgePicker" :selectData="petAgeList"  v-on:cancel="closeAgePicker"
    		v-on:confirm="confirmAgePicker"></vue-pickers>
		</div>
		<div class="btn-wrap">
			<button class="btn-save" @click="saveToPublish">{{saveBtnText}}</button>
		</div>
		<ImgView v-show="showImgView" :imgSrc="avatar" @clickkit="closeView"></ImgView>
	</div>
</template>

<script>
import Header from '@/components/header';
import District from 'ydui-district/dist/gov_province_city_area_id';
import VuePickers from 'vue-pickers';
import ImgView from '@/components/imageView';

export default{
	name:"LookEdit",
	components:{
	    Header,VuePickers, ImgView
	},
	data(){
		return{
			headerLeft:true,
			isSaving:false,
			saveBtnText:'确认发布',
			petTypePicker: false,
			petTypeText:'',
			petAgePicker: false,
			petAgeText:'',
			showCityselect:false,
			district:District,
			notes:'',
			count:0,
			files:[],
			avatar:'',
			showImgView:false,
			picList:[],
			editList:{
				isFindPet:1,
				region:'',
				address:'',
				dateTime:'',
				petSex:1,
				petType:'',
				petAge:0,
				petAvatar:'',
				note:'',
				contact:'',
				findStatus:1				
			},
			endDate:new Date(this.utils.getNowTime()),
			petTypeList:{
				columns: 1, // picker的列数
				pData1:[{
					text:'汪星人',
					value:1
				},{
					text:'喵星人',
					value:2
				},{
					text:'兔星人',
					value:3
				},{
					text:'鼠星人',
					value:4
				},{
					text:'鸟星人',
					value:5
				},{
					text:'龟星人',
					value:6
				},{
					text:'鱼星人',
					value:7
				},{
					text:'其它',
					value:8
				}]
			},
			petAgeList:{
				columns: 1,
				pData1:[{
					text:'小于1岁',
					value:1
				},{
					text:'1岁',
					value:2
				},{
					text:'2岁',
					value:3
				},{
					text:'3岁',
					value:4
				},{
					text:'4岁',
					value:5
				},{
					text:'5岁',
					value:6
				},{
					text:'6岁',
					value:7
				},{
					text:'7岁',
					value:8
				},{
					text:'8岁',
					value:9
				},{
					text:'9岁',
					value:10
				},{
					text:'10岁以上',
					value:11
				}]
			}
		}
	},
	methods:{
		back:function(){
			this.$router.go(-1);
		},
		countWord: function(){
			var len = this.notes.length;
			this.count = len;
		},
		previewImg: function(index){
			this.avatar = this.picList[index].picture;
    		this.showImgView = true;
    	},
    	closeView: function(){
    		this.showImgView = false;
    	},
    	removeImg: function(index){
    		let list = this.picList;
    		let fileslist = this.files;
    		list = list.splice(index, 1);
    		fileslist = fileslist.splice(index, 1)
    	},
		resultCity: function(ret) {
            this.editList.region = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
       	},
       	openTimePicker:function(){
       		this.$refs.showDatetime.open();
       	},
       	handleDatetime: function(value){
       		var d = value.getFullYear() + '-' + (value.getMonth()+1) + '-' + value.getDate() + ' ' + value.getHours() + ':' + value.getMinutes() 
	   		d = this.utils.formatDate(d, 'yyyy-MM-dd hh:mm');
	   		this.editList.dateTime = d;
       	},
       	closeTypePicker: function(){
	   		this.petTypePicker = false;
    	},
    	confirmTypePicker: function(obj){
    		this.petTypeText = obj.select1.text;
    		this.editList.petType = obj.select1.value;
    		this.petTypePicker = false;
    	},
    	closeAgePicker: function(){
	   		this.petAgePicker = false;
    	},
    	confirmAgePicker: function(obj){
    		this.petAgeText = obj.select1.text;
    		this.editList.petAge = obj.select1.value;
    		this.petAgePicker = false;
    	},
    	getImg: function(e){
    		var vm = this;
    		var file = e.target.files[0];
    		let fileslist = vm.files;
    		fileslist = fileslist.push(file);
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
    			let pic = {};
    			let list = vm.picList;
    			pic.picture = this.result;
    			list = list.push(pic);
    		}
    	},
    	saveToPublish: function(){
    		var vm = this;
    		if(vm.isSaving) return;
    		var dt = window.sessionStorage.userInfo;
			var data = vm.editList;
			if(!data.region || !data.address || !data.dateTime ||
				!data.petType || !vm.notes || !data.contact){
					vm.$toast('信息填写不完整');
					return;
			}
			var partten = /^$|^1(3|4|5|7|8)\d{9}$/;
    		if(!partten.test(data.contact)){
    			vm.$toast('请输入正确的手机联系方式');
					return;
    		}
    		
    		var e = vm.files;
      		var url = vm.urls.uploadArray;
    		var fname = 'picture';
    		vm.isSaving = true;
			vm.saveBtnText = '正在发布中...';
    		var callback = function(r){
    			vm.editList.petAvatar = JSON.stringify(r.data.data);
    			save();
    		}		
    		vm.utils.uploadMore(vm, e, fname, url, callback);
    		
    		function save(){
    			var url = vm.urls.addLook;
    			data.userInfo = dt;
				data.userId = JSON.parse(dt).id;
				data.createTime = vm.utils.getNowTime();
				data.note = vm.notes.replace(/\n|\r\n/g,"<br/>");

				var callback = function(r){
					vm.isSaving = false;
					vm.saveBtnText = '确认发布';
					vm.$dialog.toast({
						mes: '添加成功',
	  					icon: 'success',
	  					timeout: 1000
					});	
					setTimeout(function(){
						vm.$router.go(-1);
					},1500);
				}
				vm.utils.postData(url, data, callback);
    		}

    	}
	}
}
</script>

<style lang="less" scoped>
#LookEdit{
	.mint-header{
		background: #FFFFFF;
		border-bottom:1px solid #CCCCCC; /*no*/
		color: #333333;
	}
	.form{
		.form1{
			font-size: 0px;
			border-bottom: 1px solid #E4E4E4;/*no*/
			margin-bottom: 20px;
			background: #FFFFFF;
			textarea{
				font-size: 28px;
				padding: 10px 20px 0;
				width: 100%;
				min-height: 300px;
				border: none;
				
			}
			textarea::placeholder{
				color:#999999;
			}
			p{
				font-size: 26px;
				color: #999999;
				text-align: right;
				padding: 10px 20px;
			}
			.pic{
				
				height: 130px;
				padding: 10px;
				.addBtn{
					position: relative;
					display: inline-block;
					width: 110px;
					height: 110px;
					margin-right:10px;
					&:last-child{
						margin: 0;
					}
					img{
						width: inherit;
						height: inherit;
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
					position: absolute;
					left: 0;
					top:30%;
					z-index: 1;
					width: 100%;
					height: 100%;
					font-size: 28px;
					opacity: 0;
					cursor: pointer;
				}
			}
		}
		.form2{
			background: #ffffff;
			padding: 0 25px;
			border-top: 1px solid #E4E4E4;/*no*/
			border-bottom: 1px solid #E4E4E4;/*no*/	
			font-size: 30px;
			color: #333333;
			& li{
				display: flex;
				justify-content: space-between;
				padding: 30px 5px;
				border-bottom: 1px solid #e4e4e4; /*no*/
				&:last-child{
					border: none;
				}
				label{
					display: inline-block;
					width: 120px;
					text-align: left;
					color: #666666;
				}
				input{
					width: 500px;
					text-align: right;
					
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
				/*background: url(../../assets/images/radioNotCheck.png);
				*/
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
	}
	.btn-wrap{
		margin-top: 50px;
	    .btn-save{
	    	display: block;
	    	margin: 0 auto;
	    	width: 80%;
	    }
	}
}
</style>