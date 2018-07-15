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
  List.find()
    .then(lists => {
      res.render("lists/index", { lists });
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

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
      res.redirect("/lists");
    })
    .catch(error => {
      console.log(error);
    });
});

// LIST DETAIL PAGE

router.get("/list/:id", (req, res, next) => {
  let listId = req.params.id;
  console.log(`listId: ${listId}`);
  if (!/^[0-9a-fA-F]{24}$/.test(listId)) {
    return res.status(404).render("not-found");
  }
  List.findOne({ _id: listId })
    .then(list => {
      console.log(list);
      res.render("lists/list-detail", { list });
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

// console.log(`LISTS: ${lists}`

// // List.findOne({ "/list/_id": listId })

module.exports = router;
