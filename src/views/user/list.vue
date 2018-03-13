<template>
  <div id="UserList">
    <Loading :showLoading="loading"></loading>
    <Header title="认证号" :headerLeft="headerLeft" :fixed="isFixed" @clickRouter="back"></Header>
    <yd-search v-model="keyword" :on-submit="submitHandler"></yd-search>
    <div class="user-list">
      <div v-for="(item, index) in userList" :key="index">
        <router-link :to="{ name: '', params: {} }" class="list-item">
          <div class="user-pic">
              <img src="../../assets/images/member.png" v-if="!item.userAvatar"/>
              <img :src="item.userAvatar.fileUrl" v-else/>
          </div>
          <div class="user-info">
            <span>
              <span class="user-name">{{item.userName}}</span>
              <button class="">关注</button>
            </span>
            <span>
              <p>爱宠号</p>
              <p>sssdsdsds</p>
            </span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header';
import Loading from '@/components/loading';
export default{
    name: 'UserList',
    components:{
  	    Header, Loading,
  	},
    data(){
      return{
        loading: false,
        isFixed:true,
        headerLeft:true,
        userList: [],
        keyword: '',
      }
    },
    mounted(){
      this.getUserList();
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      getUserList(){
        const vm = this;
        vm.loading = true;
        const url = vm.urls.getUserList;
        const _id = JSON.parse(window.sessionStorage.userInfo).id;
        const data = {
          id: _id,
        }
        const callback = (r) => {
          let data = r.data.data;
          console.log(data);
          $.each(data, function(index, item) {
            if(item.userAvatar){
              item.userAvatar = JSON.parse(item.userAvatar);
            }
          });
          vm.loading = false;
          vm.userList = data;
        }
        vm.utils.postData(url, data, callback);
      },
      submitHandler(value) {
          this.$dialog.toast({mes: `搜索：${value}`});
      },
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
    .list-item{

    }
  }
}
</style>
