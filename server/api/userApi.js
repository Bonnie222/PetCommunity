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

var jsonWrite = function(res, ret, type) {
    if(typeof ret === 'undefined') {
        res.send({code: '-1', message: '操作失败'}).end();
    } else {
    	let obj = {
        data: {},
      };
      if(type == 'List') {
         obj.data.data = ret
      } else if (type == 'Obj') {
        obj.data = ret[0] || {};
      }
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
              data.token = new Date().getTime();
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
        	jsonWrite(res, result, 'List');
        }
    })
})
router.get('/home/petshow',(req, res) => {
	var sql = $sql.petshow.homePage;
	conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result, 'List');
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
        	jsonWrite(res, result, 'Obj');
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
// 查询出自己以外的所有用户
router.post('/user/list',(req,res)=>{
	var sql = $sql.user.queryOther;
	var p = req.body;
    console.log(p);
    var sqlParams = [p.id];
    conn.query(sql, sqlParams, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result, 'List');
        }
    })
})
// 查询我关注的用户ID
router.post('/user/attentions',(req,res)=>{
	var sql = $sql.user.attentions;
	var p = req.body;
    console.log(p);
    var sqlParams = [p.fromUserId];
    conn.query(sql, sqlParams, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result, 'List');
        }
    })
})
// 查询关注我的用户 (粉丝)ID
router.post('/user/fans',(req,res)=>{
	var sql = $sql.user.fans;
	var p = req.body;
    console.log(p);
    var sqlParams = [p.toUserId];
    conn.query(sql, sqlParams, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result, 'List');
        }
    })
})
// 关注操作
router.post('/user/toConcern',(req,res)=>{
	var sql = $sql.user.toConcern;
	var p = req.body;
    console.log(p);
    var sqlParams = [p.fromUserId, p.toUserId];
    conn.query(sql, sqlParams, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})
// 取消关注操作
router.post('/user/toCancelConcern',(req,res)=>{
	var sql = $sql.user.toCancelConcern;
	var p = req.body;
    console.log(p);
    var sqlParams = [p.fromUserId, p.toUserId];
    conn.query(sql, sqlParams, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})
// 判断用户之间的关系
router.post('/user/judgeRelation',(req,res)=>{
	var sql = $sql.user.judgeRelation;
	var p = req.body;
    console.log(p);
    var sqlParams = [p.fromUserId, p.fromUserId, p.toUserId, p.toUserId];
    conn.query(sql, sqlParams, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result, 'List');
        }
    })
})
// 用户搜索
router.post('/user/search',(req,res)=>{
	var sql = $sql.user.search;
	var p = req.body;
    console.log(p);
    var sqlParams = [`%${p.keyword}%`, `%${p.keyword}%`, p.id];
    conn.query(sql, sqlParams, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result, 'List');
        }
    })
})
// 重置密码
router.post('/user/updatepsd',(req,res)=>{
	var sql = $sql.user.updatePsd;
	var p = req.body;
    console.log(p);
    var sqlParams = [p.psd, p.id];
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
        	jsonWrite(res, result, 'List');
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
        	jsonWrite(res, result, 'Obj');
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
    var sqlParams = [p.isFindPet, p.region, p.address, p.dateTime, p.petSex, p.petType, p.petAge, p.petAvatar, p.note, p.contact, p.userId, p.findStatus, p.createTime];
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
	var sql = $sql.look.list;
    // var sqlParams = ['look','createTime'];
    conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result, 'List');
        }
    })
})
//获取详情
router.post('/look/detail',(req,res)=>{
	var sql = $sql.look.detail;
	var p = req.body;
    console.log(p);
    var sqlParams = [p.id];
    conn.query(sql, sqlParams, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result, 'Obj');
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
        	jsonWrite(res, result, 'List');
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
        	jsonWrite(res, result, 'List');
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
        	jsonWrite(res, result,'Obj');
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
//删除寻宠/主信息
router.post('/user/deletelook',(req,res)=>{
	var sql = $sql.deleteById;
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
        	jsonWrite(res, result, 'List');
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
        	jsonWrite(res, result, 'Obj');
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
// 判断是否已报名
router.post('/activity/isApply', (req, res) => {
  const sql = $sql.activity.queryApply;
  const p = req.body;
	console.log(p);
	const sqlParams = [p.actId, p.userId];
	conn.query(sql, sqlParams, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result, 'Obj');
        }
    })
})
// 申请报名
router.post('/activity/apply', (req, res) => {
  const sql = $sql.activity.apply;
  const p = req.body;
	console.log(p);
	const sqlParams = [p.actId, p.userId, p.signName, p.signContact, p.actTitle];
	conn.query(sql, sqlParams, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})

/**
 * 宠物秀
 */
//发布
router.post('/petshow/add',(req, res) => {
	var sql = $sql.petshow.add;
	var p = req.body;
	console.log(p);
	var sqlParams = [p.content, p.actId, p.userId, p.createTime, p.petAvatar];
	conn.query(sql, sqlParams, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})
//列表
router.get('/petshow/list',(req, res) => {
	var sql = $sql.petshow.list;
	var p = req.body;
	conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result, 'List');
        }
    })
})
router.get('/petshow/listTop',(req, res) => {
	var sql = $sql.petshow.listTop;
	var p = req.body;
	conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result, 'List');
        }
    })
})
//详情
router.post('/petshow/detail',(req, res) => {
  var sql = $sql.petshow.detail;
	var p = req.body;
	console.log(p);
	var sqlParams = [p.id];
	conn.query(sql, sqlParams, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result, 'Obj');
        }
    })
})
// 根据id查询用户宠物秀
router.post('/user/petshowlist',(req,res)=>{
	var sql = $sql.petshow.userPetShowList;
	var p = req.body;
    console.log(p);
    var sqlParams = [p.userId];
    conn.query(sql, sqlParams, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result, 'List');
        }
    })
})
// 删除宠物秀
router.post('/petshow/delete',(req,res)=>{
	var sql = $sql.deleteById;
	var p = req.body;
    console.log(p);
    var sqlParams = ['petshow', p.id];
    conn.query(sql, sqlParams, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result);
        }
    })
})
// 查询我关注的用户的宠物秀
router.post('/petshow/followers',(req,res)=>{
	var sql = $sql.petshow.followerShowList;
	var p = req.body;
    console.log(p);
    var sqlParams = [p.id];
    conn.query(sql, sqlParams, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result, 'List');
        }
    })
})
/**
* 我的活动
*/
// 获取个人参与的活动
router.post('/user/activityJoinlist', (req, res) => {
  const sql = $sql.activity.userActJoinList;
  const p = req.body;
	console.log(p);
	const sqlParams = [p.userId];
	conn.query(sql, sqlParams, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result, 'List');
        }
    })
})
// 获取个人发布的活动
router.post('/user/activityPubllist', (req, res) => {
  const sql = $sql.activity.userActPublList;
  const p = req.body;
	console.log(p);
	const sqlParams = [p.userId];
	conn.query(sql, sqlParams, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result, 'List');
        }
    })
})
// 获取我发布的活动的报名名单
router.post('/user/regisnslist', (req, res) => {
  const sql = $sql.activity.actPulRegisnList;
  const p = req.body;
	console.log(p);
	const sqlParams = [p.actId];
	conn.query(sql, sqlParams, function(err, result) {
        if (err) {
            console.log(err);
        }else{
        	jsonWrite(res, result, 'List');
        }
    })
})
/**
 * 宠友
 */
 // 我关注的用户
 router.post('/user/followers', (req, res) => {
   const sql = $sql.user.myFollower;
   const p = req.body;
 	console.log(p);
 	const sqlParams = [p.userId];
 	conn.query(sql, sqlParams, function(err, result) {
         if (err) {
             console.log(err);
         }else{
         	jsonWrite(res, result, 'List');
         }
     })
 })
 // 关注我的用户
 router.post('/user/followings', (req, res) => {
   const sql = $sql.user.myFollowing;
   const p = req.body;
   console.log(p);
   const sqlParams = [p.userId];
   conn.query(sql, sqlParams, function(err, result) {
         if (err) {
             console.log(err);
         }else{
           jsonWrite(res, result, 'List');
         }
     })
 })
 /**
  * 我的问诊
  */
  // 获取个人问诊
  router.post('/user/diseaseList',(req,res)=>{
    var sql = $sql.medical.userDiseaseList;
    var p = req.body;
      console.log(p);
      var sqlParams = [p.id];
      conn.query(sql, sqlParams, function(err, result) {
          if (err) {
              console.log(err);
          }else{
            jsonWrite(res, result, 'List');
          }
      })
  })
  // 删除问诊
  router.post('/disease/delete',(req,res)=>{
    var sql = $sql.medical.deleteById;
    var p = req.body;
      console.log(p);
      var sqlParams = ['disease', p.id];
      conn.query(sql, sqlParams, function(err, result) {
          if (err) {
              console.log(err);
          }else{
            jsonWrite(res, result, 'List');
          }
      })
  })
 /**
  * 医疗
  */
 //发布信息
 router.post('/disease/add',(req,res)=>{
 	var sql = $sql.medical.add;
 	var p = req.body;
     console.log(p);
     var sqlParams = [p.diseaseType, p.createTime, p.photo, p.note, p.petName, p.petSex, p.petType, p.petBirth, p.isInsert, p.isVaccine, p.petStatus, p.region, p.userId, p.symptoms];
     conn.query(sql, sqlParams, function(err, result) {
         if (err) {
             console.log(err);
         }else{
         	jsonWrite(res, result);
         }
     })
 })
 router.post('/disease/listAll',(req,res)=>{
   var sql = $sql.medical.queryAll;
   var p = req.body;
     console.log(p);
     var sqlParams = [];
     conn.query(sql, sqlParams, function(err, result) {
         if (err) {
             console.log(err);
         }else{
           jsonWrite(res, result, 'List');
         }
     })
 })
 router.post('/disease/listByType',(req,res)=>{
   var sql = $sql.medical.queryByType;
   var p = req.body;
     console.log(p);
     var sqlParams = [`%${p.diseaseType}%`];
     conn.query(sql, sqlParams, function(err, result) {
         if (err) {
             console.log(err);
         }else{
           jsonWrite(res, result, 'List');
         }
     })
 })
 router.post('/disease/detail',(req,res)=>{
   var sql = $sql.medical.detail;
   var p = req.body;
     console.log(p);
     var sqlParams = [p.id];
     conn.query(sql, sqlParams, function(err, result) {
         if (err) {
             console.log(err);
         }else{
           jsonWrite(res, result, 'Obj');
         }
     })
 })
 /**
  * 点赞
  */
 // 根据点赞类型查询用户点赞列表
 router.post('/user/likeList',(req,res)=>{
   var sql = $sql.like.userLikeList;
   var p = req.body;
     console.log(p);
     var sqlParams = [p.type, p.userId];
     conn.query(sql, sqlParams, function(err, result) {
         if (err) {
             console.log(err);
         }else{
           jsonWrite(res, result, 'List');
         }
     })
 })
 // 根据点赞类型查询某文章点赞用户列表top7
 router.post('/like/topLike',(req,res)=>{
   var sql = $sql.like.top7;
   var p = req.body;
     console.log(p);
     var sqlParams = [p.likeType, p.likeTypeId];
     conn.query(sql, sqlParams, function(err, result) {
         if (err) {
             console.log(err);
         }else{
           jsonWrite(res, result, 'List');
         }
     })
 })
 // 获取用户对某文章的点赞状态
 router.post('/user/likeStatus',(req,res)=>{
   var sql = $sql.like.status;
   var p = req.body;
     console.log(p);
     var sqlParams = [p.likeType, p.likeTypeId, p.likeUserId];
     conn.query(sql, sqlParams, function(err, result) {
         if (err) {
             console.log(err);
         }else{
           jsonWrite(res, result, 'Obj');
         }
     })
 })
 // 添加点赞数据
 router.post('/user/likeAdd',(req,res)=>{
   var sql = $sql.like.add;
   var p = req.body;
     console.log(p);
     var sqlParams = [p.likeTypeId, p.likeType, p.likeUserId, p.likeStatus];
     conn.query(sql, sqlParams, function(err, result) {
         if (err) {
             console.log(err);
         }else{
           jsonWrite(res, result);
         }
     })
 })
 // 修改状态
 router.post('/user/likeUpdate',(req,res)=>{
   var sql = $sql.like.update;
   var p = req.body;
     console.log(p);
     var sqlParams = [p.likeStatus, p.likeType, p.likeTypeId, p.likeUserId];
     conn.query(sql, sqlParams, function(err, result) {
         if (err) {
             console.log(err);
         }else{
           jsonWrite(res, result);
         }
     })
 })
 /**
  * 评论
  */
 // 添加评论
 router.post('/comment/add',(req,res)=>{
   var sql = $sql.comment.add;
   var p = req.body;
     console.log(p);
     var sqlParams = [p.commentType, p.commentTypeId, p.content, p.fromUserId, p.createTime, p.toUserId, p.toUserName];
     conn.query(sql, sqlParams, function(err, result) {
         if (err) {
             console.log(err);
         }else{
           jsonWrite(res, result);
         }
     })
 })
 // 评论列表
 router.post('/comment/list',(req,res)=>{
   var sql = $sql.comment.list;
   var p = req.body;
     console.log(p);
     var sqlParams = [p.commentType, p.commentTypeId];
     conn.query(sql, sqlParams, function(err, result) {
         if (err) {
             console.log(err);
         }else{
           jsonWrite(res, result, 'List');
         }
     })
 })
 // 删除评论
 router.post('/comment/delete',(req,res)=>{
   var sql = $sql.deleteById;
   var p = req.body;
     console.log(p);
     var sqlParams = ['comment', p.id];
     conn.query(sql, sqlParams, function(err, result) {
         if (err) {
             console.log(err);
         }else{
           jsonWrite(res, result);
         }
     })
 })
 /**
  * 文章
  */
 // 文章列表
 router.get('/article/list',(req,res)=>{
   var sql = $sql.article.list;
   conn.query(sql, function(err, result) {
       if (err) {
           console.log(err);
       }else{
         jsonWrite(res, result, 'List');
       }
   })
 })
 // 文章详情
 router.post('/article/detail',(req,res)=>{
   var sql = $sql.queryById;
   var p = req.body;
   console.log(p);
   var sqlParams = ['article', p.id];
   conn.query(sql, sqlParams, function(err, result) {
       if (err) {
           console.log(err);
       }else{
         jsonWrite(res, result, 'Obj');
       }
   })
 })
 /**
  * 收藏
  */
  // 是否存在收藏某文章
 router.post('/collect/status',(req,res)=>{
   var sql = $sql.collect.status;
   var p = req.body;
   console.log(p);
   var sqlParams = [p.collectArticleId, p.collectUserId];
   conn.query(sql, sqlParams, function(err, result) {
       if (err) {
           console.log(err);
       }else{
         jsonWrite(res, result, 'Obj');
       }
   })
 })
 // 添加收藏
router.post('/collect/add',(req,res)=>{
  var sql = $sql.collect.add;
  var p = req.body;
  console.log(p);
  var sqlParams = [p.collectArticleId, p.collectUserId, p.createTime];
  conn.query(sql, sqlParams, function(err, result) {
      if (err) {
          console.log(err);
      }else{
        jsonWrite(res, result, 'Obj');
      }
  })
})
// 删除收藏 单个
router.post('/collect/delete',(req,res)=>{
 var sql = $sql.collect.delete;
 var p = req.body;
 console.log(p);
 var sqlParams = [p.collectId];
 conn.query(sql, sqlParams, function(err, result) {
     if (err) {
         console.log(err);
     }else{
       jsonWrite(res, result);
     }
 })
})
// 删除收藏 多个
router.post('/collect/deleteList',(req,res)=>{
 var sql = $sql.collect.deleteList;
 var p = req.body;
 console.log(p);
 var reg = /^[\'\"]+|[\'\"]+$/g;
 var sqlParams = [p.collectIds];
 console.log(sqlParams, ids);
 conn.query(sql, sqlParams, function(err, result) {
     if (err) {
         console.log(err);
     }else{
       jsonWrite(res, result);
     }
 })
})
// 我的收藏列表
router.post('/user/collectList',(req,res)=>{
 var sql = $sql.collect.list;
 var p = req.body;
 console.log(p);
 var sqlParams = [p.collectUserId];
 conn.query(sql, sqlParams, function(err, result) {
     if (err) {
         console.log(err);
     }else{
       jsonWrite(res, result, 'List');
     }
 })
})
module.exports = router;
