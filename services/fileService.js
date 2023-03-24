const { v4: uuidv4 } = require("uuid");
const path = require("path");
const FileDto = require("../dtos/fileDto");
const fileQueries = require("../db/queries/fileQueries");
const { unlink } = require("node:fs/promises");

class FileService {
	async uploadFile(file) {
		console.log("fileService.uploadFile(file) called", file);
		const fileExtension = path.extname(file.name);
		const newFileName = uuidv4() + "" + fileExtension;
		const fileDto = new FileDto({ newFileName, fileExtension, ...file });
		await fileQueries.uploadFileData(fileDto);
		const filePath = path.join(__dirname, "..", "public", newFileName);
		await file.mv(filePath);
		return newFileName;
	}

	async updateFile(fileName, newFile) {
		const fileExtension = path.extname(newFile.name);
		const newFileName = uuidv4() + "" + fileExtension;
		const fileDto = new FileDto({ newFileName, fileExtension, ...newFile });
		await fileQueries.updateFileData(fileName, fileDto);
		const filePath = path.join(__dirname, "..", "public", fileName);
		const newFilePath = path.join(__dirname, "..", "public", newFileName);
		await unlink(filePath);
		await newFile.mv(newFilePath);
	}

	async deleteFile(fileName) {
		await fileQueries.deleteFileData(fileName);
		const filePath = path.join(__dirname, "..", "public", fileName);
		await unlink(filePath);
	}

	async downloadFile(fileName) {
		const filePath = path.join(__dirname, "..", "public", fileName);
		return filePath;
	}

	async getFiles(page = 1, limit = 10) {
		const filesData = await fileQueries.getFilesData(page, limit);
		return filesData;
	}

	async getFile(fileName) {
		const fileData = await fileQueries.getFileData(fileName);
		return fileData;
	}
}

module.exports = new FileService();
