<template>
  <div id="UserDetail">
    <Header :title="topTitle" :headerLeft="headerLeft" :fixed="isFixed"
      @clickRouter="back" :headerRight="headerRight"
      :headerRightText="headerRightText" @rightFunc="rightFunc"></Header>
    <div class="detail-wrap">
      <div class="user-wrap">
        <div class="user-pic">
          <img src="../../assets/images/member.png" v-if="!detail.userAvatar"/>
          <img :src="detail.userAvatar.fileUrl" v-else/>
        </div>
        <div class="user-info">
          <p class="number">{{detail.userName}}</p>
          <p class="text">
            <i class="iconfont icon-didian" v-if="detail.userCity"></i>
            {{detail.userCity}}
            <i class="iconfont" :class="{'icon-nan':detail.userSex == 1,
              'icon-nv': detail.userSex == 2}" v-if="detail.userSex"></i>
            {{detail.userSex == 1? '男' : '女'}}
          </p>
          <p class="text text-note">
            {{detail.userNote ? detail.userNote : '这个家伙很懒~什么都没留下...'}}
          </p>
        </div>
        <div class="btn-wrap" v-show="id!==userId">
            <button class="btn-save" v-if="relationType==0">
                + 关注
            </button>
            <button class="btn-save isFocus" v-else>
                {{relationType==1 ? '√ 已关注' : '⇋ 互相关注'}}
            </button>
        </div>
        <div class="data-wrap">
          <span>
            <p class="number">{{detail.userFollowers}}</p>
            <p class="text">关注</p>
          </span>
          <span>
            <p class="number">{{detail.userFollowings}}</p>
            <p class="text">粉丝</p>
          </span>
          <span>
            <p class="number">{{petshowlist.length}}</p>
            <p class="text">帖子</p>
          </span>
        </div>
      </div>
      <div class="pet-wrap">
        <yd-accordion>
          <yd-accordion-item title="宠物列表">
            <div class="pet-list">
              <span v-if="petList.length == 0"  class="pet-info">
                暂无宠物信息
              </span>
              <span v-else>
                <span v-for="(item, idx) in petList" :key="idx"
                  class="pet-info" @click="petInfo(item)">
                  <img :src="item.avatar"/>
                  <span>{{item.petType}}</span>
                </span>
              </span>
            </div>
          </yd-accordion-item>
      </yd-accordion>
      </div>
    </div>
    <div>
      <div class="nodata" v-if="petshowlist.length == 0">
				<img src="../../assets/images/nodata.svg" />
				<p>{{ id == userId ? '您还没有任何动态哦~' :
              '该宠友还没有任何动态哦~'}}</p>
      </div>
      <div class="show-list" v-for="(item, index) in petshowlist"
        :key="index" v-else>
        <router-link :to="{ name: 'PetshowDetail', params: {id:item.id} }">
          <div class="detail-title">
  							<span>{{item.createTime}}</span>
  				</div>
  				<div class="detail-notes" v-html="item.content"></div>
  			</router-link>
  				<div class="detail-pic">
  					<yd-lightbox :num="item.petAvatar.length">
  						 <yd-lightbox-img v-for="(pic, per) in item.petAvatar"
  						 :key="per" :src="pic.fileUrl"></yd-lightbox-img>
  						 <yd-lightbox-txt>
  	            <h1 slot="top">{{item.contentTitle}}</h1>
  	            <div slot="content" class="content" v-html="item.contentNote">
  	            </div>
  	        	</yd-lightbox-txt>
  				 </yd-lightbox>
  				</div>
  		</div>
    </div>
    <Popup ref="popup">
      <div class="pet-Msg">
        <img :src="petMsg.avatar" />
        <div>
          <P>{{petMsg.petName}}
            <i class="iconfont" :class="{'icon-nan': petMsg.petSex==1,
              'icon-nv': petMsg.petSex==2}"></i>
          </P>
          <p>{{petMsg.petType}}</p>
          <P>{{petMsg.petBirth}}</P>
        </div>
      </div>
    </Popup>
  </div>
</template>
<script>
import Header from '@/components/header';
import Popup from '@/components/popupWindow';
import { mapGetters } from 'vuex';

export default {
  name: 'UserDetail',
  components:{
      Header, Popup,
  },
  data() {
    return {
      headerLeft: true,
      headerRight: true,
      headerRightText: '资料',
      isFixed: true,
      topTitle: null,
      userId: null,
      detail: {},
      petList: [],
      petshowlist: [],
      showPet: false,
      petMsg: {},
      relationType: null,
    }
  },
  computed:{
		...mapGetters([
			'id',
		])
	},
  mounted() {
    const vm = this;
    vm.userId = this.$route.params.id;
    vm.getUserDetail(vm.userId);
    vm.getUserPetList(vm.userId);
    vm.getUserPetshow(vm.userId)
    vm.getRelatin(vm.userId);
  },
  methods:{
    back() {
      this.$router.go(-1);
    },
    rightFunc() {
      if(this.id != this.userId ){
        this.$router.push({
          name: 'UserInfo',
          params: {
            id: this.userId,
          }
        });
      } else {
        this.$router.push({
          name: 'MyInfo',
          params: {}
        });
      }
    },
    petInfo(obj) {
      this.petMsg = obj;
      console.log(obj);
      this.$refs.popup.showWindow();
    },
    getRelatin(_id) {
      const vm = this;
      const url = vm.urls.judgeRelation;
      const data = {
        fromUserId: vm.id,
        toUserId: _id,
      };
      const callback = (r) => {
        const data = r.data.data;
        switch (data.length) {
          case 0:
            vm.relationType = 0;
            break;
          case 1:
            vm.relationType = data[0].fromUserId == vm.id ? 1 : 0;
            break;
          case 2:
            vm.relationType = 2;
            break;
        }
      };
      vm.utils.postData(url, data, callback);
    },
    getUserDetail(_id) {
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
        const detail = r.data.data[0];
        vm.topTitle = detail.userName;
        if(detail.userAvatar) {
          detail.userAvatar = JSON.parse(detail.userAvatar);
        }
        vm.detail = detail;

      };
      vm.utils.postData(url, data, callback, options);
    },
    getUserPetList(_id) {
      const vm = this;
			const url = vm.urls.getMyPetList;
			const data = {
				petBelongId :_id
			}
			const options = {
				params:{
					userid: _id
				}
			}
			const callback = (r) => {
				const data = r.data.data;
				if(data.length !== 0) {
					data.forEach((item) => {
						item.petType = vm.config.petTypeList[item.petType];
						item.petBirth = vm.utils.calculateAge(item.petBirth);
						item.avatar = JSON.parse(item.petAvatar).fileUrl;
					});
				}
        vm.petList = data;
			}
			vm.utils.postData(url, data, callback, options);
    },
    getUserPetshow(_id) {
      const vm = this;
      const url = vm.urls.getUserPetshowList;
      const data = {
        userId: _id,
      };
      const options = {
        params:{
          id: _id
        }
      };
      const callback = (r) => {
        const list = r.data.data;
        list.forEach((item) => {
          item.petAvatar = JSON.parse(item.petAvatar);
          item.createTime = vm.utils.changeDate(item.createTime, "yyyy年MM月dd日 hh:mm");
        });
        // vm.topTitle = detail.userName;
        // if(detail.userAvatar) {
        //   detail.userAvatar = JSON.parse(detail.userAvatar);
        // }
        vm.petshowlist = list;

      };
      vm.utils.postData(url, data, callback, options);
    }
  },
}
</script>
<style lang="less" scoped>
#UserDetail {
  .nodata{
		text-align: center;
		margin-top: 10%;
		p{
			margin-top: 20px;
			color: #999999;
		}
	}
  // 用户信息
  .detail-wrap {
    background: #ffffff;
    margin-top: 90px;
    border-bottom:  1px solid #e4e4e4; /*no*/
    .user-wrap{
      padding: 25px 0 0;
      text-align: center;
      border-bottom:  1px solid #e4e4e4; /*no*/
      .number {
        font-size: 36px;
        margin-bottom: 20px;
      }
      .text {
        font-size: 28px;
        color: #999999;
        .iconfont {
          color: #999999;
        }
      }
      .text-note{
        margin: 10px auto;
        width: 70%;
        line-height: 38px;
      }
      .user-pic{
        margin: 0 auto 20px;
        width: 100px;
        height: 100px;
        img{
          width: inherit;
          height: inherit;
          border-radius: 50%;
        }
      }
      .btn-wrap {
        margin: 70px 0 40px;
        .btn-save {
          width: 200px;
          height: 70px;
          font-size: 28px;
        }
        .isFocus {
          border-color: #999999;
          color: #999999;
          background: #ffffff;
        }
      }
      .data-wrap {
        width: 70%;
        margin: 20px auto;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          flex: 1;
          display: inline-block;
          margin: 20px 0;
          // padding: 0 10%;
          border-right: 1px solid #e4e4e4;/*no*/
          &:last-child{
            border-right: 0px;
          }
        }
      }
    }
  }

  // 宠物列表
  .pet-list {
    padding: 20px 20px 0;
    display: flex;
    flex-wrap: wrap;
    .pet-info {
      display: flex;
      align-items: center;
      flex-basis: 32%;
      margin-bottom: 20px;
      color: #666666;
      &:not(:nth-child(3n)) {
        margin-right: 10px;
      }
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-right: 20px;
      }
    }
  }
  // 宠物秀
  .show-list {
		background: #ffffff;
    margin-top: 20px;
		.detail-title{
			padding: 20px;
			border-bottom:1px solid #CCCCCC; /*no*/
    }
    .detail-notes{
			max-height: 105px;
			margin-bottom: 10px;
			font-size: 28px;
			line-height: 36px;
			/* 多行文本溢出利用省略号代替,仅用于webkit内核 $line 行数*/
			overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			margin: 10px 0 25px;
			color: #333333;
			padding: 0 20px;
		}
		.detail-pic{
			margin-bottom: 20px;
			padding: 20px;
			img{
				display: inline-block;
				width: 200px;
				height: 200px;
				border-radius: 10px;
			}
		}
  }

  .pet-Msg {
    width: 70%;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
    img {
      width: 100%;
    }
    div {
      padding: 20px;
    }
    p {
      margin-bottom: 30px;
      font-size: 30px;
      &:not(:first-child) {
        margin-bottom: 15px;
        font-size: 26px;
        color: #666666;
      }
      &:last-child{
        margin-bottom: 0px;
      }
    }
  }
}
</style>
