<template>
	<div id="Mylook-list">
		<Header title="我的寻宠/主列表" :headerLeft="headerLeft" @clickRouter="back"></Header>
		<ul id="lookListTab" class="tab-list">
			<li v-for="(item, index) in lookTabList" >
				<!--<router-link to="">-->
					<label>
						<input type="radio" name="topTabList" :value="item.value"/>
						<span class="tab-name">
							{{item.name}}
						</span>
					</label>
				<!--</router-link>-->
			</li>
		</ul>
<!--		<ul id="lookListTab" class="tab-list">
			<li>
				<router-link to="">
					<label>
						<input type="radio" name="topTabList" value="index"/>
						<span class="tab-name">
						222
						</span>
					</label>
				</router-link>
			</li>
		</ul>-->
		<!-- <input type="radio" name="sss" />-->
		<!--<div></div>
		<div class="nodata">
			
		</div>-->
		
	</div>
</template>

<script>
import Header from '@/components/header';
export default{
	name:'Mylook-list',
	components:{
	    Header
	},
	data(){              
		return{
			headerLeft:true,
			lookTabList:{
				1:{
					name:'全部',
					value: 0,
					href:'/myself/look/list/0'
				},
				2:{
					name:'进行中',
					value: 1,
					href: '/myself/look/list/1'
				},
				3:{
					name:'已结束',
					value: 2,
					href: '/myself/look/list/2'
				}
			}
		}
	},
	created(){
		this.getList()
	},
	methods:{
		back:function(){
			this.$router.replace('/myself');
		},
		getList:function(){
			var vm = this;
			var _tab = vm.$route.params.tab;
			$("#lookListTab").find('input[type=radio]').eq(_tab).click();
			console.log(_tab,$("#lookListTab").find('input[type=radio]').eq(_tab+1).click());
		},
		getAll: function(){
			console.log(1);
		},
		getStatusOne: function(){
			console.log(2);
		},
		getStatusTwo: function(){
			console.log(3);
		},
//		addClickFunToTab:function(data){
//	    	var obj = $("#searchListTab");
//	    	obj.on('click', 'input[type=radio]', function(){
//	    		var index = $(this).parents('li').index();
//	    		$('.list-pagination').hide();
//	    		showList(index, data);
//	    	});
//	   },
	
//	    function showList(index, data){
//	    	var optObj = categoryList[index+1];
//	    	var obj = $("#"+ optObj.wrapName);
//	    	var newUrl = optObj.href;
//	    	history.pushState("","",newUrl);
//	    	$("#search-content > *").hide();
//	    	if(obj.length){
//	    		obj.show();
//	    		$("#" + optObj.wrapName + "_pagination").show();
//	    	}else{
//	    		optObj.func();
//	    	}
//	    }
	}
}
</script>

<style lang="less" scoped>
#Mylook-list{
	.tab-list{
		background: #FFFFFF;
		display: flex;
		padding: 20px 0;
		li{
			padding:0 30px;
			flex: 1;
			border-right: 1px solid #E4E4E4;/*no*/
			
			text-align: center;
			.tab-name{
				position: relative;	
				color: #999999;
				font-size: 30px;
				padding: 0 30px 14px;
			}
			input[type=radio]{
				position: absolute;
				opacity: 1;
				z-index: 100;
				&:checked+.tab-name{
					color: #EB695C;
					border-bottom: 3px solid #EB695C;/*no*/
				}
			}
		}
	}
}
</style>