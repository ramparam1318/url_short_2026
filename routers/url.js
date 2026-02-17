const express = require("express");
const router = express.Router();
const Url = require("../models/db").Url;
const createShortUrl = require("../controllers/gen_url");

router.post("/short", (req, res)=> createShortUrl(req,res) );

module.exports = router;