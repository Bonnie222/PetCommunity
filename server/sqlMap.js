//SQL语句映射文件，以供api逻辑调用

var sqlMap = {
	queryAll: 'SELECT * FROM ??',
	queryById: 'SELECT * FROM ?? WHERE id = ?',
	//用户
	user: {
		add: 'INSERT INTO user(phone, name, password, email, sex, birth) VALUES(?, ?, ?, ?, ?, ?)',
	}
}

module.exports = sqlMap;