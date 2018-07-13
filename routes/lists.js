const express = require("express");
const router = express.Router();

const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

//LISTS PAGE
router.get("/", (req, res, next) => {
  res.render("lists/index");
});

module.exports = router;
