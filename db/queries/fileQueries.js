const pool = require("../pool");

class FileQueries {
	constructor(pool) {
		this.pool = pool;
	}

	async uploadFileData(fileData) {
		const { name, extension, mimetype, size } = fileData;
		const sql =
			"INSERT INTO files (name, extension, mimetype, size) VALUES (?, ?, ?, ?)";
		const values = [name, extension, mimetype, size];
		await this.pool.query(sql, values);
	}

	async updateFileData(fileName, fileData) {
		const { name, extension, mimetype, size } = fileData;
		const sql =
			"UPDATE files SET name = ?, extension = ?, mimetype = ?, size = ? WHERE name = ?";
		const values = [name, extension, mimetype, size, fileName];
		await this.pool.query(sql, values);
	}

	async deleteFileData(fileName) {
		await this.pool.query("DELETE FROM files WHERE name = ?", [fileName]);
	}

	async getFilesData(page, limit) {
		const offset = (page - 1) * limit;
		const [filesData] = await this.pool.query(
			"SELECT * FROM files LIMIT ? OFFSET ?",
			[limit, offset]
		);
		return filesData;
	}

	async getFileData(fileName) {
		const [fileList] = await this.pool.query(
			"SELECT * FROM files WHERE name = ?",
			[fileName]
		);
		return fileList[0];
	}
}

module.exports = new FileQueries(pool);
