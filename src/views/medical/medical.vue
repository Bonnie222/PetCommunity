<template>
	<div id="Medical">
		<Header title="医疗" :headerLeft="headerLeft"></Header>
		<div class="swipe-wrap">
			<mt-swipe :auto="4000">
		  		<mt-swipe-item>1</mt-swipe-item>
		  		<mt-swipe-item>2</mt-swipe-item>
		  		<mt-swipe-item>3</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="medical-menu">
			<div class="menu-item" v-for="item in medicalMenu">
				<router-link to="item.href" class="menu-link">
					<i :class="item.icon"></i>
					<span class="menu-name">{{item.name}}</span>
				</router-link>
			</div>
		</div>
		<div class="medical-btn">
			<router-link to="" class="btn">
				<i class="iconfont icon-jibingshaicha"></i>
				<span>疾病速查</span>
			</router-link>
			<router-link to="" class="btn">
				<i class="iconfont icon-Interrogation"></i>
				<span>疾病速查</span>
			</router-link>
		</div>
		<Navmenu></Navmenu>
	</div>
</template>

<script>
import Header from '@/components/header'
import Navmenu from '@/components/navmenu'
export default{
	name:"Medical",
	components:{
	    Header,Navmenu
	},
	data(){
		return{
			headerLeft: false,
			show1:false,
			
			medicalMenu:[{
				name: '呼吸系统',
				icon:'iconfont icon-huxixitong',
				href:''
			},{
				name:'消化系统',
				icon:'iconfont icon-xiaohuaxitong',
				href:''
			},{
				name:'皮肤病',
				icon:'iconfont icon-chongwu1',
				href: ''
			},{
				name:'骨科、外科',
				icon:'iconfont icon-guke',
				href:''
			},{
				name:'泌尿生殖',
				icon:'iconfont icon-miniao',
				href:''
			},{
				name:'五官科',
				icon:'iconfont icon-xiyiwuguanke',
				href:''
			},{
				name:'免疫',
				icon:'iconfont icon-zhentongline',
				href:''
			},{
				name:'驱虫',
				icon:'iconfont icon-quchong',
				href:''
			}]
		}
	},
	methods:{
	}
}
</script>

<style lang="less" scoped>
#Medical{
	.swipe-wrap{
		background: yellowgreen;
		height: 250px;
	}
	.medical-menu{
		background: #FFFFFF;
		height: 380px;
		display: flex;
		flex-wrap: wrap;
		.menu-item{
			/*display: inline-block;*/
			width: 25%;
			border-right:1px solid #e4e4e4; /*no*/
			border-bottom: 1px solid #e4e4e4; /*no*/
		    &:nth-of-type(4n){
		    	border-right:none
		    }
		    .menu-link{
		    	display: flex;
		    	display: -webkit-flex;
		    	flex-direction: column;
		    	align-items: center;
		    	padding: 38px 0;
		    	.iconfont{
		    		display: block;
		    		font-size: 60px;
		    		margin-bottom: 20px;
		    	}
		    	.menu-name{
		    		display: block;
		    		color: #999999;
		    		font-size: 30px;
		    	}
		    	.icon-huxixitong{
		    		color: #54B0F1;
		    	}
		    	.icon-xiaohuaxitong{
		    		color: #d4237a;
		    	}
		    	.icon-chongwu1{
		    		color:#d81e06;
		    	}
		    	.icon-guke{
		    		color: #fbb017;
		    	}
		    	.icon-miniao{
		    		color: #1afa29;
		    	}
		    	.icon-xiyiwuguanke{
		    		color: #9933cc;
		    	}
		    	.icon-zhentongline{
		    		color: #ff3300;
		    	}
		    	.icon-quchong{
		    		color: #13227a;
		    	}
		    	
		    }
		}
	}
	.medical-btn{
		height: 100px;
		display: flex;
		display: -webkit-flex;
		background: #FFFFFF;
		.btn{
			display: flex;
			display: -webkit-flex;
			justify-content: center;
			align-items: center;
			width: 50%;
			border-bottom: 1px solid #e4e4e4;/*no*/
			color:#EB695C;
			font-size:30px;
			&:last-child{
				border-left: 1px solid #e4e4e4;/*no*/
			}
			.iconfont{
				display: inline-block;
				margin-right: 10px;
				font-size:36px;
				font-weight: bold;
			}
		}
	}
}
</style>