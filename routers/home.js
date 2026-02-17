const express = require("express");
const router = express.Router();
const redirect_url = require("../controllers/redirect_url");

router.get("/:shortCode", (req, res) => redirect_url(req, res));

router.get("/", (req, res) => {
  res.render("home");
});

module.exports = router;