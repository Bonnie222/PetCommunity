<template>
	<div id="Addpet">
		<Header title="添加宠物" :headerLeft="headerLeft"></Header>
		<div class="form">
			<div class="pic">
				<span class="imgPic">
					<img src="" />
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
						<input type="text" class="item-input" :value="petTypeText" placeholder="选择宠物品种" @click="petTypePicker=true"/>
						<span class="link"><img src="../../assets/images/right.svg"/></span>
					</span>
				</div>
				<div class="info-item">
					<span class="item-name">宠物生日<span class="tip">*</span></span>
					<span>
						<input type="text" class="item-input" placeholder="选择宠物生日" @click="openDatePicker" v-model="petInfo.petBirth"/>
						<span class="link"><img src="../../assets/images/right.svg"/></span>
					</span>
				</div>
				<div class="info-item">
					<span class="item-name">到家时间</span>
					<span>
						<input type="text"  class="item-input" placeholder="选择到家日期" @click="openArrivalPicker" v-model="petInfo.petArrivedDate"/>
						<span class="link"><img src="../../assets/images/right.svg"/></span>
					</span>
				</div>
				<div class="info-item">
					<span class="item-name">绝育状态</span>
					<span>
						<input type="text" class="item-input" :value="petStatusText" placeholder="选择绝育状态" @click="petStatusPicker=true"/>
						<span class="link"><img src="../../assets/images/right.svg"/></span>
					</span>
				</div>
			</div>
			<!--选择器-->
			<mt-datetime-picker ref="petBirthPicker" type="date" @confirm="handlePetBirth"
				:startDate="startDate" :endDate="endDate"></mt-datetime-picker>
			<mt-datetime-picker ref="petArrivalPicker" type="date" @confirm="handlePetArrival"
			:startDate="startDate" :endDate="endDate"></mt-datetime-picker>
			<vue-pickers :show="petStatusPicker" :selectData="petStatusList"  v-on:cancel="closeStatusPicker"
    		v-on:confirm="confirmStatusPicker"></vue-pickers>
    		<vue-pickers :show="petTypePicker" :selectData="petTypeList"  v-on:cancel="closeTypePicker"
    		v-on:confirm="confirmTypePicker"></vue-pickers>
			
		</div>
		
		<div class="btn-wrap">
			<button class="btn-save" @click="savePetInfo">保存</button>
		</div>
		
	</div>
</template>

<script>
import Header from '@/components/header';
import VuePickers from 'vue-pickers';

export default{
	name:"Mypet",
	components:{
	    Header,VuePickers
	},
	data(){
		return{
			headerLeft: true,
			petTypePicker:false,
			petStatusPicker: false,
			petTypeText:'',
			petStatusText:'',
			
			petInfo:{
				petAvatar:null,
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
			petStatusList: {
			  columns: 1, // picker的列数
			  // 第一列的数据结构
			  pData1: [{
				      text: '未绝育',
				      value: 1
				   },{
				      text: '已绝育',
				      value: 2
				   },{
				      text: '不确定',
				      value: 3
				   }]
			}
		}
	},
	methods:{
	   	openDatePicker: function(){
	   		this.$refs.petBirthPicker.open();
	   	},
	   	handlePetBirth: function(value){
	   		var d = value.getFullYear() + '-' + (value.getMonth()+1) + '-' + value.getDate();
	   		d = this.utils.formatDate(d, 'yyyy-MM-dd');
	   		this.petInfo.petBirth = d;
	   	},
	   	openArrivalPicker: function(){
	   		this.$refs.petArrivalPicker.open();
	   	},
	   	handlePetArrival: function(value){
	   		var d = value.getFullYear() + '-' + (value.getMonth()+1) + '-' + value.getDate();
	   		d = this.utils.formatDate(d, 'yyyy-MM-dd');
	   		this.petInfo.petArrivedDate = d;
	   	},
	   	closeStatusPicker: function(){
	   		this.petStatusPicker = false;
    	},
    	confirmStatusPicker: function(obj){
    		this.petStatusText = obj.select1.text;
    		this.petInfo.petStatus = obj.select1.value;
    		this.petStatusPicker = false;
    	},
    	closeTypePicker: function(){
	   		this.petTypePicker = false;
    	},
    	confirmTypePicker: function(obj){
    		this.petTypeText = obj.select1.text;
    		this.petInfo.petType = obj.select1.value;
    		this.petTypePicker = false;
    	},
	   	savePetInfo: function(){
	   		var vm = this;
			if(!vm.petInfo.petName || !vm.petInfo.petSex || 
				!vm.petInfo.petType || !vm.petInfo.petBirth){
					vm.$toast('信息填写不完整');
					return;
			}
			var dt = JSON.parse(window.sessionStorage.userInfo);
			var url = vm.urls.addPet;
			var data = vm.petInfo;
			data.petBelongId = dt.id;
			data.petCreateDate = vm.utils.getNowDate();
			
			var callback = function(r){
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
				background: yellow;
				height: 130px;
				width: 130px;
				margin-top: 30px;
				border-radius: 50%;
				overflow:hidden;
				img{
					height: inherit;
					width: inherit;
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
				font-size:30px;
				color: #666666;
				padding:20px 5px;
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
	    	width: 90%;
	    }
	}
	
}
</style>