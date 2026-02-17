const Url = require("../models/db").Url;

async function search_url(req, res) {
    const shortCode = req.params.shortCode;

    try {
        const url = await Url.findOne({ shortCode: shortCode });

        if (url) {
            res.json({ originalUrl: url.originalUrl });
        } else {
            res.status(404).json({ error: "Short URL not found" });
        }
    } catch (err) {
        console.error("Error searching URL:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = search_url;