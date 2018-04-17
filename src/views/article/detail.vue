<template>
  <div id="ArticleDetail">
    <Header title="文章详情" v-bind="header"
      @clickRouter="back" @rightFunc="rightFunc"></Header>
    <div class="detail-wrap">
      <div class="detail-header">
        <p class="title">{{detail.articleTitle}}</p>
        <p class="header-bottom">
          <span>作者: {{detail.author}}</span>
          <span>时间: {{utils.changeDate(detail.createTime, 'yyyy-MM-dd hh:mm:ss')}}</span>
        </p>
      </div>
      <div class="detail-body" v-html="detail.articleContent"></div>
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
import Header from '@/components/header'
import { mapGetters } from 'vuex';

export default {
  name: 'ArticleDetail',
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
      articleId: null,
      detail: {},
      commentList: [],
      noData: false,
      sheetVisible1: false,
      sheetVisible2: false,
      inputPlaceholder: '说点什么吧...',
      commentNote: null,
      toUserId: null,
      toUserName: null,
      collectId: null,
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
    this.articleId = this.$route.params.id;
    this.getDetail(this.articleId);
    this.getCommentList();
    this.collectStatus();
  },
  methods:{
    back(){
			this.$router.go(-1);
		},
    rightFunc() {
      this.sheetVisible1 = true;
    },
    collect() {
      const vm = this;
      const url = vm.collectId ? vm.urls.deleteCollect : vm.urls.addCollect;
      let data = {};
      let options = {
        params: {}
      };
      if(vm.collectId) {
        data.collectId = vm.collectId;
        options.params.collectId = vm.collectId;
      } else {
         data.collectArticleId = vm.articleId;
         data.collectUserId = vm.id;
         data.createTime = vm.utils.getNowTime();
         options.params.articleId = vm.articleId;
         options.params.userId = vm.id;
      }
      const callback = (r) => {
        const tips = vm.collectId ? '取消成功' : '收藏成功';
        vm.$toast(tips);
        vm.myItems1[0].label = vm.collectId ? '收藏' : '取消收藏';
      }
      vm.utils.postData(url, data, callback, options);
    },
    sendComment(){
      const vm = this;
      const url = vm.urls.addComment;
      if(!vm.commentNote) {
        vm.$toast('评论内容不能为空');
        return;
      }
      const data = {
        commentType: 2,
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
    getCommentList(){
      const vm = this;
      const url = vm.urls.getCommentList;
      const data = {
        commentType: 2,
        commentTypeId: vm.$route.params.id,
      }
      const options = {
        params: {
          commentType: 2,
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
    collectStatus(){
      const vm = this;
      const url = vm.urls.collectStatus;
      const data = {
        collectArticleId: vm.articleId,
        collectUserId: vm.id,
      }
      const callback = (r) => {
        const obj = r.data.data;
        if(Object.keys(obj).length != 0) vm.collectId = obj.collectId;
        vm.myItems1.unshift({
          label: Object.keys(obj).length == 0 ? '收藏' : '取消收藏',
          callback: () => {
            vm.collect();
          }
        })
      }
      vm.utils.postData(url, data, callback);
    },
    getDetail(_id){
      const vm = this;
      const url = vm.urls.getArticleDetail;
      const data = {
        id: _id
      }
      const options = {
        params:{
          articleId: _id,
        }
      }
      const callback = (r) => {
        const detail = r.data.data;
        vm.detail = detail;
      }
      vm.utils.postData(url, data, callback, options);
    }
  }
}
</script>
<style lang="less" scoped>
#ArticleDetail{
  .detail-wrap {
    padding: 90px 0 0;
    background: #ffffff;
    .detail-header {
      padding:50px 30px 20px;
      border-bottom: 1px solid #e4e4e4; /*no*/
      p.title{
        font-size: 34px;
        line-height: 42px;
        text-align: center;
        margin-bottom: 30px;
      }
      p.header-bottom{
        display: flex;
        color: #999999;
        justify-content: space-between;
        font-size: 22px;
      }
      .item-pic {
        display: inline-block;
        background: yellow;
        width: 200px;
        height: 150px;
      }
      .item-text {
        display: inline-block;
        width: 465px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        p.time{
          font-size: 26px;
          color: #999999;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .detail-body {
      padding: 30px;
      line-height: 40px;
      font-size: 30px;
      border-bottom: 1px solid #e4e4e4;/*no*/
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
