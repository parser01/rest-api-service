const fileService = require("../services/fileService");
const ApiError = require("../exceptions/ApiError");

class FileController {
	async uploadFile(req, res, next) {
		try {
			const file = req.files.file;
			const fileName = await fileService.uploadFile(file);
			res.json({ message: "File was uploaded", fileName });
		} catch (e) {
			next(e);
		}
	}

	async updateFile(req, res, next) {
		try {
			const fileName = req.params.id;
			if (!fileName) {
				return next(ApiError.BadRequest("File name is not specified"));
			}
			const newFile = req.files.file;
			if (!newFile) {
				return next(ApiError.BadRequest("File is not specified"));
			}
			const newFileName = await fileService.updateFile(fileName, newFile);
			res.json({ message: "File was updated", fileName: newFileName });
		} catch (e) {
			next(e);
		}
	}

	async deleteFile(req, res, next) {
		try {
			const fileName = req.params.id;
			if (!fileName) {
				return next(ApiError.BadRequest("File name is not specified"));
			}
			await fileService.deleteFile(fileName);
			res.json({ message: "File was deleted" });
		} catch (e) {
			next(e);
		}
	}

	async downloadFile(req, res, next) {
		try {
			const fileName = req.params.id;
			if (!fileName) {
				return next(ApiError.BadRequest("File name is not specified"));
			}
			const file = await fileService.downloadFile(fileName);
			res.download(file);
		} catch (e) {
			next(e);
		}
	}

	async getFiles(req, res, next) {
		try {
			const { page, limit } = req.query;
			const files = await fileService.getFiles(page, limit);
			res.json(files);
		} catch (e) {
			next(e);
		}
	}

	async getFile(req, res, next) {
		try {
			const fileName = req.params.id;
			if (!fileName) {
				return next(ApiError.BadRequest("File name is not specified"));
			}
			const file = await fileService.getFile(fileName);
			res.json(file);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new FileController();
