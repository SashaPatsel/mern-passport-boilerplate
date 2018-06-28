const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");
const db = require("../models");
const User = require("../models/user.js");


router.get("/user", (req, res)=>{
  if(req.isAuthenticated()){
    const currentUser = req.session.passport.user;

    // call db and find user by currenUser which is user id
   // get username and email
   console.log("hellur",currentUser)
   User.findOne({_id:currentUser})
   .then(dbUser=>{
     const user = {
      loggedIn: true,
      userName: dbUser.userName,
      email: dbUser.email
     }
    console.log("25", user)
     res.json(user);
   })

  } else {
  const user = {
    loggedIn: false,
    userName: '',
    email: ''
  }
  res.json(user);
}
});

//local auth signup
router.post("/signup", (req, res, next) => {
  passport.authenticate("local-signup", (err, user, info) => {
    if (err) {
      console.log(err)
      return next(err);
    }

    if (!user) {
      console.log("not a user")
      return res.redirect("/");
    }

    req.login(user, (err) => {
      if (err) {
        console.log("auth error")
        return next(err);
      } else {
        res.cookie("userName", req.user.userName);
        res.cookie("email", req.body.email)
        res.cookie("user_id", req.user.id);
        console.log("confrim")
        return res.redirect("/");
      }

    })
  })(req, res, next);
});



//local auth sign in
router.post("/signin", (req, res, next) => {

  passport.authenticate("local-signin", (err, user, info) => {
    if (err) {
      console.log("41", err)
      return next(err);
    }

    if (!user) {
      console.log("not a user")
      req.flash('notify', 'This is a test notification.')
      return res.redirect("/");
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      res.cookie("userName", user[0].userName);
      res.cookie("email", user[0].email)
      res.cookie("user_id", user[0]._id);
      var userI = {username: user[0].userName,
      email: user[0].email}
      //redirect to path containing user id2
      return res.json(userI)
    })
  })(req, res, next);
});

router.get("/logout", function (req, res) {
  console.log("Hello, it's me")
  req.session.destroy(function (err) {
    if (err) {
      console.log(err)
    }
    res.clearCookie("user_id");
    res.clearCookie("userName");
    res.clearCookie("email");
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