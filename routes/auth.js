var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local");



//local auth signup
router.post("/signup", (req, res, next) => {
  passport.authenticate("local-signup", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if(!user) {
      return res.redirect("/");
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
    
      res.cookie("user_id", req.user.dataValues.id);
      res.cookie("user_name", req.user.dataValues.userName);
      return res.redirect("/")
    })
  }) (req, res, next);
});

//local auth sign in
router.post("/signin", (req, res, next) => {
  passport.authenticate("local-signin", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if(!user) {
      return res.redirect("/");
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      
      res.cookie("user_id", req.user.id);
      res.cookie("user_name", req.user.userName);
      return res.redirect("/")
    })
  }) (req, res, next);
});

module.exports = router;