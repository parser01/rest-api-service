const ApiError = require("../exceptions/ApiError");
const tokenService = require("../services/tokenService");

module.exports = function (req, res, next) {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			return next(ApiError.UnauthorizedError());
		}
		const accessToken = authorizationHeader.split(" ")[1];
		if (!accessToken) {
			console.log("no accessToken");
			return next(ApiError.UnauthorizedError());
		}

		const userData = tokenService.validateAccessToken(accessToken);
		if (!userData) {
			console.log("no userData");
			return next(ApiError.UnauthorizedError());
		}

		req.user = userData;
		next();
	} catch (e) {
		console.log("catch authMiddleware");
		return next(ApiError.UnauthorizedError());
	}
};
