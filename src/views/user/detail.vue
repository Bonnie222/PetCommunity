<template>
  <div id="UserDetail">
    <Header :title="topTitle" :headerLeft="headerLeft" :fixed="isFixed" @clickRouter="back"></Header>
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
            {{detail.userNote ? detail.userNote : '这个家伙很懒~什么都没留下啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'}}
          </p>
        </div>
        <div class="btn-wrap">
            <button class="btn-save">
                + 关注
            </button>
        </div>
        <div class="data-wrap">
          <span>
            <p class="number">{{detail.userAttentions}}</p>
            <p class="text">关注</p>
          </span>
          <span>
            <p class="number">{{detail.userFans}}</p>
            <p class="text">粉丝</p>
          </span>
          <span>
            <p class="number">{{petshowlist.length}}</p>
            <p class="text">帖子</p>
          </span>
        </div>
      </div>
      <div class="pet-wrap">
        ssss
      </div>
    </div>
    <div class="show-list" v-for="(item, index) in petshowlist" :key="index">
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
</template>
<script>
import Header from '@/components/header';

export default {
  name: 'UserDetail',
  components:{
      Header,
  },
  data() {
    return {
      headerLeft: true,
      isFixed: true,
      topTitle: null,
      userId: null,
      detail: {},
      petshowlist: [],
    }
  },
  mounted() {
    const vm = this;
    vm.userId = this.$route.params.id;
    vm.getUserDetail(vm.userId);
    vm.getUserPetshow(vm.userId)
  },
  methods:{
    back() {
      this.$router.go(-1);
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

}
</style>
