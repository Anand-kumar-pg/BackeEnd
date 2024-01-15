const express = require("express");
const { login, register,getUsers } = require("../controllers/userControllers");
const { checkWebToken } = require("../middleWare/auth");

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/get-users").get(checkWebToken,getUsers);

module.exports = router;