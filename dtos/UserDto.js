module.exports = class UserDto {
	constructor(userModel) {
		this.id = userModel.id;
		this.userId = userModel.userId;
	}
};
