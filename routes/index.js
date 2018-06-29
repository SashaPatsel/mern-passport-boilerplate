const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
// router.route("/").get(function(req, res) {
//   res.send("welcome to nothingness");
// });
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../reactnyt/public/index.html"));
});

module.exports = router;
