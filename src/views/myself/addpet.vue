<template>
	<div id="Addpet">
		<Header title="添加宠物" :headerLeft="headerLeft"></Header>
		<div class="form">
			<div class="pic">
				<img src="" />
			</div>
			<div class="info">
				<div class="info-item">
					<span class="item-name">宠物名称</span>
					<input class="item-input" value="" placeholder="设置宠物名称"/>
				</div>
				<div class="info-item">
					<span class="item-name">宠物性别</span>
					<input class="item-input" value="22"/>
				</div>
				<div class="info-item">
					<span class="item-name">宠物品种</span>
					<input class="item-input" value="" placeholder="选择宠物品种"/>
				</div>
				<div class="info-item">
					<span class="item-name">宠物生日</span>
					<input class="item-input" value="" placeholder="选择宠物生日"/>
				</div>
				<div class="info-item">
					<span class="item-name">到家时间</span>
					<input class="item-input" value="" placeholder="选填"/>
				</div>
				<div class="info-item">
					<span class="item-name">绝育状态</span>
					<input class="item-input" value="" placeholder="选择绝育状态"/>
				</div>
			</div>
		</div>
		
		<div class="btn-wrap">
			<button class="btn-save" >保存</button>
		</div>
		<!--<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>-->
	</div>
</template>

<script>
import Header from '@/components/header'
export default{
	name:"Mypet",
	components:{
	    Header
	},
	data(){
		return{
			headerLeft: true,
//			show1:false,
			slots: [
			        {
			          flex: 1,
			          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
			          className: 'slot1',
			          textAlign: 'right'
			        }, {
			          divider: true,
			          content: '-',
			          className: 'slot2'
			        }, {
			          flex: 1,
			          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
			          className: 'slot3',
			          textAlign: 'left'
			        }
			      ]
		}
	},
	methods:{
		 onValuesChange(picker, values) {
		 	console.log(picker, values);
	      if (values[0] > values[1]) {
	        picker.setSlotValue(1, values[0]);
	      }
	    }
	}
}
</script>

<style lang="less" scoped>
#Addpet{
	.form{
		.pic{
			height: 200px;
		}
		.info{
			background: #FFFFFF;
			.info-item{
				display: flex;
				display: -webkit-flex;
				justify-content: space-between;
				font-size:32px;
				color: #666666;
				padding:30px 40px;
				border-bottom: 1px solid #E4E4E4; /*no*/
				.item-name{
					
				}
				.item-input{
					text-align: right;
				}
				input::placeholder{
					color:#cccccc;
				}
			}
			
		}
	}
	.btn-wrap{
		margin-top: 50px;
	    .btn-save{
	    	display: block;
	    	margin: 0 auto;
	    	width: 90%;
	    }
	}
	
}
</style>