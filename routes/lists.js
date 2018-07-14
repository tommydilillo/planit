const express = require("express");
const router = express.Router();
const List = require("../models/list.js");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

//LISTS PAGE
router.get("/", (req, res, next) => {
  res.render("lists/index");
});

// router.get("/", (req, res, next) => {
//   List.find().then(lists => console.log(lists));
//   res.render;
//   "lists/index",
//     { lists }.catch(error => {
//       console.log(error);
//       next();
//     })();
// });

// ADD A NEW LIST
router.get("/add", (req, res, next) => {
  res.render("lists/add");
});

router.post("/add", (req, res, next) => {
  const { name, location, purpose, public } = req.body;
  const newList = new List({ name, location, purpose, public });
  newList
    .save()
    .then(list => {
      res.render("lists/index");
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
