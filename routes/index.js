const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const List = require("../models/list.js");

//LISTS PAGE
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
