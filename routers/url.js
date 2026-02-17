const express = require("express");
const router = express.Router();
const Url = require("../models/db").Url;

router.post("/short", (req, res) => {
  const originalUrl = req.body;
  if (!originalUrl || !originalUrl.user_url) {
    return res.status(400).json({ error: "URL is required" });
  }
  else {
    // if contain http or https then do nothing otherwise add http in front of it
    if (!/^https?:\/\//i.test(originalUrl.user_url)) {
      originalUrl.user_url = originalUrl.user_url.replace(/^[a-z]+:\/\//i, "");
      originalUrl.user_url = "http://" + originalUrl.user_url;

      console.log(originalUrl.user_url,"======");
      res.send("agli bar se sahi bhejna");
    }
    else { //if http or https is already there
      res.send("shai hai");
      console.log(originalUrl.user_url,"------");
      originalUrl.user_url = originalUrl.user_url;
    }

    originalUrl.user_url = originalUrl.user_url.replace(/\/+$/, ""); // Remove trailing slashes

    Url.findOne({ originalUrl: originalUrl.user_url }, (err, existingUrl) => {
      if (err) {
        console.error("Error checking existing URL:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
    }).then((existingUrl) => {
      if (existingUrl) {
        res.json({ shortUrl: existingUrl.shortUrl });
      } else {
        const newUrl = new Url(originalUrl);
        newUrl.save((err, savedUrl) => {
          if (err) {
            console.error("Error saving URL:", err);
            return res.status(500).json({ error: "Internal server error" });
          }
          res.json({ shortUrl: savedUrl.shortUrl });
        });
      }
    });

    
  }
});

module.exports = router;