const express = require("express");
const router = express.Router();
const createShortUrl = require("../controllers/gen_url");
const search_url = require("../controllers/search_url");

router.get("/:shortCode", (req, res) => search_url(req, res));
router.post("/short", (req, res)=> createShortUrl(req,res) );

module.exports = router;