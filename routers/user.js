const express = require("express");
const router = express.Router();
const { handleUserSignup, handleUserSignin } = require("../controllers/userController.js");

router.post("/signup", handleUserSignup);
router.post("/signin", handleUserSignin);

module.exports = router;