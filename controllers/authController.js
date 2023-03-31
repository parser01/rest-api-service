const ApiError = require("../exceptions/ApiError");
const { validationResult } = require("express-validator");
const userService = require("../services/userService");

class AuthController {
	async signUp(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(
					ApiError.BadRequest("Ошибка при валидации", errors.array())
				);
			}
			const { userId, password } = req.body;
			const userData = await userService.signUp(userId, password);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async signIn(req, res, next) {
		try {
			const { userId, password } = req.body;
			const userData = await userService.signIn(userId, password);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async logOut(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const tokenData = await userService.logOut(refreshToken);
			res.clearCookie("refreshToken");
			res.json(tokenData);
		} catch (e) {
			next(e);
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			res.json(userData);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new AuthController();
