const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const session = require("express-session");
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const app = express();
const expressValidator = require("express-validator")
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
// app.use(routes);
require("./routes/api/api.js")(app);

app.use(cookieParser());
// app.use(expressValidator(middlewareOptions));


app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mern");

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});