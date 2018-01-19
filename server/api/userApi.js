var express = require('express');
var router = express.Router();
//导入MySQL模块
var mysql = require('mysql');
var db = require('../db');
var $sql = require('../sqlMap');

//使用db.js的配置信息创建一个MySql连接池
//var pool = mysql.createPool(db.mysql)
var conn = mysql.createConnection(db.mysql);
conn.connect();

var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send({code: '1', message: '操作失败'}).end();
    } else {
    	let obj = {};
    	let data = ret;
    	obj.data = data;
		obj.message = '请求成功';
		obj.code = 1;
		res.send(obj).end();
    }
};

/**
 * 登录
 */
router.post('/login', (req, res) => {
	var sql = $sql.login;
	var params = req.body;
	console.log(params);
	var sqlParams = [params.userPhone]
	conn.query(sql, sqlParams, function(err, result){
		if (err) {       
            console.log(err);
            res.send({'message': '服务器出错', 'code': 0}).end();
        }else{
        	if(result.length == 0){
        		res.send({'message': '该用户不存在', 'code': -1}).end();
        	}else{
        		let obj = {};
        		let data = result[0];
        		if(data.userPsd === params.userPsd){
        			//console.log(req.session)
        			//req.session.userId = data.id;
        			obj.data = data;
        			obj.message = '登录成功';
        			obj.code = 1;
        			res.send(obj).end();
        		}else{
        			res.send({'message': '密码不正确', 'code': -2}).end();
        		}
        	}
        }
	})
})

/**
 * 用户
 */
//查询用户个人信息
router.post('/user/personal',(req,res) => {
	var sql = $sql.queryById;
	var params = req.body;    
    console.log(params);
    var sqlParams = ['user',params.id];
    conn.query(sql, sqlParams, function(err, result) {    
        if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})

/**
 * 宠物
 */
router.post('/user/petList',(req, res) => {
	var sql = $sql.pet.userPetList;
	var params = req.body;
	console.log(params);
	var sqlParams = [params.petBelongId];
    conn.query(sql, sqlParams, function(err, result) {    
        if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})
// 增加用户接口
//router.post('/addUser', (req, res) => {
//  var sql = $sql.user.add;    
//  var params = req.body;    
//  console.log('params',params);
//  conn.query(sql, [params.phone, params.name, params.password], function(err, result) {    
//      if (err) {       
//          console.log(err);
//      }        
//      if (result) {
//          jsonWrite(res, result);
//      }
//  })
//});

// 添加用户
router.get('/addUser', function(req, res, next){
 	// 从连接池获取连接 
	pool.getConnection(function(err, connection) { 
		var sql = $sql.user.add;
	// 获取前台页面传过来的参数  
	 var param = req.query || req.params;   
	// 建立连接 增加一个用户信息 
	connection.query(sql, [params.phone, params.name, params.password], function(err, result) {
        if(result) {      
             result = {   
                      code: 200,   
                     	msg:'增加成功'
             };  
        }     
          
     // 以json形式，把操作结果返回给前台页面     
       responseJSON(res, result);   

     // 释放连接  
      connection.release();  

       });
    });
 });


module.exports = router;

