require("dotenv").config();
var passport = require("passport");
var LocalStrategy = require("passport-local");
var keys = require("../keys.js");
var db = require("../models");
var User = require("../models/users");
var bCrypt = require("bcrypt-nodejs");

// Passport session setup
passport.serializeUser(function(user, done) {
    console.log("serialize" + user.id);
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    console.log("deserialize" + id);
    db.User.findById(id).then(function(user) {
        if (user) {
            done(null, user.get());
        } else {
            done(user.errors, null);
        }
    });
});

//passport config for local signup
passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true

    },
    function(req, email, password, done) {
        process.nextTick(function() {
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                // if (err) 
                //     return done(err);

                if (user) {
                    console.log('signupMessage', 'That email is already taken.');
                    return done(null, false, { message: 'That email is already taken.' });
                } else {

                    console.log("firstname" + req.body.firstname);
                    console.log("lastname" + req.body.lastname);
                    console.log("email" + req.body.email);

                    var userPassword = generateHash(password);
                    db.User.create({
                        userName: (req.body.userName),
                        email: req.body.email,
                        password: userPassword,
                        authMethod: "local"
                    }).then(function(dbUser, created) {
                        if (!dbUser) {
                            return done(null, false);
                        } else {
                            return done(null, dbUser);
                        }
                    })
                }
            });

        });
    }
));

//passport config for local signin
passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        var isValidPassword = function(userpass, password) {
            return bCrypt.compareSync(password, userpass);
        }

        db.User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
            if (!user) {
                return done(null, false, {
                    message: 'Email does not exist'
                });
            }

            if (!isValidPassword(user.password, password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }

            var userinfo = user.get();
            return done(null, userinfo);


        }).catch(function(err) {
            console.log("Error:", err);
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
        });
    }
));


//generate hash for password
function generateHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};