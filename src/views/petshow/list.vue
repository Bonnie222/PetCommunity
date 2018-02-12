<template>
	<div id="Petshow">
		<Header title="医疗" :headerLeft="headerLeft"></Header>
	</div>
</template>

<script>
import Navmenu from '@/components/navmenu'
export default{
	name:"Petshow",
	components:{
	    Navmenu
	},
	data(){
		return{
			headerLeft: false,
			show1:false
		}
	},
	methods:{
	}
}
</script>

<style>
</style>