const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);



var createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("B4c0/\/", salt, function (err, hash) {
      // Store hash in your password DB.
      newUser.password = hash
      newUser.save(callback)
    });
  });
}

module.exports = createUser;