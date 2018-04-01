<template>
	<div id="UserInfo">
		<Header :title="topTitle" :headerLeft="headerLeft" @clickRouter="back"></Header>
		<div class="info">
      <div class="info-item">
				<span class="item-name">爱宠号</span>
				<span class="item-input">{{detail.userNumber}}</span>
			</div>
      <div class="info-item">
				<span class="item-name">昵称</span>
				<span class="item-input">{{detail.userName}}</span>
			</div>
			<!-- <div class="info-item">
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
			 -->

			<!-- <div class="info-item">
				<span class="item-name">邮箱</span>
				<input type="email" class="item-input" placeholder="请输入" v-model="myInfo.userEmail" :disabled="isDisabled"/>
			</div> -->
		</div>
    <div class="info">
      <div class="info-item">
        <span class="item-name">性别</span>
        <span class="item-input">{{detail.userSex == 1 ? '男' : '女'}}</span>
      </div>
      <div class="info-item">
        <span class="item-name">城市</span>
        <span>
          <span class="item-input">{{detail.userCity}}</span>
        </span>
      </div>
      <div class="info-item">
        <span class="item-name">星座</span>
        <span class="item-input">{{detail.userConst}}</span>
      </div>
    </div>
    <div class="info">
      <div class="info-item">
        <span class="item-name">生日</span>
        <span class="item-input">{{detail.userBirth}}</span>
      </div>
      <div class="info-item">
        <span class="item-name">情感状态</span>
        <span class="item-input">{{detail.userStatus}}</span>
      </div>
      <div class="info-item info-area">
        <p class="item-name">个人说明</p>
        <textarea  v-html="detail.userNote" readonly></textarea>
      </div>
    </div>
			<!-- <div class="info">

				<div class="info-item">
					<span class="item-name">年龄</span>
					<span>
						<span  class="item-input" @click="openAgePicker" :disabled="isDisabled">{{userAge}}</span>
						<span class="link" :hidden="isDisabled"><img src="../../../assets/images/right.svg"/></span>
					</span>
				</div>



	    		<mt-datetime-picker ref="userBirthPicker" type="date" @confirm="handleUserBirth"
					:startDate="startDate" :endDate="endDate"></mt-datetime-picker>
				<yd-cityselect v-model="showCityselect" :callback="resultCity" :items="district"></yd-cityselect>
			</div> -->
			<!-- <div class="btn-wrap">
				<button class="btn-save" @click="updateUserInfo" :hidden="isDisabled">{{saveBtnText}}</button>
			</div>
			<ImgView v-show="showImgView" :imgSrc="avatar" @clickkit="closeView"></ImgView> -->
	</div>
</template>

<script>
import Header from '@/components/header';
import ChoiceWindow from '@/components/choiceWindow';
import District from 'ydui-district/dist/gov_province_city_id';
import ImgView from '@/components/imageView';
import { mapGetters } from 'vuex';

export default{
	name:"UserInfo",
	components:{
	    Header,ChoiceWindow, ImgView
	},
	data(){
		return{
			//主页
			topTitle:'资料',
			headerLeft:true,
      detail: {},

			myInfo:{},
			userInfoText:{},
			isDisabled: false,
			avatar:null,
			showCityselect:false,
			district:District,

			showImgView: false,
			imgSrc:'',
		}
	},
	computed:{
		...mapGetters([
			'id',
			'userInfo',
		])
	},
	mounted(){
    const vm = this;
    vm.userId = this.$route.params.id;
    vm.getUserDetail(vm.userId);
	},
	methods:{
		back: function(){
			let vm = this;
			vm.$router.go(-1);
		},
		getUserDetail(_id){
      const vm = this;
      const url = vm.urls.getPersonal;
      const data = {
        id: _id,
      };
      const options = {
        params:{
          id: _id
        }
      };
      const callback = (r) => {
        const detail = r.data.data;
        if(detail.userAvatar) {
          detail.userAvatar = JSON.parse(detail.userAvatar);
        }
        detail.userBirth = vm.utils.formatDate(detail.userBirth, 'MM-dd');
        detail.userConst = vm.config.userConstList[detail.userConst];
        detail.userStatus = vm.config.userStatusList[detail.userStatus];
        vm.detail = detail;
      };
      vm.utils.postData(url, data, callback, options);
		},
  }
}
</script>

<style lang="less" scoped>
#UserInfo{
	.info{
		background: #FFFFFF;
		padding: 0 20px;
		margin-bottom: 20px;
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
        font-weight: bold;
			}
			.item-input{
				display: inline-block;
				text-align: right;
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
	}
}
</style>
