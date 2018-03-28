<template>
	<mt-header :title="title" id="header" :fixed="fixed">
	    <mt-button icon="back" @click="gotoRouter" slot="left" v-show="headerLeft"></mt-button>
	    <mt-button slot="right" @click="rightFunc" v-show="headerRight">{{headerRightText}}</mt-button>
	</mt-header>
</template>

<script>
export default {
    props:{
    	title:{ type:String, default:"" },
    	headerLeft:{ type:Boolean, default:true },
    	headerRight:{ type:Boolean, default:true },
			headerRightText: { type:String, default:null },
    	fixed:{ type:Boolean, default:false },
    },
    data(){
    	return{
    	}
    },
    methods:{
    	gotoRouter(){
    		//发送事件
				this.$emit('clickRouter')
    	},
			rightFunc(){
    		//发送事件
				this.$emit('rightFunc');
    	}
    }
}
</script>

<style>
.mint-header{
	background: #eb695c;
	height: 90px;
	font-size: 36px;
}
.mint-button-text{
	font-size: 28px;
}
</style>
