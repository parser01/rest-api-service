const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

router.get("/list", fileController.getFiles);
router.post("/upload", fileController.uploadFile);
router.put("/update/:id", fileController.updateFile);
router.delete("/delete/:id", fileController.deleteFile);
router.get("/download/:id", fileController.downloadFile);
router.get("/:id", fileController.getFile);

module.exports = router;
