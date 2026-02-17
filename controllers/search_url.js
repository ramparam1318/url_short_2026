const Url = require("../models/db").Url;
const update_click = require("../utils/update_click");

async function search_url(req, res) {
    const shortCode = req.params.shortCode;

    try {
        const url = await Url.findOne({ shortCode: shortCode });

        if (url) {
            res.json({ originalUrl: url.originalUrl });
            const ret_code = update_click(shortCode, {
                ip: req.ip,
                userAgent: req.get('User-Agent'),
                referrer: req.get('Referrer') || '',
            });
        } else {
            res.status(404).json({ error: "Short URL not found" });
        }
    } catch (err) {
        console.error("Error searching URL:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = search_url;