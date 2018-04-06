<template>
	<mt-header :title="title" id="header" :fixed="fixed">
	    <mt-button icon="back" @click="gotoRouter" slot="left"
				v-show="headerLeft"></mt-button>
	    <mt-button slot="right" @click="rightFunc"
				v-show="headerRight">{{headerRightText}}</mt-button>
			<mt-button slot="right" icon="more" @click="rightFunc"
				v-show="headerRightIcon"></mt-button>
	</mt-header>
</template>
<script>
export default {
    props:{
    	title:{ type:String, default:"" },
    	headerLeft:{ type:Boolean, default:true },
    	headerRight:{ type:Boolean, default:false },
			headerRightIcon: { type:Boolean, default:false},
			headerRightText: { type:String, default:null },
    	fixed:{ type:Boolean, default:false },
    },
    methods:{
    	gotoRouter(){
				this.$emit('clickRouter'); //发送事件
    	},
			rightFunc(){
				this.$emit('rightFunc');  //发送事件
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
