const dbQueries = require("../db/queries/userQueries");
const ApiError = require("../exceptions/ApiError");
const bcrypt = require("bcryptjs");
const UserDto = require("../dtos/UserDto");
const tokenService = require("./tokenService");

class UserService {
	async signUp(userId, password) {
		const candidate = await dbQueries.findUserById(userId);
		if (candidate) {
			throw ApiError.BadRequest(`Пользователь ${userId} уже существует`);
		}
		const hashPassword = await bcrypt.hash(password, 7);
		const user = await dbQueries.createUser(userId, hashPassword);
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);
		return { ...tokens, user: userDto };
	}

	async signIn(userId, password) {
		const user = await dbQueries.findUserById(userId);
		if (!user) {
			throw ApiError.BadRequest(`Пользователь ${userId} не найден`);
		}
		const isPassEquals = await bcrypt.compare(password, user.password);
		if (!isPassEquals) {
			throw ApiError.BadRequest(`Неверный пароль`);
		}
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);
		return { ...tokens, user: userDto };
	}

	async logOut(refreshToken) {
		const tokenData = await tokenService.removeRefreshToken(refreshToken);
		return tokenData;
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}
		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await tokenService.findRefreshToken(refreshToken);
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError();
		}
		const user = await dbQueries.findUserById(userData.userId);
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);
		return { ...tokens, user: userDto };
	}

	async getUser(user) {
		const userDto = new UserDto(user);
		return userDto;
	}
}

module.exports = new UserService();
