<template>
  <div id="UserDetail">
    <Header :title="topTitle" :headerLeft="headerLeft" :fixed="isFixed" @clickRouter="back"></Header>
    <div class="detail-wrap">
      <div class="user-wrap">
        <div class="user-pic">
          <img src="../../assets/images/member.png" v-if="!detail.userAvatar"/>
          <img :src="dertail.userAvatar.fileUrl" v-else/>
        </div>
        <div class="user-info">
          <p class="number">{{detail.userName}}</p>
          <p class="text">
            <i class="iconfont icon-weizhib" v-if="detail.userCity"></i>
            {{detail.userCity}}
            <i class="iconfont icon-weizhib" v-if="detail.userSex"></i>
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
          <span><p class="number">22</p><p class="text">关注</p></span>
          <span><p class="number">22</p><p class="text">粉丝</p></span>
          <span><p class="number">22</p><p class="text">帖子</p></span>
        </div>
      </div>

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
        background: yellow;
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
}
</style>
