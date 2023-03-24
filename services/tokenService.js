const jwt = require("jsonwebtoken");
const refreshTokenQueries = require("../db/queries/refreshTokenQueries");

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: "10m",
		});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: "3d",
		});
		return {
			accessToken,
			refreshToken,
		};
	}

	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
			return userData;
		} catch {
			return null;
		}
	}

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
			return userData;
		} catch {
			return null;
		}
	}

	async findRefreshToken(refreshToken) {
		const tokenData = await refreshTokenQueries.findToken(refreshToken);
		return tokenData;
	}

	async saveRefreshToken(userPrimaryKeyId, refreshToken) {
		const tokenData = await refreshTokenQueries.findTokenByUserId(
			userPrimaryKeyId
		);
		if (tokenData) {
			return refreshTokenQueries.updateToken(userPrimaryKeyId, refreshToken);
		}
		const token = await refreshTokenQueries.createToken(
			userPrimaryKeyId,
			refreshToken
		);
		return token;
	}

	async removeRefreshToken(refreshToken) {
		const tokenData = await refreshTokenQueries.deleteToken(refreshToken);
		return tokenData;
	}
}

module.exports = new TokenService();
