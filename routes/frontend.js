
const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const passport = require("passport");
require("../controllers/googleAuth");

const { authGoogleUser } = require("../controllers/userControllers");

const router = express.Router();

router.route("/login-success").get(authGoogleUser);

module.exports = router;
