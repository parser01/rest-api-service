const Router = require("express").Router;
const userController = require("../controllers/userController");

const router = new Router();

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.post("/signin/new_token", userController.refresh);

router.get("/info", userController.refresh);
router.get("/logout", userController.logOut);

module.exports = router;
