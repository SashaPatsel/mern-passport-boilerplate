//encrypts Oauth keys
require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const keys = require("../keys.js");
const db = require("../models");
const User = require("../models/user.js");
//middleware to encrypt passwords
const bCrypt = require("bcrypt-nodejs");

// Passport session setup
passport.serializeUser(function(user, done) {
    console.log("serialize" + user._id);
    done(null, user._id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    console.log("deserialize" + id);
    User.findById(id).then(function(user) {
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
            User.find({
                email: email
            }).then(function(user) {
                if (user.length > 0) {
                    console.log('signupMessage', 'That email is already taken.');
                    
                    return done(null, false, { message: 'That email is already taken.' });
                } else {
                    const userPassword = generateHash(req.body.password);
                    const newUser = {
                        userName: req.body.userName,
                        email: req.body.email,
                        password: userPassword,
                        authMethod: "local"
                    }
                    User.create(newUser).then(function(dbUser, created) {
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

        const isValidPassword = function(userpass, password) {
            return bCrypt.compareSync(password, userpass);
        }

        User.find({
                email: email
        }).then(function(user) {
            if (user.length > 0) {
                return done(null, false, {
                    message: 'Email does not exist'
                });
            }

            if (!isValidPassword(user.password, password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }

            const userinfo = user.get();
            return done(null, userinfo);


        }).catch(function(err) {
            console.log("Error:", err);
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
        });
    }
));

//passport config for google signin
passport.use(new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: "/auth/google/callback"
    }, function(accessToken, refreshToken, profile, done) {
        console.log("Email" + profile.emails[0].value);
        console.log("ID: " + profile.id);
        console.log("Display name: " + profile.displayName);
        console.log("given name" + profile.name.givenName);
        console.log("google passport callback");

        //done(null, { id: profile.id });
        process.nextTick(function() {
            User.findOne({
                where: {
                    socialID: profile.id
                }
            }).then(function(user) {
                if (user) {
                    console.log('Already signed in.');
                    return done(null, user);
                } else {
                    User.create({
                        userName: profile.displayName,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                        authMethod: "google",
                        socialID: profile.id

                    }).then(function(dbUser, created) {
                        if (!dbUser) {
                            return done(null, false);
                        } else {
                            console.log(dbUser.dataValues);
                            return done(null, dbUser);
                        }
                    })
                }


            })
        });
    }
));

//passport config for facebook signin
passport.use(new FacebookStrategy({
    clientID: keys.facebook.appID,
    clientSecret: keys.facebook.appSecret,
    callbackURL: "/auth/facebook/callback",
    profileFields: ["id", "displayName", "email", "first_name", "last_name"]
}, function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log("ID: " + profile.id);
    console.log("Display name: " + profile.displayName);
    console.log("fb passport callback");


    process.nextTick(function() {
        User.findOne({
            where: {
                socialID: profile.id
            }
        }).then(function(user) {
            if (user) {
                console.log('signupMessage', 'That email is already taken.');
                return done(null, user);
            } else {
                User.create({
                    userName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    authMethod: "facebook",
                    socialID: profile.id

                }).then(function(dbUser, created) {
                    if (!dbUser) {
                        return done(null, false);
                    } else {
                        console.log(dbUser.dataValues);
                        return done(null, dbUser);
                    }
                })
            }
        })
    });

}));

//generate hash for password
function generateHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};