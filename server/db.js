module.exports = {
	host: 'localhost',
	port:3306,
	user: 'root',
	password: '123456',
	database: 'petcommunitydb'
};

const pool = mysql.createPool(db);
