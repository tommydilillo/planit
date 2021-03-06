// routes/auth-routes.js
const express = require("express");
const authRoutes = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const List = require("../models/list");

//SIGNUP ROUTES

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const {
    username,
    password,
    city,
    state,
    country,
    email,
    age,
    avatar
  } = req.body;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username })
    .then(user => {
      if (user !== null) {
        res.render("auth/signup", { message: "The username already exists" });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        password: hashPass,
        city,
        state,
        country,
        email,
        age,
        avatar
      });

      newUser.save(err => {
        if (err) {
          res.render("auth/signup", { message: "Something went wrong" });
        } else {
          res.redirect("/");
        }
      });
    })
    .catch(error => {
      next(error);
    });
});

//LOGIN ROUTES

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

authRoutes.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

//FACEBOOK

authRoutes.get("/auth/facebook", passport.authenticate("facebook"));
authRoutes.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/home",
    failureRedirect: "/"
  })
);

//GOOGLE
authRoutes.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/plus.profile.emails.read"
    ]
  })
);

authRoutes.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/home"
  })
);

//LOGOUT ROUTES
authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//HOME PAGE
authRoutes.get("/home", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  List.find({ public: "true" })
    .then(lists => {
      res.render("home", { lists, user: req.user });
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

module.exports = authRoutes;
