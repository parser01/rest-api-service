const ApiError = require("../exceptions/ApiError");

module.exports = function (err, req, res, next) {
	console.error(err);

	if (err instanceof ApiError) {
		res.status(err.status).json({ message: err.message, errors: err.errors });
		return;
	}
	res.status(500).json({ message: "Непредвиденная ошибка" });
};
