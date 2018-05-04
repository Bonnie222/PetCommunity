<template>
	<div id="CollectList">
		<Header :title="topTitle" :headerLeft="headerLeft" :headerRight="headerRight"
      :fixed="isFixed" @clickRouter="back"
      :headerRightText="headerRightText" @rightFunc="rightFunc"></Header>
			<div class="list-wrap" v-if="list.length != 0">
        <yd-checklist v-model="checklist" v-show="showEdit"
          ref="checklistDemo" :callback="checkChange">
  				<div v-for="(item, index) in list" :key="index" >
            <yd-checklist-item :val="item.collectId" class="list-item check">
              <span class="content">
                <span class="pic">
                  <img :src="item.articleCover[0].fileUrl"/>
                </span>
                <span class="mess">
                  <p class="title">{{item.articleTitle}}</p>
                  <span class="desc" v-html="item.articleContent"></span>
                </span>
              </span>
              <p class="time">收藏时间：{{utils.changeDate(item.createTime, 'yyyy-MM-dd hh:mm')}}</p>
            </yd-checklist-item>
          </div>
        </yd-checklist>
        <div v-for="(item, index) in list" :key="index"
           v-show="!showEdit" class="list-item">
          <router-link :to="{ name: 'ArticleDetail', params: {id:item.collectArticleId}}" >
            <span class="content">
              <span class="pic">
                <img :src="item.articleCover[0].fileUrl"/>
              </span>
              <span class="mess">
                <p class="title">{{item.articleTitle}}</p>
                <span class="desc" v-html="item.articleContent"></span>
              </span>
            </span>
            <p class="time">收藏时间：{{utils.changeDate(item.createTime, 'yyyy-MM-dd hh:mm')}}</p>
          </router-link>
        </div>
			</div>
			<div class="nodata" v-show="noData">
				<img src="src/assets/images/nodata.svg" />
				<p>暂时没有收藏内容哦~</p>
			</div>
      <div class="checkAll" v-show="showEdit">
        <yd-checkbox v-model="isCheckAll" shape="circle"
          :change="checkAll">全选</yd-checkbox>
          <div class="btn-wrap">
    				<button class="btn-save" @click="deleteCollect"
              :class="{'bgGray': checklist.length== 0}">删除</button>
    			</div>
      </div>
	</div>
</template>

<script>
import Header from '@/components/header';
import { mapGetters } from 'vuex';

export default{
	name:"CollectList",
	components:{
	    Header
	},
	data(){
		return{
			topTitle: '我的收藏',
			headerLeft: true,
      headerRight: true,
      isFixed: true,
      headerRightText: '编辑',
      showEdit: false,
      checklist: [],
      isCheckAll: false,
      noData: false,
      list: [],
		}
	},
  computed:{
		...mapGetters([
			'id',
		])
	},
	mounted() {
		this.getList();
	},
	methods:{
		back() {
			this.$router.go(-1);
		},
    rightFunc() {
      const vm = this;
			if(vm.list.length == 0) {
				vm.showEdit = false;
				vm.headerRightText = vm.headerRightText == '编辑' ? '取消' : '编辑';
			} else {
				vm.showEdit = !vm.showEdit;
	      vm.headerRightText = vm.showEdit == true ? '取消' : '编辑';
			}
		//	console.log(vm.showEdit)
    },
    checkChange(value, isCheckAll){
      this.isCheckAll = isCheckAll;
    },
    checkAll(){
      this.isCheckAll = !this.isCheckAll
      this.$refs.checklistDemo.$emit('ydui.checklist.checkall', this.isCheckAll);
    },
    deleteCollect() {
      const vm = this;
      if(vm.checklist.length == 0) return;
      const url = vm.urls.deleteCollectList;
      const data = {
        collectIds: vm.checklist.join(",")
      }
      const callback = (r) => {
				vm.showEdit = false;
        vm.$toast('删除成功');
        setTimeout(()=>{
          vm.getList();
        }, 500);
      }
  		vm.utils.postData(url, data, callback);
    },
		getList() {
			const vm = this;
			const url = vm.urls.getUserCollectList;
			const data = {
        collectUserId: vm.id,
      };
      const options = {
        params: {
          collectUserId: vm.id
        }
      }
			vm.$indicator.open({
			  spinnerType: 'fading-circle'
			});
			vm.noData = false;
			const callback = (r) => {
				vm.$indicator.close();
				let list = r.data.data.data;
				list.forEach((item) => {
          if (item.articleCover) {
						item.articleCover = JSON.parse(item.articleCover);
					}
				});
				vm.list = list;
				vm.noData = list.length == 0;
			}
			vm.utils.postData(url, data, callback, options);
		}
	}
}
</script>

<style lang="less" scoped>
#CollectList{
	.list-wrap{
		background: #FFFFFF;
    margin-top: 90px;
		.list-item{
			padding: 20px 25px;
			border-bottom: 1px solid #E4E4E4;/*no*/
			overflow:hidden;
      &.check {
        padding: 20px 0px;
      }
      .content {
        display: block;
        width: 100%;
        margin-bottom: 15px;
      }
			.pic{
				display: inline-block;
				background: yellow;
				width: 130px;
				height: 110px;
				margin-right: 20px;
				float: left;
				overflow: hidden;
				img {
					width: inherit;
					height: inherit;
				}
			}
			.mess{
        .title {
          font-size: 30px;
          font-weight: bold;
          color: #333333;
        }
				.desc{
					/* 多行文本溢出利用省略号代替,仅用于webkit内核 $line 行数*/
			    overflow : hidden;
			    text-overflow: ellipsis;
			    display: -webkit-box;
			    -webkit-box-orient: vertical;
			    -webkit-line-clamp: 2;
					margin: 10px 0 ;
					color: #666666;
					line-height: 36px;
					max-height: 70px;
					font-size: 24px;
				}
			}
      .time{
        text-align: right;
        color: #999999;
      }
		}
	}
  .checkAll {
    position: fixed;
    bottom: 0;
    background: #fff;
    border-top: 1px solid #e4e4e4;/*no*/
    height: 90px;
    width: 100%;
    padding: 0px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn-wrap {
      .btn-save {
        width: 200px;
        height: 60px;
        font-size: 30px;
      }
      .bgGray{
        background: #cccccc;
        border-color: #cccccc;
      }
    }
  }
}
</style>
