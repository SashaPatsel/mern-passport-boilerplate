var express = require("express");
var router = express.Router();
var path = require("path");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var GoogleStrategy = require("passport-google-oauth20");
var db = require("../models");

//local auth signup
router.post("/signup", (req, res, next) => {

  passport.authenticate("local-signup", (err, user, info) => {
    //Cookies do not work with these error-catchers, but error-catchers also don't return any errors 🤔
    // if (err) {
    //   return next(err);
    // }

    // if(!user) {
    //   return res.redirect("/");
    // }

    req.login(user, (err) => {
      res.cookie("userName", req.body.userName)
      if (err) {
        console.log("auth error")
        return next(err);
      }
      res.cookie("chickenbaconfarley", "chickenbaconfarley")
      res.cookie("user_name", user.userName);
    })
  })(req, res, next);
});



//local auth sign in
router.post("/signin", (req, res, next) => {
  passport.authenticate("local-signin", (err, user, info) => {
    // if (err) {
    //   return next(err);
    // }

    // if (!user) {
    //   return res.redirect("/");
    // }

    req.login(user, (err) => {
      res.cookie("userName", req.body.email)
      if (err) {
        return next(err);
      }
      res.cookie("chickenbaconfarley", "chickenbaconfarley")
      res.cookie("user_id", req.user.id);
      res.cookie("user_name", req.user.userName);
      return res.redirect("/")
    })
  })(req, res, next);
});

router.get("/logout", function (req, res) {
  console.log("Hello, it's me")
  req.session.destroy(function (err) {
    res.clearCookie("user_id");
    res.clearCookie("userName");
    res.clearCookie("connect.sid");
    res.redirect("/");
    console.log("Hello from the other side.")
  });
});

//auth with google
router.get("/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

//auth google callback
router.get("/google/callback", passport.authenticate('google'), (req, res) => {
  res.cookie("user_id", req.user.dataValues.id);
  res.cookie("user_name", req.user.dataValues.userName);
  return res.redirect("/");
});

//auth with facebook
router.get("/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"]
  })
);

//auth facebook callback
router.get("/facebook/callback", passport.authenticate('facebook'), (req, res) => {
  res.cookie("user_id", req.user.dataValues.id);
  res.cookie("user_name", req.user.dataValues.userName);
  return res.redirect("/");

});

module.exports = router;