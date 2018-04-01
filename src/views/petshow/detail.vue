<template>
  <div id="PetShowDetail">
    <Header title="宠物秀详情" v-bind="header"
      @clickRouter="back" @rightFunc="rightFunc"></Header>
    <div class="detail-wrap">
      <div v-if="detail.actId">
        <router-link  class="act-title"
          :to="{ name: 'ActivityDetail', params: {type:1, id:detail.actId}}">
          <span>来自: 线上活动</span>
          <span class="link"><img src="../../assets/images/right.svg"/></span>
        </router-link>
      </div>
      <div class="detail-main">
        <div class="detail-title">
  				<router-link :to="{ name: 'UserDetail', params: {id: detail.userId} }">
  					<div class="user-info">
  						<span class="pic">
  							<img src="../../assets/images/member.png"
  							 v-if="detail.userAvatar == null"/>
                 <span v-else>
                   <img :src="detail.userAvatar.fileUrl"/>
                 </span>
  						</span>
  						<span class="desc">
  							<span class="name">{{detail.userName}}</span>
  							<span>{{detail.createTime}}</span>
  						</span>
  					</div>
  				</router-link>
        </div>
				<div class="detail-notes" v-html="detail.content"></div>
				<div class="detail-pic">
					<yd-lightbox :num="picList.length">
						 <yd-lightbox-img v-for="(pic, per) in picList"
						 :key="per" :src="pic.fileUrl"></yd-lightbox-img>
				 </yd-lightbox>
				</div>
  		</div>
    </div>
    <yd-actionsheet :items="myItems1" v-model="sheetVisible" cancel="取消"></yd-actionsheet>
  </div>
</template>
<script>
import Header from '@/components/header';
import { mapGetters } from 'vuex';

export default{
  name: 'PetShowDetail',
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
      detail:{},
      picList:[],
      sheetVisible: false,
      myItems1:[{
        label: '返回首页',
        callback: () => {
           this.$router.push('/home');
        }
      }],
    }
  },
  computed:{
    ...mapGetters([
      'id',
    ])
  },
  mounted(){
    const id = this.$route.params.id;
    const userId = this.$route.query.userId;
    this.getDetail(id);
    if(userId == this.id) this.myItems1.unshift({
      label: '删除',
      callback: () => {
         this.delete();
      }
    })
  },
  methods:{
    back() {
			this.$router.go(-1);
		},
    rightFunc() {
      this.sheetVisible = true;
    },
    delete(){
      const vm = this;
      const url = vm.urls.deletePetshow;
      const data = {
        id: vm.$route.params.id,
      }
      const callback = () => {
        vm.$router.go(-1);
      }
      const tips = '是否确认删除该动态？';
      vm.utils.confirmCallback(vm, tips, ()=>{
      	vm.utils.postData(url, data, callback);
      });
    },
    getDetail(_id){
      const vm = this;
      const url = vm.urls.getPetshowDetail;
      const data = {
        id: _id
      }
      const options = {
        params: data
      }
      const callback = (r) => {
        let detail = r.data.data;
        detail.createTime = vm.utils.changeDate(detail.createTime, "yyyy年MM月dd日 hh:mm");
        detail.petAvatar = JSON.parse(detail.petAvatar);
        if(detail.userAvatar) {
          detail.userAvatar = JSON.parse(detail.userAvatar);
        }
        vm.detail = detail;
        vm.picList = detail.petAvatar;
      };
      vm.utils.postData(url, data, callback, options);
    }
  }
}
</script>
<style lang="less" scoped>
#PetShowDetail{
  .detail-wrap{
    margin-top: 90px;
    font-size: 32px;
    .act-title{
      background: #ffffff;
      margin-bottom: 20px;
      padding: 30px 20px;
      display: flex;
			display: -webkit-flex;
			justify-content: space-between;
      align-items: center;
      font-weight: bold;
      color: #333333;
			.link{
				width: 20px;
				height: 36px;
				img{
					width: inherit;
					height: inherit;
				}
			}
    }
    .detail-main{
  		background: #ffffff;
  		.detail-title{
        display: block;
  			padding: 20px;
  			border-bottom:1px solid #CCCCCC; /*no*/
  			.user-info{
  				display: flex;
  				align-items:center;
  				margin-bottom: 10px;
  				.pic{
  					display: inline-block;
  					width: 80px;
  					height: 80px;
  					border-radius: 50%;
  					margin-right: 20px;
  					overflow: hidden;
  					img{
              width: 80px;
              height: 80px;
  					}
  				}
  				.desc{
  					display: flex;
  					flex-direction: column;
  					.name{
  						font-size: 28px;
  						margin-bottom: 10px;
  					}
  					.type{
  						color: #999999;
  						&::before{
  							content: "|";
  							margin-right: 5px;
  						}
  						.icon-nan{
  							color: #0275D8;
  						}
  						.icon-nv{
  							color: #f00;
  						}
  					}
  				}
  			}
  			.title-footer{
  				display: flex;
  				justify-content: space-between;
  				align-items: center;
  				color: #999999;
  			}
  		}
  		.detail-notes{
  			max-height: 105px;
  			margin-bottom: 10px;
  			font-size: 28px;
  			line-height: 36px;
  			/* 多行文本溢出利用省略号代替,仅用于webkit内核 $line 行数*/
  			overflow : hidden;
  			text-overflow: ellipsis;
  			display: -webkit-box;
  			-webkit-box-orient: vertical;
  			-webkit-line-clamp: 3;
  			margin: 10px 0 25px;
  			color: #333333;
  			padding: 0 20px;
  		}
  		.detail-pic{
  			margin-bottom: 20px;
  			padding: 20px;
  			img{
  				display: inline-block;
  				width: 200px;
  				height: 200px;
  				border-radius: 10px;
  			}
  		}
  	}
  }
}
</style>
