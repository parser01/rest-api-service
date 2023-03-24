const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

router.get("/file/list", fileController.getFiles);
router.post("/file/upload", fileController.uploadFile);
router.put("/file/update/:id", fileController.updateFile);
router.delete("/file/delete/:id", fileController.deleteFile);
router.delete("/file/download/:id", fileController.downloadFile);
router.get("/file/:id", fileController.getFile);

module.exports = router;
