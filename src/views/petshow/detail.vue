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
  				<router-link :to="{ name: 'UserDetail', params:{id:detail.userId}}">
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
      <div class="detail-comment">
        <p class="title" @click="comment">评论 {{detail.commentCount}}
          <i class="border-arrow"></i>
          <i class="border-arrow-inner"></i>
        </p>
        <div v-show="commentList.length!=0">
          <div class="comment-item" v-for="(item, index) in commentList"
            :key="index" @click="commentFunc(item)">
            <div class="comment-info">
              <img src="src/assets/images/member.png" class="comment-pic"
                v-if="!item.fromUserAvatar"/>
              <img :src="item.fromUserAvatar.fileUrl" class="comment-pic" v-else>
              <span class="comment-note">
                <p class="comment-name">{{item.fromUserName}}</p>
                <span class="comment-desc">
                  <span class="comment-reply"
                    v-show="item.toUserId">@{{item.toUserName}}:</span>
                    <span v-html="item.content"></span>
                </span>
              </span>
            </div>
            <p class="comment-time">{{item.createTime}}</p>
          </div>
        </div>
        <div v-show="noData" class="no-comment">
          暂无评论~赶紧去抢沙发吧！
        </div>
      </div>
    </div>
    <div class="commentInput">
      <textarea class="inputText" :placeholder="inputPlaceholder" v-model="commentNote"></textarea>
      <span class="send" @click="sendComment">发送</span>
    </div>
    <yd-actionsheet :items="myItems1" v-model="sheetVisible1" cancel="取消"></yd-actionsheet>
    <yd-actionsheet :items="myItems2" v-model="sheetVisible2" cancel="取消"></yd-actionsheet>
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
      noData: false,
      sheetVisible1: false,
      sheetVisible2: false,
      commentList: [],
      inputPlaceholder: '说点什么吧...',
      commentNote: null,
      toUserId: null,
      toUserName: null,
      myItems1:[{
        label: '返回首页',
        callback: () => {
           this.$router.push('/home');
        }
      }],
      myItems2:[],
    }
  },
  computed:{
    ...mapGetters([
      'id',
    ])
  },
  mounted(){
    const vm = this;
    const id = vm.$route.params.id;
    const userId = vm.$route.query.userId;
    vm.getDetail(id);
    vm.getLikeTopUser(id);
    vm.getUserLikeStatus(id);
    vm.getCommentList();
    if(userId == vm.id) vm.myItems1.unshift({
      label: '删除',
      callback: () => {
         vm.delete();
      }
    })
  },
  methods:{
    back() {
			this.$router.go(-1);
		},
    rightFunc() {
      this.sheetVisible1 = true;
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
    sendComment(){
      const vm = this;
      const url = vm.urls.addComment;
      if(!vm.commentNote) {
        vm.$toast('评论内容不能为空');
        return;
      }
      const data = {
        commentType: 1,
        commentTypeId: this.$route.params.id,
        content: vm.commentNote.replace(/\n|\r\n/g,"<br/>"),
        fromUserId: vm.id,
        toUserId: vm.toUserId,
        toUserName:vm.toUserName,
        createTime: vm.utils.getNowTime()
      }
      const callback = (r) => {
        vm.$toast('评论成功');
        vm.detail.commentCount++;
        vm.commentNote = null;
        vm.getCommentList();
      }
      vm.utils.postData(url, data, callback)
    },
    comment() {
      this.toUserId = null;
      this.toUserName = null;
      this.inputPlaceholder = '说点什么吧...';
    },
    commentFunc(obj) {
      const vm = this;
      vm.myItems2 = [];
      vm.myItems2.push({
        label: obj.fromUserId == vm.id ? '删除' : `回复“${obj.fromUserName}”`,
        callback:() =>{
          if(obj.fromUserId == vm.id) {
            vm.delComment(obj);
          } else {
            vm.toUserId = obj.fromUserId;
            vm.toUserName = obj.fromUserName;
            vm.inputPlaceholder = `@${vm.toUserName}:`;
          }
        }
      })
      this.sheetVisible2 = true;
    },
    delComment(obj) {
      const vm = this;
      const url = vm.urls.delComment;
      const data = {
        id: obj.id,
      }
      const options = {
        params: {
          id:obj.id
        }
      }
      const callback = () => {
        vm.$toast('删除成功');
        vm.detail.commentCount--;
        vm.getCommentList();
      }
      vm.utils.postData(url, data, callback, options);
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
    getCommentList(){
      const vm = this;
      const url = vm.urls.getCommentList;
      const data = {
        commentType: 1,
        commentTypeId: vm.$route.params.id,
      }
      const options = {
        params: {
          commentType: 1,
          commentTypeId: vm.$route.params.id,
        }
      }
      vm.noData = false;
      const callback = (r) => {
        const list = r.data.data.data;
        if(list.length == 0) vm.noData = true;
        list.forEach((item)=>{
          if(item.fromUserAvatar) item.fromUserAvatar = JSON.parse(item.fromUserAvatar);
          item.createTime = vm.utils.changeDate(item.createTime, 'yyyy-MM-dd hh:mm');
        })
        vm.commentList = list;
      }
      vm.utils.postData(url, data, callback, options);
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
      // align-items: center;
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
  .detail-comment {
    background: #ffffff;
    p.title {
      padding: 30px 20px;
      position: relative;
      border-bottom: 1px solid #e4e4e4;
      font-size: 26px;
      .border-arrow {
        position: absolute;
        bottom:  -1px;
        left: 30px;
        width: 20px;
        height: 20px;
        border: 25px solid;
        border-color : transparent transparent #e4e4e4 transparent ;
      }
      .border-arrow-inner {
        position: absolute;
        bottom:  -2px;
        left: 33.5px;
        width: 15px;
        height: 15px;
        border: 22px solid;
        border-color : transparent transparent #f2f2f2 transparent ;
      }
    }
    .no-comment {
      padding: 50px 20px;
      font-size: 26px;
      text-align: center;
      background: #f2f2f2;
      color: #999999;
      border-bottom: 1px solid #e4e4e4;/*no*/
    }
    .comment-item {
      background: #f2f2f2;
      border-bottom: 1px solid #e4e4e4;/*no*/
      padding: 20px;
      width: 100%;
      .comment-info {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .comment-note {
          width: 85%;
        }
        img.comment-pic {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 1px solid #999999;/*no*/
          margin-right: 20px;
        }
        p.comment-name {
          margin-bottom: 15px;
          font-size: 30px;
          color: #999999;
        }
        .comment-desc{
          font-size: 28px;
          .comment-reply {
            color: #eb695c;
          }
          word-wrap: break-word;
          word-break: normal;
        }
      }
      .comment-time {
        text-align: right;
        font-size: 24px;
        color: #999999;
      }
    }
  }
  .commentInput {
    position: fixed;
    bottom: 0;
    background: #fff;
    border-top: 1px solid #e4e4e4;/*no*/
    height: 85px;
    width: 100%;
    padding: 0px 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .inputText{
      background: #e4e4e4;
      overflow-y: hidden;
      flex: 2;
      border-radius: 5px;
      border: 1px solid #d7d7d7;/*no*/
      font-size: 26px;
      height: 55px;
      padding: 10px;
      margin-right: 20px;
    }
    .send {
      font-size: 28px;
    }
  }
}
</style>
