<template>
	<div id="Navmenu">
	    <div class="menu">
	    	<div class="menu-list" @click="gotoRouter('home')">
		         <span>ss</span>
		         <span>首页</span>
		    </div>
		    <div class="menu-list" @click="gotoRouter('petshow')">
		         <span>ss</span>
		         <span>宠物秀</span>
		    </div>
		    <div class="menu-list" @click="showadd=true">
		         <span class="middlemenu"></span>
		    </div>
		    <div class="menu-list" @click="gotoRouter('medical')">
		         <span>ss</span>
		         <span>医疗</span>
		    </div>
		    <div class="menu-list" @click="gotoRouter('myself')">
		         <span>ss</span>
		         <span>我的</span>
		    </div>
	    </div>
	    <yd-popup v-model="showadd" position="center" width="90%">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
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
		gotoRouter: function(path){
			this.$router.push("/" + path);
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
	}
	.menu-list{
		display: flex;
		flex-direction: column;
		align-items: center;
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
	}
	
}
</style>