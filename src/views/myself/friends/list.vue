<template>
	<div id="FriendList">
		<Header :title="topTitle" :headerLeft="headerLeft"
			:fixed="isFixed" @clickRouter="back"></Header>
		<ul class="tab-list">
			<li v-for="(item, index) in actTabList.list" >
				<label>
					<input type="radio" name="topTabList" :value="item.value"
						:checked="item.check" @click="changeToTab(item.value)"/>
					<span class="tab-name">
						{{item.name}}
					</span>
				</label>
			</li>
		</ul>
		<div v-if="actTabList.list[0].check" class="tab">
      <div class="petList">
  			<div v-for="item in listOne">
  				<router-link :to="{ name: 'UserDetail', params: { id: item.id }}" class="pet-wrap">
  					 <span class="pet-info">
                <img src="../../../assets/images/member.png" v-if="!item.userAvatar"/>
    						<span v-else>
                  <img :src="item.userAvatar.fileUrl" />
                </span>
              </span>
							<span class="name">
								{{ item.userName}}
								<i class="iconfont" :class="{'icon-nv':item.userSex ==2,
                  'icon-nan':item.userSex != 2}"></i>
							</span>
  				</router-link>
  			</div>
  		</div>
			<div class="nodata" v-show="noData">
				<img src="../../../assets/images/nodata.svg" />
				<p>暂时还没有关注的宠友哦~</p>
			</div>
		</div>
		<div v-else class="tab">
      <div v-for="item in listTwo">
        <router-link :to="{ name: 'UserDetail', params: { id: item.id }}" class="pet-wrap">
           <span class="pet-info">
              <img src="../../../assets/images/member.png" v-if="!item.userAvatar"/>
              <span v-else>
                <img :src="item.userAvatar.fileUrl" />
              </span>
            </span>
            <span class="name">
              {{ item.userName}}
              <i class="iconfont" :class="{'icon-nv':item.userSex ==2,
                'icon-nan':item.userSex != 2}"></i>
            </span>
        </router-link>
      </div>
      <div class="nodata" v-show="noData">
				<img src="../../../assets/images/nodata.svg" />
				<p>暂时还没有关注您的宠友哦~</p>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';
import { mapGetters } from 'vuex';

export default{
	name:'FriendList',
	components:{
		Header,
	},
	data(){
		return{
			noData: false,
			isFixed:true,
			headerLeft:true,
			topTitle:'我的宠友',
			_type:null,
			actTabList:{
				list:{
					0:{
						name:'关注',
						value: 0,
					},
					1:{
						name:'粉丝',
						value: 1,
					}
				}
			},
			listOne:[],
			listTwo:[],
		}
	},
  computed:{
		...mapGetters([
			'id',
		])
	},
	created(){
		let vm = this;
		vm._type = vm.$route.params.type;
		vm.changeToTab(vm._type);
	},
	methods:{
		back() {
			this.$router.replace('/myself');
		},
		changeToTab(val) {
      const vm = this;
			const value = parseInt(val);
			$.each(this.actTabList.list, function(index,item){
				item.check = false;
				if(index == value){
					item.check = true;
				}
			})
			location.href = location.hash.substring(0,22) + value;
			vm.noData = false;
			if ( value == 0) {
        vm.listTwo = [];
        vm.getList(value);
      } else {
        vm.listOne = [];
        vm.getList(value);
      }
		},
		getList(value) {
			 const vm = this;
			 const url = value == 0 ? vm.urls.getMyFollowers : vm.urls.getMyFollowings;
			 const data = {
         userId: vm.id,
       };
 			 vm.$indicator.open({
 			  spinnerType: 'fading-circle'
 			 });
			 const callback = (r) => {
 				 vm.$indicator.close();
         const list = r.data.data.data;
         list.forEach((item) => {
           if (item.userAvatar) item.userAvatar = JSON.parse(item.userAvatar);
         });
         if (value == 0) {
					 vm.listOne = list;
				 } else {
					 vm.listTwo = list;
				 }
 				 if(list.length == 0) vm.noData = true;
       };
       vm.utils.postData(url, data, callback);
		},
	}
}
</script>

<style lang="less" scoped>
#FriendList{
	.nodata{
		text-align: center;
		margin-top: 50%;
		p{
			margin-top: 20px;
			color: #999999;
		}
	}
	.tab-list{
		background: #FFFFFF;
		display: flex;
		padding: 20px 0;
		margin-bottom: 20px;
		position: fixed;
		top:90px;
		width: 100%;
		border-bottom: 1px solid #e4e4e4;/*no*/
		li{
			padding:0 30px;
			flex: 1;
			border-right: 1px solid #E4E4E4;/*no*/
			text-align: center;
			.tab-name{
				position: relative;
				color: #999999;
				font-size: 30px;
				padding: 0 15px 14px;
			}
			input[type=radio]{
				position: absolute;
				opacity: 0;
				z-index: 100;
				&:checked+.tab-name{
					color: #EB695C;
					border-bottom: 3px solid #EB695C;/*no*/
				}
			}
		}
	}
  .tab {
    padding-top: 160px;
  }
  .pet-wrap{
		background: #FFFFFF;
		display: flex;
		display: -webkit-flex;
		// justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #E4E4E4; /*no*/
		padding: 20px 25px;
		.pet-info{
			img{
				background: #E4E4E4;
				width: 80px;
				height: 80px;
				border-radius: 50%;
				margin-right: 20px;
			}

		}
    .name{
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 15px;
    }
		.right{
			img{
				width: 20px;
				height: 35px;
			}
		}
	}
}
</style>
