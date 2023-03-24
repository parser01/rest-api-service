const pool = require("../pool");

class UserQueries {
	constructor(pool) {
		this.pool = pool;
	}

	async findUserById(userId) {
		const [userList] = await this.pool.query(
			"SELECT * FROM users WHERE userId = ?",
			[userId]
		);
		return userList[0];
	}

	async createUser(userId, password) {
		const [result] = await this.pool.query(
			"INSERT INTO users (userId, password) VALUES (?, ?)",
			[userId, password]
		);
		const [userList] = await this.pool.query(
			"SELECT * FROM users WHERE id = ?",
			result.insertId
		);
		return userList[0];
	}
}

module.exports = new UserQueries(pool);
