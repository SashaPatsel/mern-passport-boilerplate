user= require("../../models/user.js")

module.exports = function(app) {
  app.post("/api/user/signup", function(req, res) {
    user.create(req.body)
  })
}