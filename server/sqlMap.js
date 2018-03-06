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
		update: 'UPDATE user SET userAvatar=?, userName=?, userEmail=?, userSex=?, userBirth=?, userCity=?, userStatus=?, userConst=?, userNote=? WHERE id=?',
	},
	//宠物
	pet:{
		add: 'INSERT INTO pet(id, petName, petSex, petType, petBelongId, petBirth,petCreateDate, petStatus, petArrivedDate, petAvatar) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		userPetList: 'SELECT id,petAvatar,petBirth, petName, petSex,petType FROM pet WHERE  petBelongId = ?',
		update: 'UPDATE pet SET petName=?, petSex=? ,petType=?,petBirth=?, petStatus=?, petArrivedDate=?, petAvatar=? WHERE id = ?', 
	},
	
	//寻找
	look:{
		add: 'INSERT INTO look(id, isFindPet, region, address, dateTime, petSex, petType, petAge,petAvatar, note, contact, userId, userInfo, findStatus, createTime) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		homePage: 'SELECT id, isFindPet, note FROM look',
		userLookListAll: 'SELECT id, createTime, isFindPet, petType, address, dateTime,  findStatus FROM look WHERE userId = ? ORDER BY createTime DESC',
		userLookListByStatus: 'SELECT id, createTime, isFindPet, petType, address, dateTime,  findStatus FROM look WHERE userId = ? AND findStatus = ? ORDER BY createTime DESC',
		updateLookStatus: 'UPDATE look SET findStatus = 2 WHERE id = ?',
	},
	
	//活动
	activity:{
		add: 'INSERT INTO activity(id, actTitle, actType, publisherId, publisher, createTime, startTime, endTime, themePhoto, notes, city, address, actNum, cost, contact) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		queryListByType: 'SELECT id, actTitle, startTime, endTime, notes, peopleNum, themePhoto, address FROM activity WHERE actType = ? ORDER BY endTime DESC',
	},
	
	//宠物秀
	petshow: {
		add: 'INSERT INTO petshow(id, content, actId, userId, userInfo, createTime, petAvatar) VALUES (0, ?, ?, ?, ?, ?, ?)',
	}
}

module.exports = sqlMap;