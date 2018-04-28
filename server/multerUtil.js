//引入multer
var multer = require('multer');
//设置文件上传路径和文件命名
var storage = multer.diskStorage({
	destination:function(req, file, cb){
		cb(null, '../static/dbimages');
	},
	filename: function(req, file, cb){
		console.log(file);
		var fileFormat = (file.originalname).split('.');
		cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length-1]);
	}
});

//添加配置文件到multer对象
var upload = multer({
	storage: storage
});

module.exports = upload;
