<template>
  <div id="PetShowDetail">
    <Header title="详情" :headerLeft="headerLeft"
			:fixed="isFixed" @clickRouter="back"></Header>
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
  					<div class="user-info">
  						<span class="pic">
  							<img src="../../assets/images/member.png"
  							 v-if="userInfo.userAvatar == null"/>
  						</span>
  						<span class="desc">
  							<span class="name">{{userInfo.userName}}</span>
  							<span>{{detail.createTime}}</span>
  						</span>
  					</div>
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
  </div>
</template>
<script>
import Header from '@/components/header';
export default{
  name: 'PetShowDetail',
  components:{
		Header,
	},
  data(){
    return{
      isFixed:true,
			headerLeft:true,
      detail:{},
      userInfo:{},
      picList:[],
    }
  },
  mounted(){
    const id = this.$route.params.id;
    this.getDetail(id);
  },
  methods:{
    back() {
			this.$router.go(-1);
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
        let detail = r.data.data[0];
        detail.createTime = vm.utils.changeDate(detail.createTime, "yyyy年MM月dd日 hh:mm");
        detail.userInfo = JSON.parse(detail.userInfo);
        detail.petAvatar = JSON.parse(detail.petAvatar);
        vm.detail = detail;
        vm.userInfo = detail.userInfo;
        vm.picList = detail.petAvatar;
        console.log(detail);
      };
      console.log(url, data);
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
  					background: yellow;
  					border-radius: 50%;
  					margin-right: 20px;
  					overflow: hidden;
  					img{
  						width: inherit;
  						height: inherit;
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
