<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
	.btn-wrap{
	    .btn-cancel,.btn-save{
	        width: 300px;
	        height: 88px;
	        border-radius: 5px;
	    }
	    .btn-cancel{
	        background: #ffffff;
	        border:1px solid #eb695c;
	        color:  #eb695c;
	    }
	    .btn-save{
	        background: #eb695c;
	        border:1px solid  #eb695c;
	        color: #ffffff;
	    }
	}
}
</style>
