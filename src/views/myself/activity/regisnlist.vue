<template>
  <div id="RegisnList">
    <Header title="报名名单" :headerLeft="headerLeft" :fixed="isFixed" @clickRouter="back"></Header>
    <div class="user-list">
      <div v-for="(item, index) in userList" :key="index" class="list-item">
        <router-link :to="{ name: 'UserDetail', params: {id: item.id} }" >
          <div class="user-pic">
            <img src="../../../assets/images/member.png" v-if="!item.userAvatar"/>
            <img :src="item.userAvatar.fileUrl" v-else/>
          </div>
        </router-link>
        <div class="user-info">
          <span class="info-top">
            <router-link :to="{ name: 'UserDetail', params: {id: item.id} }">
              <span class="user-name">{{item.userName}}
                <i class="iconfont" :class="{ 'icon-nan':item.userSex == 1,
  								'icon-nv':item.userSex == 2}"></i>
              </span>
            </router-link>
            <!-- <button class="btn-cancel" @click="aa">+ 关注</button> -->
          </span>
          <router-link :to="{ name: 'UserDetail', params: {id: item.id} }" >
            <span class="info-bottom">
              <p>姓名:{{item.signName}}</p>
              <p>联系方式:{{item.signContact}}</p>
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
    name: 'RegsinList',
    components:{
  	    Header,
  	},
    data(){
      return{
        isFixed:true,
        headerLeft:true,
        userList: [],
        keyword: '',
      }
    },
    computed:{
  		...mapGetters([
  			'id',
  		])
  	},
    mounted(){
      this.getUserList();
    },
    methods:{
      aa() {
        alert(111);
        return;
      },
      back(){
        this.$router.go(-1);
      },
      getUserList(){
        const vm = this;
        const url = vm.urls.getMyPublRegisnList;
        const data = {
          actId: vm.$route.params.id,
        }
        const callback = (r) => {
          let data = r.data.data.data;
          console.log(data);
          data.forEach((item) => {
            if(item.userAvatar){
              item.userAvatar = JSON.parse(item.userAvatar);
            }
          });
          vm.userList = data;
        }
        vm.utils.postData(url, data, callback);
      },
    },
}
</script>
<style lang="less">
#RegisnList{
  .user-list{
    margin-top: 90px;
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
      }
    }
  }
}
</style>
