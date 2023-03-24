const userService = require("../services/userService");

class UserController {
	async getUser(req, res) {
		try {
			const userData = await userService.getUser(req.user);
			res.json(userData);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new UserController();
