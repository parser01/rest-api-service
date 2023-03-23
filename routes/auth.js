const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
	"/signup",
	// body("email").isEmail(),
	body("password").isLength({ min: 3, max: 32 }),
	userController.signUp
);
router.post("/signin", userController.signIn);
router.get("/signin/new_token", userController.refresh);
router.get("/logout", userController.logOut);
router.get("/info", authMiddleware, userController.getUser);

module.exports = router;
