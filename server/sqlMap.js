//SQL语句映射文件，以供api逻辑调用

var sqlMap = {
	queryAll: 'SELECT * FROM ??',
	queryDesc: 'SELECT * FROM ?? ORDER BY ?? DESC',
	queryAsc: 'SELECT * FROM ?? ORDER BY ?? ASC',
	queryById: 'SELECT * FROM ?? WHERE id = ?',
	deleteById: 'DELETE FROM ?? WHERE id = ?',
	// totalById: 'SELECT COUNT(*) FROM ?? '
	//登录
	login: 'SELECT * FROM user WHERE userPhone = ?',
	//注册
	register: 'INSERT INTO user(id, userPhone, userName, userPsd, userEmail, userSex, userBirth, userProblem, userAnswer, userNumber) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?)',


	//用户
	user: {
		queryOther: 'SELECT * FROM user WHERE id not in (SELECT id FROM user WHERE id = ?)',
		queryByPhone: 'SELECT * FROM user WHERE userPhone = ?',
		queryByName: 'SELECT * FROM user WHERE userName = ?',
		queryByEmail: 'SELECT * FROM user WHERE userEmail = ?',
		update: 'UPDATE user SET userAvatar=?, userName=?, userEmail=?, userSex=?, userBirth=?, userCity=?, userStatus=?, userConst=?, userNote=? WHERE id=?',
		updatePsd: 'UPDATE user SET userPsd = ? WHERE id = ?',
		attentions: 'SELECT * FROM relation WHERE fromUserId = ?',
		fans: 'SELECT * FROM relation WHERE toUserId = ?',
		toConcern: 'INSERT INTO relation (id, fromUserId, toUserId) VALUES (0, ?, ?)',
		toCancelConcern: 'DELETE FROM relation WHERE fromUserId = ? AND toUserId = ?',
		judgeRelation: 'SELECT * FROM relation WHERE (fromUserId = ? OR toUserId = ?) AND (fromUserId = ? OR toUserId = ?)',
		search: 'SELECT * FROM user WHERE userName LIKE ? OR userPhone LIKE ? AND id not in (SELECT id FROM user WHERE id = ?)',
		myFollower: 'SELECT user.userAvatar, user.userName, user.userSex, user.id FROM user, relation WHERE relation.fromUserId = ? And user.id = relation.toUserId',
		myFollowing: 'SELECT user.userAvatar, user.userName, user.userSex, user.id FROM user, relation WHERE relation.toUserId = ? And user.id = relation.fromUserId',
	},
	//宠物
	pet:{
		add: 'INSERT INTO pet(id, petName, petSex, petType, petBelongId, petBirth,petCreateDate, petStatus, petArrivedDate, petAvatar) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		userPetList: 'SELECT id,petAvatar,petBirth, petName, petSex,petType FROM pet WHERE  petBelongId = ?',
		update: 'UPDATE pet SET petName=?, petSex=? ,petType=?,petBirth=?, petStatus=?, petArrivedDate=?, petAvatar=? WHERE id = ?',
	},

	//寻找
	look:{
		add: 'INSERT INTO look(id, isFindPet, region, address, dateTime, petSex, petType, petAge, petAvatar, note, contact, userId, findStatus, createTime) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		homePage: 'SELECT id, isFindPet, note FROM look',
		list: 'SELECT look.*, user.userName, user.userAvatar FROM look, user WHERE look.userId = user.id ORDER BY look.createTime DESC',
		detail: 'SELECT look.*, user.userName, user.userAvatar FROM look, user WHERE look.userId = user.id And look.id = ?',
		userLookListAll: 'SELECT id, createTime, isFindPet, petType, address, dateTime,  findStatus FROM look WHERE userId = ? ORDER BY createTime DESC',
		userLookListByStatus: 'SELECT id, createTime, isFindPet, petType, address, dateTime,  findStatus FROM look WHERE userId = ? AND findStatus = ? ORDER BY createTime DESC',
		updateLookStatus: 'UPDATE look SET findStatus = 2 WHERE id = ?',
	},

	//活动
	activity:{
		add: 'INSERT INTO activity(id, actTitle, actType, publisherId, publisher, createTime, startTime, endTime, themePhoto, notes, city, address, actNum, cost, contact) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		queryListByType: 'SELECT id, actTitle, startTime, endTime, notes, peopleNum, themePhoto, address FROM activity WHERE actType = ? ORDER BY endTime DESC',
		queryApply: 'SELECT * FROM actsigns WHERE actId = ? AND userId = ?',
		apply: 'INSERT INTO actsigns(id, actId, userId, signName, signContact, actTitle) VALUES (0, ?, ?, ?, ?, ?)',
		userActJoinList: 'SELECT activity.*, actsigns.actId FROM activity, actsigns WHERE activity.id = actsigns.actId And actsigns.userId = ?',
		userActPublList: 'SELECT * FROM activity WHERE publisherId = ?',
		actPulRegisnList: 'SELECT user.*, actsigns.signName, actsigns.signContact FROM user, actsigns WHERE user.id = actsigns.userId And actsigns.actId = ?',

	},

	//宠物秀
	petshow: {
		add: 'INSERT INTO petshow(id, content, actId, userId, createTime, petAvatar) VALUES (0, ?, ?, ?, ?, ?)',
		list:  'SELECT petshow.*, user.userName, user.userAvatar FROM petshow, user WHERE petshow.userId = user.id ORDER BY petshow.createTime DESC',
		listTop: 'SELECT petshow.*, user.userName, user.userAvatar FROM petshow, user WHERE petshow.userId = user.id ORDER BY petshow.likeCount DESC, petshow.createTime DESC LIMIT 10',
		userPetShowList: 'SELECT * FROM petshow WHERE userId = ? ORDER BY createTime DESC',
		detail: 'SELECT petshow.*, user.userName, user.userAvatar FROM petshow, user WHERE petshow.userId = user.id And petshow.id = ?',
		followerShowList: 'SELECT petshow.*, user.userName, user.userAvatar FROM petshow, user, relation WHERE user.id = petshow.userId And petshow.userId = relation.toUserId And relation.fromUserId = ? ORDER BY createTime DESC',
		homePage: 'SELECT petAvatar, userId, id FROM petshow ORDER BY createTime DESC LIMIT 6',
	},

	// 医疗
	medical: {
		add: 'INSERT INTO disease(id, diseaseType, createTime, photo, note, petName, petSex, petType, petBirth, isInsert, isVaccine, petStatus, region, userId, symptoms) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		queryAll: 'SELECT disease.*, user.userAvatar FROM disease, user WHERE user.id = disease.userId ORDER BY disease.createTime DESC',
		queryByType: 'SELECT disease.*, user.userAvatar FROM disease, user WHERE user.id = disease.userId And disease.diseaseType LIKE ? ORDER BY disease.createTime DESC',
		detail: 'SELECT disease.*, user.userAvatar, user.userName FROM disease, user WHERE user.id = disease.userId And disease.id = ?',
		userDiseaseList: 'SELECT * FROM disease WHERE userId = ? ORDER BY createTime DESC',
	},

	// 点赞
	like: {
		add: 'INSERT INTO liked (likeId, likeTypeId, likeType, likeUserId, likeStatus) VALUES (0, ?, ?, ?, ?)',
		update: 'UPDATE liked SET likeStatus = ? WHERE likeType = ? AND likeTypeId = ? AND likeUserId = ?',
		userLikeList: 'SELECT likeStatus,likeTypeId FROM liked WHERE likeType= ? AND likeUserId = ?',
		top7: 'SELECT liked.*, user.userAvatar FROM liked, user WHERE liked.likeType= ? AND liked.likeTypeId= ? AND liked.likeStatus=1 AND liked.likeUserId = user.id',
		status: 'SELECT * FROM liked WHERE likeType= ? AND likeTypeId=? AND likeUserId = ?',
	},

	//评论
	comment: {
		add: 'INSERT INTO comment (id, commentType, commentTypeId, content, fromUserId, createTime, toUserId, toUserName) VALUES (0, ?, ?, ?, ?, ?, ?, ?)',
	  list: 'SELECT comment.*, user.userName AS fromUserName, user.userAvatar AS fromUserAvatar FROM comment, user WHERE comment.commentType = ? AND comment.commentTypeId = ? AND user.id = comment.fromUserId ORDER BY comment.createTime DESC',
	}
}

module.exports = sqlMap;
