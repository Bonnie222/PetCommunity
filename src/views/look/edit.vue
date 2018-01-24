<template>
	<div id="LookEdit">
		<Header title="发布寻宠/主信息" :headerLeft="headerLeft"></Header>
		<div class="form">
			<div class="form1">
				<textarea placeholder="丢失宠物说明..."></textarea>
				<div class="pic"></div>
			</div>
			<ul class="form2">
				<li class="">
					<label>寻宠寻主</label>
					<div class="radio-wrap">
						<label class="yd-radio" @click="showAgeWindow">
							<input type="radio" value="1" name="type" checked>
							<span class="yd-radio-icon"></span>
							<span class="yd-radio-text">寻宠</span>
						</label>
						<label class="yd-radio" @click="hiddenAgeWindow">
							<input type="radio" value="2" name="type" >
							<span class="yd-radio-icon"></span>
							<span class="yd-radio-text">寻主</span>
						</label>
					</div>			
				</li>
				<li class="">
					<label>{{region}}</label>
					<span class="" @click="">
						请选择
						<i class="icon-right">
							<img src="../../assets/images/right.svg" />
						</i>
					</span>
				</li>
				<li class="">
					<label>详细地址</label>
					<input type="text"  />
				</li>
				<li class="">
					<label>{{time}}</label>
					<span class="" @click="">
						请选择
						<i class="icon-right">
							<img src="../../assets/images/right.svg" />
						</i>
					</span>
				</li>
				<li class="" v-show="showAge">
					<label>宠物年龄</label>
					<span class="" @click="">
						请选择
						<i class="icon-right">
							<img src="../../assets/images/right.svg" />
						</i>
					</span>
				</li>
				<li class="">
					<label>宠物品种</label>
					<span class="" @click="">
						请选择
						<i class="icon-right">
							<img src="../../assets/images/right.svg" />
						</i>
					</span>
				</li>
				<li class="">
					<label>宠物性别</label>
					<div class="radio-wrap">
						<label class="yd-radio">
							<input type="radio" value="1" name="sex" checked>
							<span class="yd-radio-icon"></span>
							<span class="yd-radio-text">GG</span>
						</label>
						<label class="yd-radio">
							<input type="radio" value="2" name="sex" >
							<span class="yd-radio-icon"></span>
							<span class="yd-radio-text">MM</span>
						</label>
						<label class="yd-radio">
							<input type="radio" value="3" name="sex" >
							<span class="yd-radio-icon"></span>
							<span class="yd-radio-text">未知</span>
						</label>
					</div>			
				</li>
				<li class="">
					<label>联系方式</label>
					<input type="text" placeholder="请输入" />
				</li>
			</ul>
		</div>
		<div class="btn-wrap">
			<button class="btn-save" @click="">确认发布</button>
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';

export default{
	name:"LookEdit",
	components:{
	    Header
	},
	data(){
		return{
			headerLeft:true,
			region:'丢失地区',
			time:'丢失时间',
			showAge:true,
			
		}
	},
	methods:{
		showAgeWindow: function(){
			this.showAge = true;
			this.region = '丢失地区';
			this.time = '丢失时间';
		},
		hiddenAgeWindow: function(){
			this.showAge = false;
			this.region = '捡宠地区';
			this.time = '捡宠时间';
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
			textarea{
				font-size: 26px;
				padding: 5px 25px 0;
				width: 100%;
				min-height: 300px;
				border: none;
			}
			.pic{
				background: #FFFFFF;
				height: 100px;
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