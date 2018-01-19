import axios from "axios";

export default{
	/**
     * 统一接口处理：get请求方法封装。axios.get(url, [options])
     * @param url { String } -必选 接口url
     * @param options { Object } -必选 含官方的所有options对象。传参为{params:{key:11}}
     * @param cb { Function } -必选 成功回调
     */
	getData(url, cb, options){
		axios.get(url, options).then(cb).catch(response => {
			if(response instanceof Error){
				//一些错误是在设置请求的时候触发
			    console.log('Error:',response.message);   
			}else {
				 //请求已经发出，但是服务器响应返回的状态吗不在2xx的范围内      
				console.log(response.data);     
				console.log(response.status);      
				console.log(response.header);
				console.log(response.config);
			}	
		});
	},
	/**
     * 统一接口处理：post请求方法封装。axios.post(url, [options])
     * @param url { String } -必选 接口url
     * @param data { Object } -必选 含官方的所有body对象，可为null。传参时不需要参数名，例如body为{key:11}
     * @param options { Object } -必选 含官方的所有options对象，可为null。传参为{params:{key:11}}
     * @param cb { Function } -必选 成功回调
     */
	postData(url, data, cb, options){
		axios.post(url, data, options).then(cb).catch(response => {
			if(response instanceof Error){
				//一些错误是在设置请求的时候触发
			    console.log('Error:',response.message);   
			}else {
				 //请求已经发出，但是服务器响应返回的状态吗不在2xx的范围内      
				console.log(response.data);     
				console.log(response.status);      
				console.log(response.header);
				console.log(response.config);
			}			
		})
	}
}
