<template>
	<div id="Navmenu">
	    <div class="menu-list">
	         <span>ss</span>
	         <span>首页</span>
	    </div>
	    <div class="menu-list">
	         <span>ss</span>
	         <span>宠物秀</span>
	    </div>
	    <div class="menu-list">
	         <span class="middlemenu"></span>
	    </div>
	    <div class="menu-list">
	         <span>ss</span>
	         <span>医疗</span>
	    </div>
	    <div class="menu-list">
	         <span>ss</span>
	         <span>我的</span>
	    </div>
	</div>
</template>

<script>
export default{
	name:"Navmenu",
	data(){
		return{
			
		}
	}
}
</script>

<style lang="less">
#Navmenu{
	position: absolute;
	bottom: 0;
	background: #ffffff;
	width: 100%;
	height: 100px;
	display: flex;
	justify-content:space-around;
	align-items: center;
	border-top:1px solid #e4e4e4;
	.menu-list{
		display: flex;
		flex-direction: column;
		align-items: center;
		.middlemenu{
			background: #eb695c;
			width: 40px;
			height: 40px;
			border-radius: 100%;
			text-align:center; 
			line-height: 40px;
			&::after{
				content: "+";
				color:#ffffff;				
				font-size: 36px;
			}			
		}
	}
	
}
</style>