const user = require("../../models/user.js")
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


module.exports = function (app) {
  app.post("/signup", passport.authenticate('local'), function (req, res) {
    const userName = req.body.userName
    req.checkBody("userName", "User Name is required").notEmpty()
    req.checkBody("email", "Email is required").notEmpty()
    req.checkBody("email", "Email is not valid").isEmail()
    req.checkBody("password", "Password is require").notEmpty()

    user.create(req.body)
  })
}