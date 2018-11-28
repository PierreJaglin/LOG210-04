const express = require("express");
let router = express.Router();

const UserController = require("../controllers/userController.js");

const controller = new UserController();

router.post("/signup", controller.user_create);

router.post("/block", controller.user_block);

router.post("/reset", controller.user_reset);

router.put("/password", controller.user_update_password);

router.post("/signin", controller.user_signin);

router.delete("/", controller.user_delete);

router.put("/", controller.user_update);

// GET request for one user
router.get("/", controller.user_detail);

// GET request for list of all users
router.get("/list", controller.user_list);

module.exports = router;
