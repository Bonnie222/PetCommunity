<template>
  <div id="ArticleList">
    <Header title="文章" :headerLeft="headerLeft" :fixed="isFixed" @clickRouter="back"></Header>
    <div class="list-wrap">
      <span v-for="(item, index) in list" :key="index">
        <router-link :to="{ name: 'ArticleDetail', params: {id:item.id} }" >
          <div class="list-item">
            <span class="item-text">
              <p class="title">{{item.articleTitle}}</p>
              <p class="time">
                <span>{{utils.changeDate(item.createTime, 'yyyy-MM-dd hh:mm')}}</span>
                <span>收藏：{{item.collectCount}}</span>
              </p>
            </span>
            <span class="item-pic"></span>
          </div>
        </router-link>
      </span>
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
      list: [],
    }
  },
  mounted() {
    this.getList();
  },
  methods:{
    back(){
			this.$router.go(-1);
		},
    getList() {
      const vm = this;
      const url = vm.urls.getArticleList;
      const callback = (r) => {
        const list = r.data.data.data;
        vm.list = list;
        console.log(list);
      }
      vm.utils.getData(url, callback);
    }
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
