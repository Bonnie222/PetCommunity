<template>
	<div id="choice-window">
		<ul class="store-list">
			<li @click="confirm(obj)" v-for="obj in data" :class="{'active':obj.isChecked}">
				<!--<input type='radio' name="data" />-->
				<span class="store-name">{{obj.text}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default{
	name:"choice-window",
	props:{
		dataList: { type: Array, default: []}
   	},
	data(){
		return{
			data:[]
		}
	},
	created(){
		this.init();
	},
	methods:{
		init: function(){
			this.data = this.dataList;
		},
		confirm: function(obj){
    		//发送事件
			this.$emit('confirm', obj);
    	}
	}
}
</script>

<style lang="less" scoped>
#choice-window{
	.store-list{
        background: #FFFFFF;
        margin-top: 40px;
        padding: 0 20px;
        & > li{
            padding: 30px 20px;
            font-size: 32px;
        /*    height: 152px*/;
            border-bottom: 1px solid #E4E4E4;
            &:last-child{
                border-bottom: none;
            }
            &.active{
                &:after{
                    display: block;
                    content: "";
                    background-image: url(../assets/images/icon-check.png);
                    background-size: 36px 26px;
                    float: right;
                    width: 36px;
                    height: 26px;
                }
            }
        }
    }
}
</style>