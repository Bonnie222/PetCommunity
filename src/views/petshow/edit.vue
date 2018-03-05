<template>
	<div id="LookEdit">
		<div v-show="showContentWindow" id="content">
			<Header title="发布信息" :headerLeft="headerLeft" :fixed="isFixed" @clickRouter="back"></Header>
			<div class="form">
				<div class="form1">
					<textarea placeholder="说点什么吧？" v-model="notes" maxlength="255" @input="countWord"></textarea>
					<p>{{count}}/255</p>
				</div>
				<div class="form1 form2">
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
					<li class="" @click="showActListWindow">
						<label>{{actTitle}}</label>
						<span class="">
							<!--{{petTypeText == '' ? '请选择':petTypeText}}-->
							<i class="icon-right">
								<img src="../../assets/images/right.svg" />
							</i>
						</span>
					</li>
				</ul>
			</div>
			<div class="btn-wrap">
				<button class="btn-save" @click="saveToPublish">{{saveBtnText}}</button>
			</div>
			<ImgView v-show="showImgView" :imgSrc="avatar" @clickkit="closeView"></ImgView>
		</div>
		<div v-show="showActTitleWindow">
			<Header :title="windowTitle" :headerLeft="windowheaderLeft" @clickRouter="windowback"></Header>
			<ul class="store-list">
				<li @click="confirmAct(obj)" v-for="obj in ActList" :class="{'active':obj.isChecked}">
					<span>
						<img :src="obj.themePhoto.fileUrl"/>
					</span>
					<span class="store-wrap">
						<span class="store-name">#{{obj.actTitle}}#</span>
						<span class="store-note">{{obj.notes}}</span>
					</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';
import ChoiceWindow from '@/components/choiceWindow';
import ImgView from '@/components/imageView';

export default{
	name:"PetShowEdit",
	components:{
	    Header,ImgView,ChoiceWindow
	},
	data(){
		return{
			//窗口
			showContentWindow:true,
			showActTitleWindow:false,
			windowTitle:'',
			windowheaderLeft:'',
			//主页
			isFixed:true,
			headerLeft:true,
			isSaving:false,
			saveBtnText:'确认发布',
			actTitle:'同步线上活动',
			count:0,
			files:[],
			avatar:'',
			notes:'',
			showImgView:false,
			picList:[],
			ActList:[],
			editList:{
				petAvatar:'',
				content:'',				
			},
		}
	},
	mounted(){
		const vm = this;
		const url = vm.urls.getActivityList;
		var data = {
			actType: 1
		}
		var callback = function(r){
			const data = r.data.data;
			$.each(data, function(index, item){
					item.isChecked = false;
					item.themePhoto = JSON.parse(item.themePhoto);
			})
			vm.ActList = data;
			console.log(data);
		}
		vm.utils.postData(url, data, callback);
	},
	methods:{
		back:function(){
			this.$router.go(-1);
		},
		windowback: function(){
			let vm = this;
			vm.showContentWindow = true;
			vm.showActTitleWindow = false;
		},
		countWord: function(){
			let vm = this;
			let len = vm.notes.length;
			vm.count = len;
		},
		previewImg: function(index){
			let vm = this;
			vm.avatar = vm.picList[index].picture;
    		vm.showImgView = true;
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
		showActListWindow:function(){
			console.log(11);
       		let vm = this;
       		vm.showContentWindow = false;
       		vm.showActTitleWindow = true;
       		vm.windowTitle = '选择线上活动';
			vm.windowheaderLeft = true;
       	},
       	confirmAct: function(obj){
			let vm = this;
			$.each(vm.petTypeList, function(index, item){
					item.isChecked = false;
			})
			obj.isChecked = true;
			vm.actTitle = `#${obj.actTitle}#`;
//			vm.editList.petType = obj.value;
//			setTimeout(function(){
//				vm.showContentWindow = true;
//				vm.showTypeWindow = false;
//			},500);
		},
    	getImg: function(e){
    		let vm = this;
    		let file = e.target.files[0];
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
    		let reader = new FileReader();
    		reader.readAsDataURL(file);
    		reader.onload = function(e){
    			let pic = {};
    			let list = vm.picList;
    			pic.picture = this.result;
    			list = list.push(pic);
    		}
    	},
    	saveToPublish: function(){
    		let vm = this;
    		if(vm.isSaving) return;
    		let dt = window.sessionStorage.userInfo;
			let data = vm.editList;
			if(!data.region || !data.address || !data.dateTime ||
				!data.petType || !vm.notes || !data.contact){
					vm.$toast('信息填写不完整');
					return;
			}
			let partten = /^$|^1(3|4|5|7|8)\d{9}$/;
    		if(!partten.test(data.contact)){
    			vm.$toast('请输入正确的手机联系方式');
					return;
    		}
    		
    		let e = vm.files;
      		let url = vm.urls.uploadArray;
    		let fname = 'picture';
    		vm.isSaving = true;
			vm.saveBtnText = '正在发布中...';
    		let callback = function(r){
    			vm.editList.petAvatar = JSON.stringify(r.data.data);
    			save();
    		}		
    		vm.utils.uploadMore(vm, e, fname, url, callback);
    		
    		function save(){
    			let url = vm.urls.addLook;
    			data.userInfo = dt;
				data.userId = JSON.parse(dt).id;
				data.createTime = vm.utils.getNowTime();
				data.note = vm.notes.replace(/\n|\r\n/g,"<br/>");

				let callback = function(r){
					vm.$dialog.toast({
						mes: '发布成功',
	  					icon: 'success',
	  					timeout: 1000
					});	
					vm.isSaving = false;
					vm.saveBtnText = '确认发布';
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
	#content{
		.mint-header{
			background: #FFFFFF;
			border-bottom:1px solid #CCCCCC; /*no*/
			color: #333333;
		}
	}
	.form{
		padding-top: 90px;
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
	}
	.btn-wrap{
		margin: 50px 0;
	    .btn-save{
	    	display: block;
	    	margin: 0 auto;
	    	width: 80%;
	    }
	}
	.store-list{
        background: #FFFFFF;
        margin-top: 40px;
        padding: 0 20px;
        & > li{
        	display: flex;
        	align-items: center;
            padding: 20px 10px;
            font-size: 32px;
        /*    height: 152px*/;
            border-bottom: 1px solid #E4E4E4;
            img{
            	width: 100px;
            	height: 100px;
            	margin-right: 20px;
            	border-radius: 10px;
            }
            &:last-child{
                border-bottom: none;
            }
           /* &.active{*/
                &:after{
                    display: block;
                    content: "";
                    background-image: url(/assets/images/icon-check.png);
                    background-size: 36px 26px;
                    float: right;
                    width: 36px;
                    height: 26px;
                }
           /* }*/
            .store-wrap{
            	background: yellow;
            	max-width:75%;
            }
            .store-name{
            	display: block;
            	/*margin-top: 10px;*/
            	margin-bottom: 10px;
            }
            .store-note{
            	/* 多行文本溢出利用省略号代替,仅用于webkit内核 $line 行数*/
			    overflow : hidden;
			    text-overflow: ellipsis;
			    display: -webkit-box;
			    -webkit-box-orient: vertical;
			    -webkit-line-clamp: 1;
				margin: 10px 0 25px;
				color: #666666;
				font-size: 28px;
				line-height: 34px;
            }
        }
    }
}
</style>