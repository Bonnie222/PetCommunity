<template>
	<div id="Navmenu">
	    <div class="menu">
	    	<span class="menu-list">
		        <router-link class="menu-item" to="/home">
		        	<i class="iconfont icon-shouye1"></i>
		        	<span>首页</span>
		        </router-link>
		    </span>
		    <span class="menu-list" >
		    	<router-link class="menu-item" to="/petshow">
		        	<i class="iconfont icon-chongwu"></i>
		         	<span>宠物秀</span>
		        </router-link>
		    </span>
		    <span class="menu-list" @click="showadd=true">
		         <span class="menu-item">
		         	<span class="middlemenu"></span>
		         </span>
		    </span>
		    <span class="menu-list">
		    	<router-link class="menu-item" to="/medical">
		        	<i class="iconfont icon-yiliao"></i>
		         	<span>医疗</span>
		        </router-link>
		    </span>
		    <span class="menu-list">
		    	<router-link class="menu-item" to="/myself">
		        	<i class="iconfont icon-wo2"></i>
		         	<span>我的</span>
		        </router-link>
		    </span>
	    </div>
	    <yd-popup v-model="showadd" position="center" width="90%" class="middle">
            <!--<div class="">
            	<router-link to="">
            		<i></i>
            		<span>11</span>
            	</router-link>
            </div>
            <div>
            	<router-link to="">
            		<i></i>
            		<span>11</span>
            	</router-link>
            </div>
            <div>
            	<router-link to="">
            		<i></i>
            		<span>11</span>
            	</router-link>
            </div>
            <div>
            	<router-link to="">
            		<i></i>
            		<span>11</span>
            	</router-link>
            </div>-->
        </yd-popup>
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
			showadd:false
			
		}
	},
	methods:{

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
		font-size: 28px;
		.menu-item{
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #666666;
		}
		.iconfont{
			display: block;
			font-size: 36px;
			margin-bottom: 10px;
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
	/*.middle{
		display: flex;	
	}*/
	
}
</style>