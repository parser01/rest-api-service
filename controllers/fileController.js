const fileService = require("../services/fileService");

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

	async updateFile(req, res) {
		try {
			const newFile = req.files.file;
			const fileName = await fileService.updateFile(req.params.id, newFile);
			res.json({ message: "File was updated", fileName });
		} catch (e) {
			next(e);
		}
	}

	async deleteFile(req, res) {
		try {
			const fileName = req.params.id;
			if (!fileName) {
				return res.status(400).json({ message: "File name is required" });
			}
			await fileService.deleteFile(fileName);
			res.json({ message: "File was deleted" });
		} catch (e) {
			next(e);
		}
	}

	async downloadFile(req, res) {}

	async getFiles(req, res) {}

	async getFile(req, res) {}
}

module.exports = new FileController();
