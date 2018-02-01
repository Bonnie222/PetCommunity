//SQL语句映射文件，以供api逻辑调用

var sqlMap = {
	queryAll: 'SELECT * FROM ??',
	queryDesc: 'SELECT * FROM ?? ORDER BY ?? DESC',
	queryAsc: 'SELECT * FROM ?? ORDER BY ?? ASC',
	queryById: 'SELECT * FROM ?? WHERE id = ?',	
	deleteById: 'DELETE FROM ?? WHERE id = ?',
	//登录
	login: 'SELECT * FROM user WHERE userPhone = ?',
	//注册
	register: 'INSERT INTO user(id, userPhone, userName, userPsd, userEmail, userSex, userBirth, userProblem, userAnswer, userNumber) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
	
	
	//用户
	user: {
		queryByPhone: 'SELECT * FROM user WHERE userPhone = ?',
		queryByName: 'SELECT * FROM user WHERE userName = ?',
		queryByEmail: 'SELECT * FROM user WHERE userEmail = ?',
	},
	//宠物
	pet:{
		add: 'INSERT INTO pet(id, petName, petSex, petType, petBelongId, petBirth,petCreateDate, petStatus, petArrivedDate, petAvatar) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		userPetList: 'SELECT id,petAvatar,petBirth, petName, petSex,petType FROM pet WHERE  petBelongId = ?',
		update: 'UPDATE pet SET petName=?, petSex=? ,petType=?,petBirth=?, petStatus=?, petArrivedDate=?, petAvatar=? WHERE id = ?', 
	},
	
	//寻找
	look:{
		add: 'INSERT INTO look(id, isFindPet, region, address, dateTime, petSex, petType, petAge, petAvatar, note, contact, userId, userInfo, findStatus, createTime) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		homePage: 'SELECT id, isFindPet, note FROM look',	
	}
}

module.exports = sqlMap;