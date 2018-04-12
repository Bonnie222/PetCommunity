<template>
  <div id="ArticleList">
    <Header title="文章" :headerLeft="headerLeft" :fixed="isFixed" @clickRouter="back"></Header>
    <div class="list-wrap">
      <router-link :to="{ name: 'ArticleDetail', params: {id:1} }" >
        <div class="list-item">
          <span class="item-text">
            <p class="title">比爱哦标题一标题表的话快速拉ss s s 升合适的</p>
            <p class="time">
              <span>2018040623535</span>
              <span>收藏：111</span>
            </p>
          </span>
          <span class="item-pic"></span>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header'
import { mapGetters } from 'vuex';

export default {
  name: 'ArticleList',
  components:{
      Header,
  },
  data(){
    return{
      headerLeft: true,
      isFixed:true,
    }
  },
  methods:{
    back(){
			this.$router.go(-1);
		},
  }
}
</script>
<style lang="less" scoped>
#ArticleList{
  .list-wrap {
    padding: 90px 0 0;
    background: #ffffff;
    .list-item {
      padding:30px;
      border-bottom: 1px solid #e4e4e4; /*no*/
      display: flex;
      justify-content: space-between;
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
        p.title{
          font-size: 30px;
          line-height: 36px;
        }
        p.time{
          font-size: 26px;
          color: #999999;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
