import axios from "axios";

export default{
	/**
     * 统一接口处理：get请求方法封装。axios.get(url, [options])
     * @param url { String } -必选 接口url
     * @param options { Object } -必选 含官方的所有options对象。传参为{params:{key:11}}
     * @param cb { Function } -必选 成功回调
     */
	getData: function(url, cb, options){
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
	postData: function(url, data, cb, options){
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
	},	
	
	// 将 字符串格式的日期 转化为指定格式的String
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    formatDate: function(str, fmt) { //author: meizz
        fmt = fmt || 'yyyy-MM-dd';
        if (typeof str === 'string') {
            str = str.replace(/-/g, "/");
        }
        var date = new Date(str);
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    
    /**
     *  "2016-08-15T16:00:00.000Z" 格式转换 默认格式 yyyy-MM-dd
     */
    changeDate: function(time, fmt){
    	var d = new Date(time);
		var date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
		date = this.formatDate(date,fmt);
		return date;
    },
    
    /**
     * 计算年龄 参数格式为yyyy-MM-dd
     */
    calculateAge: function(strBirthday){
    	strBirthday = this.changeDate(strBirthday)
		var returnAge;  
	    var strBirthdayArr=strBirthday.split("-");  
	    var birthYear = strBirthdayArr[0];  
	    var birthMonth = strBirthdayArr[1];  
	    var birthDay = strBirthdayArr[2];  

	   	var  d = new Date();  
	    var nowYear = d.getFullYear();  
	    var nowMonth = d.getMonth() + 1;  
	    var nowDay = d.getDate();  
	      
	    if(nowYear == birthYear){  //同年
	    	var monthDiff = nowMonth - birthMonth; //月之差
	    	if(monthDiff == 0){
	    		var dayDiff = nowDay - birthDay;//日之差  
	    		returnAge = dayDiff >= 0 ? dayDiff + '天' : -3;	
	    	}else if(monthDiff > 0){
	    		returnAge = monthDiff + '个月';
	    	}else{
	    		returnAge = -2; //返回-1 表示出生日期输入错误 晚于今天  
	    	}
	        
	    }else{  
	        var ageDiff = nowYear - birthYear ; //年之差  
	        if(ageDiff == 1){  
	            if(nowMonth == birthMonth) {  
	                var dayDiff = nowDay - birthDay;//日之差  
	                returnAge = dayDiff < 0 ? '11个月' : ageDiff + '岁';  
	            }else{  
	                var monthDiff = nowMonth - birthMonth;//月之差  
	                returnAge = monthDiff < 0 ? 12 + monthDiff + '个月'  : ageDiff + '岁';
	            }  
	        }else if(ageDiff > 1){
	        	if(nowMonth == birthMonth) {  
	                var dayDiff = nowDay - birthDay;//日之差  
	                returnAge = dayDiff < 0 ? ageDiff + '岁' : ageDiff-1 + '岁';  
	            }else{  
	                var monthDiff = nowMonth - birthMonth;//月之差  
	                returnAge = monthDiff < 0 ? ageDiff + '岁' : ageDiff-1 + '岁';
	            }
	        }else{
	            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天  
	        }  
	    }    
	    return returnAge;//返回周岁年龄  
    },
    /**
     * 获取当前日期
     */
    getNowDate: function(){
    	var  d = new Date();  
	    var nowYear = d.getFullYear();  
	    var nowMonth = d.getMonth() + 1;  
	    var nowDay = d.getDate();  
	    
	    var date = nowYear + '-' + nowMonth + '-' + nowDay;
	    date = this.formatDate(date);
	    return date;	   	
    },
    /**
     * 获取当前时间
     */
    getNowTime: function(){
    	var  d = new Date();  
	    var nowYear = d.getFullYear();  
	    var nowMonth = d.getMonth() + 1;  
	    var nowDay = d.getDate();  
	    var nowHour = d.getHours();
	    var nowMinutes = d.getMinutes();
	    var nowSeconds = d.getSeconds();
	    
	    var date = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
	    date = this.formatDate(date, "yyyy-MM-dd hh:mm:ss");
	    return date;
    },
    /**
     * 提示框封装
     */
    alert: function(that, tips, tipTitle){
    	var titleText = tipTitle ? tipTitle : "提示";
		that.$messagebox({
			title: titleText, 
			message: tips
		});
    },
    
    confirmTurn: function(that, tips, routeUrl, hasToast, cbText, tipTitle){
    	var titleText = tipTitle ? tipTitle : "提示";
    	var actionText = cbText ? cbText : '操作成功' ;
    	var url = routeUrl;
		that.$messagebox({
			title: titleText, 
			message: tips,
			showCancelButton: true,		
		}).then(action =>{
			if(action == 'confirm'){
				if(hasToast){
					that.$dialog.toast({
	                    mes: actionText,
	                    timeout: 1000,
	                    icon: 'success'
	                });
					setTimeout(function(){
						that.$router.replace(url);
					},1500)
				}else{
					that.$router.replace(url);
				}
			}
		});
   },
    
    confirmCallback: function(that, tips, confirmCb, tipTitle){
    	var titleText = tipTitle ? tipTitle : "提示";
		that.$messagebox({
			title: titleText, 
			message: tips,
			showCancelButton: true,		
		}).then(action =>{
			if(action == 'confirm'){
				confirmCb();
			}
			if(action == 'cancel'){
				//callback();
			}
		});
	},
	
	toastCallback: function(that, mesText, url){
		that.$dialog.toast({
            mes: mesText,
            timeout: 1000,
            icon: 'success'
        });
		setTimeout(function(){
			that.$router.replace(url);
		},1500)
	}
    
}
