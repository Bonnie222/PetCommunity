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
				    
					</span>
				</div>
				<div class="info-item">
					<span class="item-name">宠物生日<span class="tip">*</span></span>
					<input type="text" class="item-input" placeholder="选择宠物生日" @click="openDatePicker" v-model="petInfo.petBirth"/>
					
					 <!--<yd-cell-item>
			            <yd-datetime type="date" v-model="datetime4" slot="right"></yd-datetime>
			        </yd-cell-item>-->
				</div>
				<div class="info-item">
					<span class="item-name">到家时间</span>
					<input type="text"  class="item-input" placeholder="选择到家日期" @click="openArrivalPicker" v-model="petInfo.petArrivedDate"/>
				</div>
				<div class="info-item">
					<span class="item-name">绝育状态</span>
					<input type="text" class="item-input" value="" placeholder="选择绝育状态" @click="aa"/>
				</div>
			</div>
			<!--选择器-->
			<mt-datetime-picker ref="petBirthPicker" type="date" @confirm="handlePetBirth"
				:startDate="startDate" :endDate="endDate"></mt-datetime-picker>
			<mt-datetime-picker ref="petArrivalPicker" type="date" @confirm="handlePetArrival"
			:startDate="startDate" :endDate="endDate"></mt-datetime-picker>
			
		</div>
		
		<div class="btn-wrap">
			<button class="btn-save" >保存</button>
		</div>
		
		 
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
			petInfo:{
				petName:'',
				petSex:'',
				petBirth:'',
				petArrivedDate:'',
			},
			/*宠物出生日期范围*/
			startDate:new Date('1990,1,1'),
			endDate:new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate()),
		}
	},
	methods:{
		 onValuesChange: function(picker, values) {
		 	console.log(picker, values);
	      if (values[0] > values[1]) {
	        picker.setSlotValue(1, values[0]);
	      }
	   	},
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
	   	aa: function(){
//	   		this.$toast({
//			  message: '操作成功',
//			  iconClass: 'icon icon-success'
//			});
//this.$messagebox('11','ss');
	   		this.utils.confirm(this,'aa', '/home', true);
//	   		console.log(this.$dialog);
//this.$dialog.confirm({
//                  title: '选填标题',
//                  mes: '我有一个小毛驴我从来也不骑！',
//                  opts: () => {
//                      this.$dialog.toast({mes: '你点了确定', timeout: 1000});
//                  }
//              });
//
	   	}
		 
	}
}
</script>

<style lang="less" scoped>
#Addpet{
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