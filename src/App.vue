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

<style lang="less" rel="stylesheet/less">
#app {
	overflow-x: hidden;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  height: inherit;
	.btn-wrap{
	    .btn-cancel,.btn-save{
	        width: 300px;
	        height: 88px;
	        border-radius: 5px;
	        font-size: 36px;
	    }
	    .btn-cancel{
	        background: #ffffff;
	        border:1px solid #eb695c; /*no*/
	        color:  #eb695c;
	    }
	    .btn-save{
	        background: #eb695c;
	        border:1px solid  #eb695c; /*no*/
	        color: #ffffff;
	    }
	}
  .icon-nan{
    color: #0275D8;
  }
  .icon-nv{
    color: #f00;
  }
  .yd-accordion-title{
    font-size: 30px !important;
  }
  .link{
		width: 15px;
		height: 26px;
		img{
			width: inherit;
			height: inherit;
		}
	}
  .nodata{
		text-align: center;
		margin-top: 50%;
		p{
			margin-top: 20px;
			color: #999999;
		}
	}
}
</style>
