<template>
  <div id="UserList">
    <Header title="认证号" :headerLeft="headerLeft" :fixed="isFixed" @clickRouter="back"></Header>
    <yd-search v-model="keyword" :on-submit="search" :on-cancel="cancelSearch"
      placeholder="搜索昵称/手机号" :fullpage="fullpage"></yd-search>
    <div class="user-list">
      <div v-for="(item, index) in userList" :key="index" class="list-item">
        <router-link :to="{ name: 'UserDetail', params: {id: item.id} }" >
          <div class="user-pic">
            <img src="../../assets/images/member.png" v-if="!item.userAvatar"/>
            <img :src="item.userAvatar.fileUrl" v-else/>
          </div>
        </router-link>
        <div class="user-info">
          <span class="info-top">
            <router-link :to="{ name: 'UserDetail', params: {id: item.id} }">
              <p class="user-name">{{item.userName}}
                <i class="iconfont" :class="{ 'icon-nan':item.userSex == 1,
  								'icon-nv':item.userSex == 2}"></i>
              </p>
              <p class="user-fans">粉丝 {{item.userFollowings}}</p>
            </router-link>
            <span v-show="item.isFocus" style="color:#999999">❤ 已关注</span>
            <!-- <button class="btn-cancel" :class="{'isFocus': item.isFocus }"
            @click="attentFunc(item)">
             {{item.isFocus ? '已关注' : '+ 关注'}}</button> -->
          </span>
          <router-link :to="{ name: 'UserDetail', params: {id: item.id} }" >
            <span class="info-bottom">
              <p>
                <i class="iconfont icon-ren1"></i>
                {{item.userNumber}}</p>
              <p>
                <i class="iconfont icon-huati"></i>
                {{item.userNote?　item.userNote : '这家伙很懒~什么都没留下'}}</p>
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header';
import { mapGetters } from 'vuex';

export default{
    name: 'UserList',
    components:{
  	    Header,
  	},
    data(){
      return{
        isFixed:true,
        headerLeft:true,
        fullpage: true,
        userList: [],
        keyword: '',
        attentList: [],
      }
    },
    computed:{
  		...mapGetters([
  			'id',
  		])
  	},
    mounted(){
      this.getUserAttentions();
    },
    methods:{
      back(){
        this.$router.replace('/home');
      },
      attentFunc(obj) {
        const vm = this;
        const url = obj.isFocus ? vm.urls.toCancelConcern : vm.urls.toConcern;
        const data = {
          fromUserId: vm.id,
          toUserId: obj.id,
        }
        const callback = (r) => {
          obj.isFocus = !obj.isFocus;
        }
        vm.utils.postData(url, data, callback);
      },
      getUserAttentions() {
        const vm = this;
        const url = vm.urls.getUserAttentions;
        const data = {
          fromUserId: vm.id,
        }
        const callback = (r) => {
          const data = r.data.data.data;
          vm.attentList = data;
          vm.getUserList();
        }
        vm.utils.postData(url, data, callback);
      },
      getUserList(){
        const vm = this;
        const url = vm.keyword == '' ? vm.urls.getUserList : vm.urls.userSearch;
        const data = {
          id: vm.id,
        }
        if(vm.keyword) data.keyword = vm.keyword;
        const callback = (r) => {
          let data = r.data.data.data;
          data.forEach((item) => {
            if(item.userAvatar){
              item.userAvatar = JSON.parse(item.userAvatar);
            }
          });
          vm.attentList.forEach((att) => {
            data.forEach((item) => {
              if(Number(att.toUserId) == Number(item.id)) {
                  item.isFocus = true;
              }
            });
          });
          vm.userList = data;
          console.log(vm.attentList, data);
        }
        vm.utils.postData(url, data, callback);
      },
      search(value) {
        location.href = `${location.href}?keyword=${value}`;
        this.getUserList();
      },
      cancelSearch() {
        this.keyword = '';
        location.href = location.hash.substring(0,11);
        this.getUserList();
      }
    },
}
</script>
<style lang="less">
.yd-search{
  margin-top: 90px;
}
#UserList{
  .user-list{
    background: #FFFFFF;
    padding: 0 30px;
    .list-item{
      display: flex;
      .user-pic{
        flex: 1;
        padding: 25px 0px;
        margin-right: 10px;
        img{
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
      .user-info{
        flex: 5;
        padding: 25px 0px;
        border-bottom: 1px solid #e4e4e4;/*no*/
        // &:last-child {
        //   border-bottom: 0px;
        // }
        .info-top{
          display: flex;
          justify-content: space-between;
          font-size: 28px;
          margin: 10px 0 10px;
        }
        .user-fans {
          margin: 10px 0;
          font-size: 22px;
          color: #999999;

        }
        .info-bottom{
          font-size: 24px;
          color: #999999;
          p{
            margin-bottom: 10px;
          }
        }
        button{
          font-size: 24px;
          background: #FFFFFF;
          color: red;
          border: 1px solid red; /*no*/
          padding: 10px 20px;
          border-radius: 10px;
          margin-top: 10px;
        }
        .isFocus {
          border-color: #999999;
          color: #999999;
        }
      }
    }
  }
}
</style>
