<template>
	<div id="Register">
		<Header title="注册"></Header>
		<div class="formlist">
			<ul>
				<li class="">
					<label>手机<span class="tip">*</span></label>
					<input type="text" placeholder="" value=""/>
				</li>
				<li class="">
					<label>昵称<span class="tip">*</span></label>
					<input type="text" placeholder="" value=""/>
				</li>
				<li class="">
					<label>密码</label>
					<input type="text" placeholder="请设置6位数密码" value=""/>
				</li>
				<li class="">
					<label>邮箱</label>
					<input type="text" placeholder="" value=""/>
				</li>
				<li class="">
					<label>性别</label>
					<span class="radio-wrap">
						<input type="radio" class="radio-input" value="A" />
					    <span class="radio-core"></span>
					    <span class="radio-label">男</span>
					    <input type="radio" class="radio-input" value="A" />
					    <span class="radio-core"></span>
					    <span class="radio-label">女</span>
					</span>			
				</li>
				<li class="">
					<label>生日</label>
					<input type="text" value=""/>
				</li>
			</ul>
		</div>
		<div class="btn-wrap">
			<button class="btn-save">注册</button>
		</div>
		<p class="readp">
			<span class="readcore">@</span>
			<span>我同意《ssssss》</span>
		</p>
	</div>
</template>

<script>
import Header from '@/components/header'
export default {
    name: 'Register',
    components:{
    	Header
    },
    data(){
    	return{
    		
    	
    	}
    }
}
</script>

<style lang="less" scoped>
#Register{
	.formlist{
		background: #ffffff;
		margin-top: 40px;
		color: #666666;
		font-size: 34px;
		& ul{			
			& li{
				margin: 0 50px;
				height: 125px;
				border-bottom: 1px solid #e4e4e4; /*no*/
				&:last-child{
					border: none;
				}
				label{
					display: inline-block;
					width: 100px;
					height: 125px;
					line-height: 125px;
					text-align: left;
				}
				input{
					width: 500px;
					text-align: right;
				}
				.radio-wrap{
					display: inline-block;
					margin-left:320px;
					.radio-input{
						display: none;
					}
					.radio-core{
						display: inline-block;
						box-sizing: border-box;
						background: #ffffff;
						border-radius: 100%;
						border: 1px solid #ccc;/*no*/
						position: relative;
						width: 40px;
						height: 40px;
						vertical-align: middle;
						&::after{
							content: " ";
							border-radius: 100%;
							position: absolute;
							top:8px;
							left:8px;
							width: 20px;
							height: 20px;
							background: yellowgreen;
						}
					}
					.radio-label{
						display:inline-block; 
						margin-right: 30px;

					}
				}
		    }
		}
		.tip{
			display: inline-block;
			color: #eb695c;
			margin-left: 10px;
		}
	}
	.btn-wrap{
		text-align: center;
		margin-top: 100px;
		.btn-save{
			width: 645px;
			height: 88px;
		}
	}
	.readp{
		margin-top: 180px;
		text-align: center;
	}
}
</style>