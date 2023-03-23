const pool = require("../pool");

class RefreshTokenQueries {
	constructor(pool) {
		this.pool = pool;
	}

	async findToken(refreshToken) {
		const [tokenList] = await this.pool.query(
			"SELECT * FROM refreshTokens WHERE token = ?",
			[refreshToken]
		);
		return tokenList[0];
	}

	async findTokenByUserId(userPimaryKeyId) {
		const [tokenList] = await this.pool.query(
			"SELECT * FROM refreshTokens WHERE userPrimaryKeyId = ?",
			[userPimaryKeyId]
		);
		return tokenList[0];
	}

	async createToken(userPimaryKeyId, refreshToken) {
		const [result] = await this.pool.query(
			"INSERT INTO refreshTokens (userPrimaryKeyId, token) VALUES (?, ?)",
			[userPimaryKeyId, refreshToken]
		);
		const [tokenList] = await this.pool.query(
			"SELECT * FROM refreshTokens WHERE id = ?",
			result.insertId
		);
		console.log("createToken: ", tokenList);
		return tokenList[0];
	}

	async updateToken(userPimaryKeyId, refreshToken) {
		const [result] = await this.pool.query(
			"UPDATE refreshTokens SET token = ? WHERE userPrimaryKeyId = ?",
			[refreshToken, userPimaryKeyId]
		);
		console.log("updateToken result: ", result);
	}

	async deleteToken(refreshToken) {
		const [tokenList] = await this.pool.query(
			"SELECT * FROM refreshTokens WHERE token = ?",
			refreshToken
		);
		await this.pool.query("DELETE FROM refreshTokens WHERE token = ?", [
			refreshToken,
		]);
		console.log("deleteToken: ", tokenList);
		return tokenList[0];
	}
}

module.exports = new RefreshTokenQueries(pool);
