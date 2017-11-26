<template>
	<mt-header :title="title" id="header1">
	    <router-link to="/" slot="left">
	        <mt-button icon="back" @click="handleClose"></mt-button>
	    </router-link>
	    <mt-button icon="more" slot="right"></mt-button>
	</mt-header>
</template>

<script>
export default {
    props:{
    	title:{ type:String, default:"" }
    },
    data(){
    	return{
    	}
    }
}
</script>

<style>
</style>