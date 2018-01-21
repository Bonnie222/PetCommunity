//SQL语句映射文件，以供api逻辑调用

var sqlMap = {
	queryAll: 'SELECT * FROM ??',
	queryById: 'SELECT * FROM ?? WHERE id = ?',	
	deleteById: 'DELETE FROM ?? WHERE id = ?',
	//登录
	login: 'SELECT * FROM user WHERE userPhone = ?',
	
	//用户
	user: {
		add: 'INSERT INTO user(phone, name, password, email, sex, birth) VALUES(?, ?, ?, ?, ?, ?)',
	},
	//宠物
	pet:{
		add: 'INSERT INTO pet(id, petName, petSex, petType, petBelongId, petBirth,petCreateDate, petStatus, petArrivedDate, petAvatar) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		userPetList: 'SELECT id,petAvatar,petBirth, petName, petSex,petType FROM pet WHERE  petBelongId = ?',
		update: 'UPDATE pet SET petName=?, petSex=? ,petType=?,petBirth=?, petStatus=?, petArrivedDate=?, petAvatar=? WHERE id = ?', 
	}
}

module.exports = sqlMap;