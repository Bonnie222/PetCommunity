//SQL语句映射文件，以供api逻辑调用

var sqlMap = {
	queryAll: 'select * from ??',
	queryById: 'select * from ?? where id = ?',
	//用户
	user: {
		add: 'insert into user(id, name, age) values (0, ?, ?)',
	}
}

module.exports = sqlMap;