<template>
  <div id="DiseaseDetail">
    <Header title="疾病详情" v-bind="header"
      @clickRouter="back"></Header>
    <div class="detail-wrap">
      <div class="detail-main">
        <div class="detail-title">
  					<div class="user-info">
              <router-link :to="{ name: 'UserDetail', params: {id: detail.userId}}">
    						<span class="flex">
                  <span class="pic">
      							<img src="../../assets/images/member.png"
      							 v-if="detail.userAvatar == null"/>
                     <span v-else>
                       <img :src="detail.userAvatar.fileUrl"/>
                     </span>
      						</span>
      						<span class="desc">
      							<span class="name">{{detail.userName}}</span>
      						</span>
                </span>
              </router-link>
              <span v-show="id==detail.userId" class="delete"
                @click="del">删除</span>
  					</div>
        </div>
        <div class="detail-time">
          <span></span>
          <span>{{detail.createTime}}</span>
        </div>
				<div class="detail-notes" v-html="detail.note"></div>
				<div class="detail-pic">
					<yd-lightbox :num="picList.length">
						 <yd-lightbox-img v-for="(pic, per) in picList"
						 :key="per" :src="pic.fileUrl"></yd-lightbox-img>
				 </yd-lightbox>
				</div>
        <div class="detail-petInfo">
          <span>
            <span>{{config.petTypeList[detail.petType]}}</span>
            <span>{{utils.calculateAge(detail.petBirth)}}</span>
            <span>{{detail.petSex == 1 ? '公' : '母'}}</span>
          </span>
          <span>
            <span>{{detail.isInsert == 1 ? '已驱虫': '未驱虫'}}</span>
            <span>{{detail.isVaccine == 1 ? '已免疫':'未免疫'}}</span>
          </span>
        </div>
        <div class="detail-symptom">
          <span class="symptom-item" v-show="symptoms.breath">
            <label>呼吸系统</label>
            <span class="symptom-list">
              <span v-for="(item, idx) in symptoms.breath" :key="idx">
                {{item}}
              </span>
            </span>
          </span>
          <span class="symptom-item" v-show="symptoms.digestion">
            <label>消化系统</label>
            <span class="symptom-list">
              <p>是否有呕吐物：
                <span v-for="item in digestion.vomiting">{{item}}</span>
              </p>
              <p>是否有呕吐物：
                <span v-for="item in digestion.diarrhea">{{item}}</span>
              </p>
            </span>
          </span>
          <span class="symptom-item" v-show="symptoms.skin">
            <label>皮肤病</label>
            <span class="symptom-list">
              <p>瘙痒症状：
                <span v-for="item in skin.tickle">{{item}}</span>
              </p>
              <p>掉毛症状：
                <span v-for="item in skin.hair">{{item}}</span>
              </p>
              <p>近三个月患体外寄生虫：
                <span v-for="item in skin.parasite">{{item == 1 ? '是':'否'}}</span>
              </p>
              <p>是否做体外寄生虫预防：
                <span v-for="item in skin.against">{{item == 1 ? '是':'否'}}</span>
              </p>
            </span>
          </span>
          <span class="symptom-item" v-show="symptoms.surgical">
            <label>骨科、外科</label>
            <span class="symptom-list">
              <p>受伤原因：
                <span>{{surgical.cause}}</span>
              </p>
              <p>受伤时间：
                <span>{{utils.changeDate(surgical.time, 'yyyy-MM-dd hh:mm')}}</span>
              </p>
            </span>
          </span>
          <span class="symptom-item" v-show="symptoms.urinary">
            <label>泌尿生殖系统</label>
            <span class="symptom-list">
              <p>饮水量：
                <span v-for="item in urinary.water">{{item}}</span>
              </p>
              <p>尿次数：
                <span v-for="item in urinary.times">{{item}}</span>
              </p>
              <p>一天总尿量：
                <span v-for="item in urinary.total">{{item}}</span>
              </p>
              <p>尿颜色：
                <span v-for="item in urinary.color">{{item}}</span>
              </p>
              <p>尿液有血色：
                <span v-for="item in urinary.hasBlood">{{item}}</span>
              </p>
            </span>
          </span>
          <span class="symptom-item" v-show="symptoms.facial">
            <label>五官科</label>
            <span class="symptom-list">
              <p>眼泪、眼屎：
                <span v-for="item in facial.tears">{{item}}</span>
              </p>
              <p>耳有无异味：
                <span v-for="item in facial.earSmell">
                  {{item == 1 ?'有':'无'}}
                </span>
              </p>
              <p>耳是否瘙痒：
                <span v-for="item in facial.earTickle">
                  {{item == 1 ?'有':'无'}}
                </span>
              </p>
              <p>耳内分泌物颜色：
                <span v-for="item in facial.earColor">{{item}}</span>
              </p>
              <p>鼻是否干燥：
                <span v-for="item in facial.nose">{{item}}</span>
              </p>
              <p>口腔、是否正常进食：
                <span v-for="item in facial.oral">
                {{item == 1 ?'是':'否'}}</span>
              </p>
              <p>流口水症状：
                <span v-for="item in facial.isDrool">
                {{item == 1 ?'是':'否'}}</span>
              </p>
              <p>有牙结石：
                <span v-for="item in facial.hasTeeth">
                {{item == 1 ?'是':'否'}}</span>
              </p>
            </span>
          </span>
          <span class="symptom-item" v-show="symptoms.immune">
            <label>免疫</label>
            <span class="symptom-list">
              <p>主人问题：
                <span >{{immune.question}}</span>
              </p>
              <p>最近一次免疫时间：
                <span>{{utils.changeDate(immune.time)}}</span>
              </p>
            </span>
          </span>
          <span class="symptom-item" v-show="symptoms.insert">
            <label>驱虫</label>
            <span class="symptom-list">
              <p>主人问题：
                <span >{{insert.question}}</span>
              </p>
              <p>最近一次驱虫时间：
                <span>{{utils.changeDate(insert.time)}}</span>
              </p>
            </span>
          </span>
        </div>
  		</div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header';
import { mapGetters } from 'vuex';

export default{
  name: 'DiseaseDetail',
  components:{
		Header,
	},
  data(){
    return{
      header:{
        fixed:true,
  			headerLeft:true,
      },
      detail:{},
      picList:[],
      symptoms: {},
      digestion:{},
      skin:{},
      surgical:{},
      urinary:{},
      facial:{},
      insert:{},
      immune:{},
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
    this.getDetail(id);
  },
  methods:{
    back() {
			this.$router.go(-1);
		},
    del(){
      const vm = this;
      const url = vm.urls.deleteDisease;
      const data = {
        id: vm.$route.params.id,
      }
      const callback = () => {
        vm.$router.go(-1);
      }
      const tips = '是否确认删除该问诊？';
      vm.utils.confirmCallback(vm, tips, ()=>{
      	vm.utils.postData(url, data, callback);
      });
    },
    getDetail(_id){
      const vm = this;
      const url = vm.urls.getDiseaseDetail;
      const data = {
        id: _id
      }
      const options = {
        params: data
      }
      const callback = (r) => {
        let detail = r.data.data;
        detail.createTime = vm.utils.changeDate(detail.createTime, "yyyy年MM月dd日 hh:mm");
        if(detail.photo) {
          detail.photo = JSON.parse(detail.photo);
        }
        if(detail.userAvatar) {
          detail.userAvatar = JSON.parse(detail.userAvatar);
        }
        detail.diseaseType = JSON.parse(detail.diseaseType);
        vm.symptoms = JSON.parse(detail.symptoms);
        detail.diseaseType.forEach((item) => {
          vm[vm.config.diseaseListEn[item]] = vm.symptoms[vm.config.diseaseListEn[item]];
        })
        vm.detail = detail;
        vm.picList = detail.photo ? detail.photo : [];
      };
      vm.utils.postData(url, data, callback, options);
    }
  }
}
</script>
<style lang="less" scoped>
#DiseaseDetail{
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
          justify-content: space-between;
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
          .delete {
            color: blue;
            font-size: 26px;
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
      .detail-time {
        display: flex;
        justify-content: space-between;
        font-size: 26px;
        padding: 20px;
        color: #999999;
      }
      .detail-notes{
  			margin-bottom: 10px;
  			font-size: 28px;
  			line-height: 40px;
        letter-spacing: 3px;
  			margin: 10px 0;
  			color: #333333;
  			padding: 0 20px;
  		}
  		.detail-pic{
  			padding: 20px;
  			img{
  				display: inline-block;
  				width: 200px;
  				height: 200px;
  				border-radius: 10px;
  			}
  		}
      .detail-petInfo {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        font-size: 28px;
        color: #999999;
      }
      .detail-symptom{
        .symptom-item{
          display: flex;
          border-top: 1px solid #e4e4e4; /*no*/
          padding: 20px;
          font-size: 28px;
          label {
            color: #999999;
            flex: 1;
          }
          .symptom-list {
            flex: 2;
            p{
              margin-bottom: 10px;
              line-height: 34px;
            }
          }
        }
      }
  	}
  }
}
</style>
