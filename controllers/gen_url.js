const generateShortCode = require("../utils/url");
const Url = require("../models/db").Url;

// async function createShortUrl(originalUrl, createdBy) {

async function createShortUrl(req, res) {
    const originalUrl = req.body;

    if (!originalUrl || !originalUrl.user_url) {
        return res.status(400).json({ error: "URL is required" });
    }
    else {
        // if contain http or https then do nothing otherwise add http in front of it
        if (!/^https?:\/\//i.test(originalUrl.user_url)) {
            originalUrl.user_url = originalUrl.user_url.replace(/^[a-z]+:\/\//i, "");
            originalUrl.user_url = "http://" + originalUrl.user_url;
        }

        originalUrl.user_url = originalUrl.user_url.replace(/\/+$/, ""); // Remove trailing slashes

        try {
            const is_exist = await Url.findOne({ originalUrl: originalUrl.user_url });

            if (is_exist) {
                res.json({ shortUrl: is_exist.shortCode });
            }
            else {
                // Ensure the generated short code is unique
                let short_code = generateShortCode(8);
                while (await Url.findOne({ shortCode: short_code })) {
                    short_code = generateShortCode(8);
                }

                const newUrl = new Url({
                    originalUrl: originalUrl.user_url,
                    shortCode: short_code,
                    createdby: originalUrl.createdby || 'anonymous',
                });

                await newUrl.save();

                res.json({ shortUrl: short_code });
            }

        }
        catch (err) {
            console.error("Error checking existing URL:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

}

module.exports = createShortUrl;