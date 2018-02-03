<template>
	<mt-header :title="title" id="header">
	    <mt-button icon="back" @click="gotoRouter" slot="left" v-show="headerLeft"></mt-button>
	    <mt-button icon="more" slot="right" v-show="headerRight"></mt-button>
	</mt-header>
</template>

<script>
export default {
    props:{
    	title:{ type:String, default:"" },
    	headerLeft:{ type:Boolean, default:true },
    	headerRight:{ type:Boolean, default:false }
    },
    data(){
    	return{
    	}
    },
    methods:{
    	gotoRouter: function(){
    		//发送事件
			this.$emit('clickRouter')
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
</style>