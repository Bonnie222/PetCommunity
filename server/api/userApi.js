//引入express
var express = require('express');
var router = express.Router();
//引入multer
var upload = require('../multerUtil');
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
 * 单个图片上传
 */
router.post('/uploadSingle', upload.single('avatar'), function(req, res, next){
 	var file = req.file;
 	let obj = {};
 	let data = {};
 	let path = file.path;
 	data.fileUrl = path.replace(/\\/g,'/').slice(3);
   	data.fileName = file.originalname;
 	obj.code = 1;
 	obj.message = "请求成功";
 	obj.data = data;
 	res.send(obj);
})
/**
 * 多个图片上传
 */
router.post('/uploadArray', upload.array('picture',3), function(req, res, next){
 	var file = req.files;
   	var obj = {};
   	var data = [];
   	for(var i = 0;i < file.length; i++) {
   		var preObj = {};
	   	preObj.fileUrl = file[i].path.replace(/\\/g,'/').slice(3);
	   	preObj.fileName = file[i].originalname;
	   	data[i] = preObj;
   	}
   	obj.code = 1;
   	obj.message = "请求成功";
   	obj.data = data;
   	res.send(obj);
})
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
 * 注册
 */
router.post('/queryPhone', (req, res) => {
	var sql = $sql.user.queryByPhone;
	var params = req.body;
	console.log(params);
	var sqlParams = [params.userPhone]
	conn.query(sql, sqlParams, function(err, result){
		if (err) {       
            console.log(err);
            res.send({'message': '服务器出错', 'code': 0}).end();
        }else{
        	if(result.length == 0){
        		res.send({'message': '该用户未注册', 'code': 1}).end();
        	}else{
        		res.send({'message': '该用户已注册', 'code': -1}).end();
        	}
        }
	})
})
router.post('/queryName', (req, res) => {
	var sql = $sql.user.queryByName;
	var params = req.body;
	console.log(params);
	var sqlParams = [params.userName]
	conn.query(sql, sqlParams, function(err, result){
		if (err) {       
            console.log(err);
            res.send({'message': '服务器出错', 'code': 0}).end();
        }else{
        	if(result.length == 0){
        		res.send({'message': '该昵称未注册', 'code': 1}).end();
        	}else{
        		res.send({'message': '该昵称已存在', 'code': -1}).end();
        	}
        }
	})
})
router.post('/queryEmail', (req, res) => {
	var sql = $sql.user.queryByName;
	var params = req.body;
	console.log(params);
	var sqlParams = [params.userEmail]
	conn.query(sql, sqlParams, function(err, result){
		if (err) {       
            console.log(err);
            res.send({'message': '服务器出错', 'code': 0}).end();
        }else{
        	if(result.length == 0){
        		res.send({'message': '该邮箱未注册', 'code': 1}).end();
        	}else{
        		res.send({'message': '该邮箱已注册', 'code': -1}).end();
        	}
        }
	})
})
router.post('/register', (req, res) => {
	var sql = $sql.register;
	var p = req.body;
	console.log(p);
	var sqlParams = [p.userPhone, p.userName, p.userPsd, p.userEmail, p.userSex, p.userBirth, p.userProblem, p.userAnswer, p.userNumber];
	conn.query(sql, sqlParams, function(err, result){
		if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
	})
})
/**
 * 首页
 */
router.get('/home/look',(req, res) => {
	var sql = $sql.look.homePage;
	conn.query(sql, function(err, result) {    
        if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})
/**
 * 用户
 */
//查询用户个人信息
router.post('/user/personal',(req,res) => {
	var sql = $sql.queryById;
	var p = req.body;    
    console.log(p);
    var sqlParams = ['user',p.id];
    conn.query(sql, sqlParams, function(err, result) {    
        if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})
//更新用户个人信息
router.post('/user/update',(req,res)=>{
	var sql = $sql.user.update;
	var p = req.body;    
    console.log(p);
    var sqlParams = [p.userAvatar, p.userName, p.userEmail, p.userSex, p.userBirth, p.userCity, p.userStatus, p.userConst, p.userNote, p.id];
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
//获取个人宠物列表
router.post('/user/petList',(req, res) => {
	var sql = $sql.pet.userPetList;
	var p = req.body;
	console.log(p);
	var sqlParams = [p.petBelongId];
    conn.query(sql, sqlParams, function(err, result) {    
        if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})
//增加宠物
router.post('/pet/add',(req,res)=>{
	var sql = $sql.pet.add;
	var p = req.body;
	console.log(p);
	var sqlParams = [p.petName, p.petSex, p.petType, p.petBelongId, p.petBirth, p.petCreateDate, p.petStatus, p.petArrivedDate, p.petAvatar];
	conn.query(sql, sqlParams, function(err, result){
		if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
	})
})
//获取宠物详情
router.post('/pet/detail',(req,res)=>{
	var sql = $sql.queryById;
	var p = req.body;    
    console.log(p);
    var sqlParams = ['pet',p.id];
    conn.query(sql, sqlParams, function(err, result) {    
        if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})
//删除宠物
router.post('/pet/delete',(req,res)=>{
	var sql = $sql.deleteById;
	var p = req.body;    
    console.log(p);
    var sqlParams = ['pet',p.id];
    conn.query(sql, sqlParams, function(err, result) {    
        if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})
//更新宠物
router.post('/pet/update',(req,res)=>{
	var sql = $sql.pet.update;
	var p = req.body;    
    console.log(p);
    var sqlParams = [p.petName, p.petSex, p.petType, p.petBirth, p.petStatus, p.petArrivedDate, p.petAvatar, p.id];
    conn.query(sql, sqlParams, function(err, result) {    
        if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})

/**
 * 寻找宠物
 */
//发布信息
router.post('/look/add',(req,res)=>{
	var sql = $sql.look.add;
	var p = req.body;    
    console.log(p);
    var sqlParams = [p.isFindPet, p.region, p.address, p.dateTime, p.petSex, p.petType, p.petAge, p.petAvatar, p.note, p.contact, p.userId, p.userInfo, p.findStatus, p.createTime];
    conn.query(sql, sqlParams, function(err, result) {    
        if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})
//获取列表
router.get('/look/list',(req,res)=>{
	var sql = $sql.queryDesc;
    var sqlParams = ['look','createTime'];
    conn.query(sql, sqlParams, function(err, result) {    
        if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})
//获取详情
router.post('/look/detail',(req,res)=>{
	var sql = $sql.queryById;
	var p = req.body;    
    console.log(p);
    var sqlParams = ['look', p.id];
    conn.query(sql, sqlParams, function(err, result) {    
        if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})
//获取个人寻宠/主列表
router.post('/user/looklistAll',(req, res) => {
	var sql = $sql.look.userLookListAll;
	var p = req.body;
	console.log(p);
	var sqlParams = [p.userId];
	conn.query(sql, sqlParams, function(err, result) {    
        if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})
//获取个人寻宠/主列表  按状态
router.post('/user/looklistByStatus',(req, res) => {
	var sql = $sql.look.userLookListByStatus;
	var p = req.body;
	console.log(p);
	var sqlParams = [p.userId, p.findStatus];
	conn.query(sql, sqlParams, function(err, result) {    
        if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})
//获取个人寻宠/主 详情
router.post('/user/lookdetail',(req, res) => {
	var sql = $sql.queryById;
	var p = req.body;
	console.log(p);
	var sqlParams = ['look',p.id];
	conn.query(sql, sqlParams, function(err, result) {    
        if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})
//更改 个人寻宠/寻主 状态
router.post('/user/updatelookStatus',(req, res) => {
	var sql = $sql.look.updateLookStatus;
	var p = req.body;
	console.log(p);
	var sqlParams = [p.id];
	conn.query(sql, sqlParams, function(err, result) {    
        if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})

/**
 * 活动接口
 */
//获取线上活动列表
router.post('/activity/list',(req, res) => {
	var sql = $sql.activity.queryListByType;
	var p = req.body;
	console.log(p);
	var sqlParams = [p.actType];
	conn.query(sql, sqlParams, function(err, result) {    
        if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})
//获取活动详情
router.post('/activity/detail',(req, res) => {
	var sql = $sql.queryById;
	var p = req.body;
	console.log(p);
	var sqlParams = ['activity', p.id];
	conn.query(sql, sqlParams, function(err, result) {    
        if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})
//发布活动
router.post('/activity/add',(req, res) => {
	var sql = $sql.activity.add;
	var p = req.body;
	console.log(p);
	var sqlParams = [p.actTitle, p.actType, p.publisherId, p.publisher, p.createTime, p.startTime, p.endTime, p.themePhoto, p.notes, p.city, p.address, p.actNum, p.cost, p.contact];
	conn.query(sql, sqlParams, function(err, result) {    
        if (err) {       
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})

module.exports = router;

