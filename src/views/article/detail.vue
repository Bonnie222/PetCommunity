<template>
  <div id="ArticleDetail">
    <Header title="文章详情" :headerLeft="headerLeft" :fixed="isFixed" @clickRouter="back"></Header>
    <div class="detail-wrap">
      <div class="detail-header">
        <p class="title">title第我到底是拉萨的哈萨克的还是达拉斯阿三理论是大号啊老师电话</p>
        <p class="header-bottom">
          <span>作者:爱宠</span>
          <span>时间</span>
        </p>
      </div>
    </div>
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
  }
}
</style>
