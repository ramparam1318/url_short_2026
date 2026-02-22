const express = require("express");
const router = express.Router();
const createShortUrl = require("../controllers/gen_url");
const search_url = require("../controllers/search_url");
const { login_creation } = require("../service/login_creation.js");

router.get("/:shortCode", (req, res) => search_url(req, res));
router.post("/short", login_creation, (req, res)=> createShortUrl(req,res) );

module.exports = router;