<template>
	<div id="ActivityAdd">
		<Header title="发布活动" :headerLeft="headerLeft" :fixed="isFixed" @clickRouter="back"></Header>
		<div class="header-wrap">
			<div class="pic-wrap">
				<div class="actPhoto">
					<img :src="avatar" v-if="avatar"/>
					<span>
						<button class="uploadBtn" v-if="!avatar">点击上传活动封面</button>
						<input class="file-btn" type="file" hidefocus="true" name="picture" accept="image/*" @change="getImg($event)"/>
					</span>
				</div>
				<div class="userInfo">
					<span class="userPic">
						<img src="" v-if="userInfo.userAvatar"/>
						<img src="../../assets/images/member.png" v-else/>
					</span>
					<span class="username">{{userInfo.userName}} 发起</span>
				</div>
			</div>
		</div>
		<ul class="form2">
			<li class="input1">
				<label><i class="iconfont icon-listziyouhuodong bold"></i></label>	
				<input type="text" placeholder="请输入活动名称(15字以内)" v-model="editList.actTitle"/>
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
				<span class="" @click="">
					<i class="icon-right">
						<img src="../../assets/images/right.svg" />
					</i>
				</span
			</li>
			<li class="input2">
				<label><i class="iconfont icon-plus-stop"></i>活动结束时间</label>
				<span class="" @click="">
					<i class="icon-right">
						<img src="../../assets/images/right.svg" />
					</i>
				</span
			</li>
			<li class="input2">
				<label><i class="iconfont icon-listzhusu"></i>选择活动城市</label>
				<span class="" @click="">
					<i class="icon-right">
						<img src="../../assets/images/right.svg" />
					</i>
				</span
			</li>
			<li class="input1">
				<label><i class="iconfont icon-weizhib"></i></label>
				<input type="text"  placeholder="请输入活动地点"/>
			</li>
			<li class="input1">
				<label><i class="iconfont icon-dianhua bold"></i></label>
				<input type="text" placeholder="请输入联系方式" />
			</li>
		</ul>
		<ul class="form2">
			<li class="input3">
				<label><i class="iconfont icon-ren2 bold"></i>活动人数:</label>
				<input type="text" placeholder="请输入人数" />
				<div class="radio-wrap">
					<label class="yd-radio">
						<input type="radio" value="不限" name="number">
						<span class="yd-radio-icon"></span>
						<span class="yd-radio-text">不限</span>
					</label>
				</div>	
			</li>
			<li class="input3">
				<label><i class="iconfont icon-qian1"></i>活动费用:</label>
				<input type="text" placeholder="请输入费用" />
				<div class="radio-wrap">
					<label class="yd-radio">
						<input type="radio" value="免费" name="cost">
						<span class="yd-radio-icon"></span>
						<span class="yd-radio-text">免费</span>
					</label>
				</div>
			</li>
		</ul>
		<ul class="form2">
			<li class="input2">
				<label><i class="iconfont icon-huodong11"></i>选择活动主题</label>
				<span class="" @click="">
					<i class="icon-right">
						<img src="../../assets/images/right.svg" />
					</i>
				</span	
			</li>
			<li class="input4">
				<label><i class="iconfont icon-qian1"></i>活动说明</label>
				<textarea  placeholder="请输入本次活动的主要说明，注意事项等"></textarea>
			</li>
		</ul>
		<div class="btn-wrap">
			<button class="btn-save" @click="">{{saveBtnText}}</button>
		</div>	
	</div>
</template>

<script>
import Header from '@/components/header';
export default{
	name:'ActivityDetail',
	components:{
		Header,
	},
	data(){
		return{
			isFixed:true,
			headerLeft:true,
			saveBtnText:'确认发布',
			userInfo:{},
			avatar:null,
			files:null,
			editList:{
				themePhoto:'',
				actTitle:'',
				actType:3,
				
			},
		}
	},
	created(){
		this.userInfo = JSON.parse(window.sessionStorage.userInfo);
		console.log(this.userInfo)
	},
	methods:{
		back:function(){
			this.$router.go(-1);
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