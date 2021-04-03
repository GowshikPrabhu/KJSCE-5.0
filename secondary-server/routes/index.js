const express = require("express");
const router = express.Router();
const passport = require("passport");
const users = require("./users/users");

const ensureAuthenticated = passport.authenticate("jwt", { session: false });

// User Routes
router
  .post("/user/create", users.create)
  .post("/user/login", users.login)
  .post("/user/logout", users.logout)
  .get("/user/me", ensureAuthenticated, users.me)
  .post("/user/addShip", ensureAuthenticated, users.addShip);

module.exports = router;
