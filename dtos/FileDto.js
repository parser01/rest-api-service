module.exports = class FileDto {
	constructor(fileModel) {
		this.name = fileModel.newFileName;
		this.extension = fileModel.fileExtension;
		this.mimetype = fileModel.mimetype;
		this.size = fileModel.size;
	}
};
