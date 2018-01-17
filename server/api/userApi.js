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
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

/**
 * 登录
 */
router.post('/login', (req, res) => {
	var params = req.body;
	var phone = params.phone;
	var pw = params.password;
//	conn.query('SELECT * FROM user WHERE phone = "'+phone+'" AND password = "'+pw + '";', function(err, results))
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

//查询用户
//router.post('/queryUser',(req,res) => {
//	var sql = $sql.queryAll;
//	var params = req.body;    
//  console.log(params);
//  conn.query(sql, [params.tablename,params.id], function(err, result) {    
//      if (err) {       
//          console.log(err);
//      }        
//      if (result) {
//          jsonWrite(res, result);
//      }
//  })
//})
module.exports = router;

