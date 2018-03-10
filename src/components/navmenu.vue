<template>
	<div id="Navmenu">
	    <div class="menu">
	    	<span class="menu-list" v-for="item in FootMenu1">
		        <router-link class="menu-item" :to="item.href">
		        	<i :class="item.icon"></i>
		        	<span>{{item.name}}</span>
		        </router-link>
		    </span>
		    <span class="menu-list" @click="showadd=true">
		         <span class="menu-item">
		         	<span class="middlemenu"></span>
		         </span>
		    </span>
		    <span class="menu-list" v-for="item in FootMenu2">
		        <router-link class="menu-item" :to="item.href">
		        	<i :class="item.icon"></i>
		        	<span>{{item.name}}</span>
		        </router-link>
		    </span>
	    </div>
	   <div class="overlayer" v-show="showadd" @click="hideAdd()"></div>
	   		<div class="commonWindow-wrap" v-show="showadd">
		    	<div class="center-wrap">
		    		<router-link :to="item.href" class="route-item" v-for="item in MiddleMenu1" :key="item.name">
		        		<span>
		        			<i :class="item.icon"></i>
		        		</span>
		        		<label>{{item.name}}</label>
		          	</router-link>
		    	</div>
	            <div class="center-wrap">
	            	<router-link :to="item.href" class="route-item" v-for="item in MiddleMenu2" :key="item.name">
		        		<span>
		        			<i :class="item.icon"></i>
		        		</span>
		        		<label>{{item.name}}</label>
		          	</router-link>
	            </div>
	       	</div>
       	</div>
	</div>
</template>

<script>
export default{
	props:{
		//popup:{}
	},
	name:"Navmenu",
	data(){
		return{
			showadd:false,
			FootMenu1:[{
				name: '首页',
				icon:'iconfont icon-shouye1',
				href:'/home'
			},{
				name:'宠物秀',
				icon:'iconfont icon-chongwu',
				href:'/petshow/list'
			}],
			FootMenu2:[{
				name: '医疗',
				icon:'iconfont icon-yiliao',
				href:'/medical'
			},{
				name:'我的',
				icon:'iconfont icon-wo2',
				href:'/myself'
			}],
			MiddleMenu1:[{
				name: '发帖',
				icon:'iconfont icon-float_fatie',
				href:''
			},{
				name:'发布图片',
				icon:'iconfont icon-tupian',
				href:'/petshow/edit'
			}],
			MiddleMenu2:[{
				name:'发起活动',
				icon:'iconfont icon-huodong2',
				href: '/activity/edit'
			},{
				name:'发起寻主/宠',
				icon:'iconfont icon-chazhao',
				href:'/look/edit'
			}]

		}
	},
	methods:{
		hideAdd:function(){
			this.showadd = false;
		}
	}
}
</script>

<style lang="less">
#Navmenu{
	position: fixed;
	bottom: 0;
	background: #ffffff;
	width: 100%;
	height: 100px;
	border-top:1px solid #e4e4e4;
	.menu{
		height: inherit;
		display: flex;
		display: -webkit-flex; /* Safari */
		justify-content:space-around;
		align-items: center;
		font-size: 0;
	}
	.menu-list{
		display: inline-block;
		position: relative;
		font-size: 22px;
		.menu-item{
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #666666;
			margin-top: 10px;
		}
		.iconfont{
			display: block;
			font-size: 46px;
			margin-bottom: 5px;
		}
		.middlemenu{
			background: #eb695c;
			width: 80px;
			height: 80px;
			border-radius: 100%;
			text-align:center;
			line-height: 80px;
			&::after{
				content: "+";
				color:#ffffff;
				font-size: 88px;
			}
		}
		.router-link-active{
			color: #EB695C;
		}
	}
	.overlayer {
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background: rgba(0, 0, 0, .7);
	    z-index: 998;
	}
	.commonWindow-wrap{
		position: fixed;
		top: 50%;
	    transform: translateY(-50%);
	    left: 50%;
	    margin-left: -300px;
	    z-index: 999;
		.center-wrap{
			display: flex;
			justify-content: space-between;
			margin-bottom: 60px;
		}
		.route-item{
			width:300px;
			display: flex;
			flex-direction: column;
			text-align: center;
			margin-right: 20px;
			&:last-child{
				margin-right: 0;
			}
			span{
				margin: 0 auto;
				background: #fff;
				width: 120px;
				height: 120px;
				margin-bottom: 30px;
				position:relative;
				border-radius: 50%;
			}
			label{
				color: #fff;
				font-size: 30px;
			}
		}
		.iconfont{
			font-size: 125px;
			position: absolute;
			top:10px;
			left: -3px;
		}
		.icon-float_fatie{
			color: #FD60FC;
		}
		.icon-tupian{
			color: #3EA3FF;
		}
		.icon-huodong2{
			color: #FF5E66;
		}
		.icon-chazhao{
			color: #30a595;
		}
	}

}
</style>
