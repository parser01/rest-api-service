const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { body } = require("express-validator");

router.post(
	"/signup",
	body("password").isLength({ min: 3, max: 32 }),
	authController.signUp
);
router.post("/signin", authController.signIn);
router.get("/signin/new_token", authController.refresh);
router.get("/logout", authController.logOut);

module.exports = router;
