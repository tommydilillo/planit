// routes/auth-routes.js
const express = require("express");
const userRoutes = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

// MY LISTS PAGE DOESN"T SHOW UP WHEN THIS IS ACTIVATED (THIS PAGE WORKS FINE)

// userRoutes.get("/:username", (req, res, next) => {
//   let userId = req.params.username;

//   User.findOne({ username: userId })
//     .then(user => {
//       res.render("user/profile", { user });
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

module.exports = userRoutes;
