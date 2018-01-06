<template>
	<div id="Petshow">
		
		<Navmenu></Navmenu>
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