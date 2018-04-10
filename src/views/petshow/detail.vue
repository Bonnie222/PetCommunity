<template>
  <div id="PetShowDetail">
    <Header title="宠物秀详情" v-bind="header"
      @clickRouter="back" @rightFunc="rightFunc"></Header>
    <div class="detail-wrap">
      <div v-if="detail.actId">
        <router-link  class="act-title"
          :to="{ name: 'ActivityDetail', params: {type:1, id:detail.actId}}">
          <span>来自: 线上活动</span>
          <span class="link"><img src="../../assets/images/right.svg"/></span>
        </router-link>
      </div>
      <div class="detail-main">
        <div class="detail-title">
  				<router-link :to="{ name: 'UserDetail', params: {id: detail.userId} }">
  					<div class="user-info">
  						<span class="pic">
  							<img src="../../assets/images/member.png"
  							 v-if="detail.userAvatar == null"/>
                 <span v-else>
                   <img :src="detail.userAvatar.fileUrl"/>
                 </span>
  						</span>
  						<span class="desc">
  							<span class="name">{{detail.userName}}</span>
  							<span class="time">{{detail.createTime}}</span>
  						</span>
  					</div>
  				</router-link>
        </div>
				<div class="detail-notes" v-html="detail.content"></div>
				<div class="detail-pic">
					<yd-lightbox :num="picList.length">
						 <yd-lightbox-img v-for="(pic, per) in picList"
						 :key="per" :src="pic.fileUrl"></yd-lightbox-img>
				 </yd-lightbox>
				</div>
  		</div>
      <div class="detail-like">
        <span  @click="like">
            <yd-icon name="like-outline" v-show="likeStatus==0 || likeStatus==-1"></yd-icon>
            <yd-icon name="like" color="#FF685D" v-show="likeStatus==1"></yd-icon>
          <label>{{detail.likeCount}}</label>
        </span>
        <span>
          <span v-for="(item, idx) in likeTop" :key="idx">
            <router-link :to="{ name: 'UserDetail', params:{id:item.likeUserId}}" class="pic" >
              <img src="src/assets/images/member.png" v-if="!item.userAvatar"/>
              <img :src="item.userAvatar.fileUrl" v-else/>
            </router-link>
          </span>
        </span>
      </div>
    </div>
    <yd-actionsheet :items="myItems1" v-model="sheetVisible" cancel="取消"></yd-actionsheet>
  </div>
</template>
<script>
import Header from '@/components/header';
import { mapGetters } from 'vuex';

export default{
  name: 'PetShowDetail',
  components:{
		Header,
	},
  data(){
    return{
      header:{
        fixed:true,
  			headerLeft:true,
        headerRightIcon: true,
      },
      detail:{},
      picList:[],
      likeTop: [],
      likeStatus: null,
      sheetVisible: false,
      myItems1:[{
        label: '返回首页',
        callback: () => {
           this.$router.push('/home');
        }
      }],
    }
  },
  computed:{
    ...mapGetters([
      'id',
    ])
  },
  mounted(){
    const id = this.$route.params.id;
    const userId = this.$route.query.userId;
    this.getDetail(id);
    this.getLikeTopUser(id);
    this.getUserLikeStatus(id);
    if(userId == this.id) this.myItems1.unshift({
      label: '删除',
      callback: () => {
         this.delete();
      }
    })
  },
  methods:{
    back() {
			this.$router.go(-1);
		},
    rightFunc() {
      this.sheetVisible = true;
    },
    like() {
      const vm = this;
      if(vm.likeStatus==1) {
        const url =vm.urls.updateLike;
        const data = {
          likeStatus: 0,
          likeType: 1,
          likeTypeId: vm.detail.id,
          likeUserId: vm.id,
        }
        const callback = (r) => {
          vm.likeStatus = 0;
          vm.detail.likeCount--;
          vm.getLikeTopUser(vm.detail.id);
        }
        vm.utils.postData(url, data, callback);
      }else{
        const url = vm.likeStatus < 0 ? vm.urls.addLike : vm.urls.updateLike;
        const data = {
          likeTypeId: vm.detail.id,
          likeType: 1,
          likeUserId: vm.id,
          likeStatus: 1,
        };
        const callback = (r) => {
          vm.likeStatus = 1;
          vm.detail.likeCount++;
          vm.getLikeTopUser(vm.detail.id);
        }
        vm.utils.postData(url, data, callback);
      }
    },
    delete(){
      const vm = this;
      const url = vm.urls.deletePetshow;
      const data = {
        id: vm.$route.params.id,
      }
      const callback = () => {
        vm.$router.go(-1);
      }
      const tips = '是否确认删除该动态？';
      vm.utils.confirmCallback(vm, tips, ()=>{
      	vm.utils.postData(url, data, callback);
      });
    },
    getUserLikeStatus(_id){
			const vm = this;
			const url = vm.urls.userLikeStatus;
			const data = {
				likeType: 1,
        likeTypeId: _id,
				likeUserId: vm.id,
			}

			const callback = (r) => {
        const obj = r.data.data;
        vm.likeStatus = obj == undefined ? -1 : obj.likeStatus;
			}
			vm.utils.postData(url, data, callback);
		},
    getLikeTopUser(_id) {
      const vm = this;
      const url =vm.urls.likeTop;
      const data = {
        likeType: 1,
        likeTypeId: _id,
      }
      const callback = (r) => {
        const list = r.data.data.data;
        list.forEach((item)=> {
          if(item.userAvatar) item.userAvatar = JSON.parse(item.userAvatar);
        })
        vm.likeTop = list;
      }
      vm.utils.postData(url,data, callback);
    },
    getDetail(_id){
      const vm = this;
      const url = vm.urls.getPetshowDetail;
      const data = {
        id: _id
      }
      const options = {
        params: data
      }
      const callback = (r) => {
        let detail = r.data.data;
        detail.createTime = vm.utils.changeDate(detail.createTime, "yyyy年MM月dd日 hh:mm");
        detail.petAvatar = JSON.parse(detail.petAvatar);
        if(detail.userAvatar) {
          detail.userAvatar = JSON.parse(detail.userAvatar);
        }
        vm.detail = detail;
        vm.picList = detail.petAvatar;
      };
      vm.utils.postData(url, data, callback, options);
    }
  }
}
</script>
<style lang="less" scoped>
#PetShowDetail{
  .detail-wrap{
    margin-top: 90px;
    font-size: 32px;
    .act-title{
      background: #ffffff;
      margin-bottom: 20px;
      padding: 30px 20px;
      display: flex;
			display: -webkit-flex;
			justify-content: space-between;
      align-items: center;
      font-weight: bold;
      color: #333333;
			.link{
				width: 20px;
				height: 36px;
				img{
					width: inherit;
					height: inherit;
				}
			}
    }
    .detail-main{
  		background: #ffffff;
      margin-bottom: 20px;
      border-bottom: 1px solid #e4e4e4; /*no*/
  		.detail-title{
        display: block;
  			padding: 20px;
  			border-bottom:1px solid #CCCCCC; /*no*/
  			.user-info{
  				display: flex;
  				align-items:center;
  				margin-bottom: 10px;
  				.pic{
  					display: inline-block;
  					width: 80px;
  					height: 80px;
  					border-radius: 50%;
  					margin-right: 20px;
  					overflow: hidden;
  					img{
              width: 80px;
              height: 80px;
  					}
  				}
  				.desc{
  					display: flex;
  					flex-direction: column;
  					.name{
  						font-size: 28px;
  						margin-bottom: 10px;
  					}
            .time {
              font-size: 26px;
            }
  					.type{
  						color: #999999;
  						&::before{
  							content: "|";
  							margin-right: 5px;
  						}
  						.icon-nan{
  							color: #0275D8;
  						}
  						.icon-nv{
  							color: #f00;
  						}
  					}
  				}
  			}
  			.title-footer{
  				display: flex;
  				justify-content: space-between;
  				align-items: center;
  				color: #999999;
  			}
  		}
  		.detail-notes{
  			max-height: 105px;
  			margin-bottom: 10px;
  			font-size: 28px;
        letter-spacing: 3px;
  			line-height: 40px;
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
    .detail-like {
      background: #ffffff;
      border-bottom: 1px solid #e4e4e4; /*no*/
      border-top: 1px solid #e4e4e4; /*no*/
      display: flex;
      align-items: center;
      padding: 20px;
      span{
        &:nth-child(2) {
          flex: 6;
          .pic{
            display: inline-block;
            width: 65px;
            height: 65px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 5px;
            &:last-child{
              margin-right: 0;
            }
            img {
              height: inherit;
              width: inherit;
            }
          }
        }
        &:nth-child(1) {
          margin-top: 10px;
          margin-right: 30px;
          text-align: center;
          i {
            font-size: 46px;
            &.icon-shoucang2 {
              color: red;
            }
          }
        }
      }
    }
  }
}
</style>
