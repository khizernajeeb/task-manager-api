const express = require("express");
const {
  signup,
  login,
  logoutAllDevices,
  logout,
} = require("../controllers/auth-controller");
const auth = require("../middlewears/auth");

const router = new express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", auth, logout);

router.post("/logout/all", auth, logoutAllDevices);

module.exports = router;
