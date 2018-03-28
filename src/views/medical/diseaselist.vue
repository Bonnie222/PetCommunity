<template>
	<div id="DiseaseList">
		<Header title="问诊列表" :headerLeft="headerLeft" @clickRouter="back"></Header>
		<div class="list-title">
			<div class="title-wrap">
				<span class="title">呼吸系统</span>
			</div>
			<div class="title-wrap">
				<span class="tip">咳嗽</span>
				<span class="tip">流鼻涕</span>
				<span class="tip">咳嗽</span>
				<span class="tip">流鼻涕</span>
			</div>
		</div>
		<div class="list-wrap">
			<div class="list-item">
				<span class="pic"></span>
				<span class="mess">
					<span class="desc">刘青色鼻涕，有一点咳嗽，一天能咳嗽两三声，声音像有痰，但没能刻出来过你阿红啊，一天能咳嗽两三声，声音像有痰，但没能刻出来过你阿红啊</span>
					<span class="tips">
						<span class="tip">咳嗽</span>
						<span class="tip">掉毛</span>
					</span>
					<span class="time">2017-12-25 19:30</span>
				</span>
			</div>
			<div class="list-item">
				<span class="pic"></span>
				<span class="mess">
					<span class="desc">刘青色鼻涕，有一点咳嗽，一天能咳嗽两三声，声音像有痰，但没能刻出来过你阿红啊，一天能咳嗽两三声，声音像有痰，但没能刻出来过你阿红啊</span>
					<span class="tips">
						<span class="tip">咳嗽</span>
						<span class="tip">掉毛</span>
					</span>
					<span class="time">2017-12-25 19:30</span>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';
export default{
	name:"DiseaseList",
	components:{
	    Header
	},
	data(){
		return{
			headerLeft: true,
			
		}
	},
	methods:{
		back() {
			this.$router.go(-1);
		}
	}
}
</script>

<style lang="less" scoped>
#DiseaseList{
	.list-title{
		background: #FFFFFF;
		margin-bottom: 30px;
		.title-wrap{
			padding:0 30px;
			height: 100px;
			line-height: 100px;
			border-bottom: 1px solid #E4E4E4; /*no*/
			.title{
				color: #EB695C;
				font-size: 30px;
				border-left: 2px solid #EB695C;/*no*/
				padding-left:15px;
			}
			.tip{
				color:#666666;
				font-size: 28px;
			}
		}
	}
	.list-wrap{
		background: #FFFFFF;
		.list-item{
			padding: 20px 25px;
			border-bottom: 1px solid #E4E4E4;/*no*/
			overflow:hidden;
			.pic{
				display: inline-block;
				background: yellow;
				width: 80px;
				height: 80px;
				border-radius: 50%;
				margin-right: 20px;
				float: left;
			}
			.mess{
				display: flex;
				display: -webkit-flex;
				flex-direction: column;
				.desc{
					/* 多行文本溢出利用省略号代替,仅用于webkit内核 $line 行数*/
				    overflow : hidden;
				    text-overflow: ellipsis;
				    display: -webkit-box;
				    -webkit-box-orient: vertical;
				    -webkit-line-clamp: 2;
					margin: 10px 0 25px;
					color: #333333;
					line-height: 34px;
					max-height: 65px;
					font-size: 28px;
				}
				.tips{
					font-size: 22px;
					.tip{
						color: #FFFFFF;
						background: #EB695C;
						padding: 5px 12px;
						border-radius: 20px;
					}
				}
				.time{
					text-align: right;
					color: #999999;
				}
			}
		}
	}

}
</style>
