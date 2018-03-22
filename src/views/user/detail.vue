<template>
  <div id="UserDetail">
    <Header :title="topTitle" :headerLeft="headerLeft" :fixed="isFixed" @clickRouter="back"></Header>
    <div class="detail-wrap">
      <div class="user-wrap">
        <div class="user-pic">
          <img src="../../assets/images/member.png" v-if="!detail.userAvatar"/>
          <img :src="dertail.userAvatar.fileUrl" v-else/>
        </div>
        <div>
          <p>{{detail.userName}}</p>
          <p>{{detail.userSex}}</p>
        </div>
        <div>anniu</div>
        <div>aixnxn</div>
      </div>
      <div class="pet-wrap">pett</div>
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
    }
  },
  mounted() {
    const vm = this;
    vm.userId = this.$route.params.id;
    vm.getUserDetail(vm.userId);
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
        if(vm.userAvatar) {
          vm.userAvatar = JSON.parse(vm.userAvatar);
        }
        vm.detail = detail;

      };
      vm.utils.postData(url, data, callback, options);
    },
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
      border-bottom:  1px solid #e4e4e4; /*no*/
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
    }
  }
}
</style>
