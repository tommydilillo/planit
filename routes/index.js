const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//HOME-PRIVATE
router.get("/home", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("home", { user: req.user });
});

module.exports = router;
