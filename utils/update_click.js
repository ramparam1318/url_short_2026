const Url = require("../models/url").Url;

async function update_click(shortCode, info) {
    try {

        visitData = {
            timestamp: new Date(),
            ip: info.ip || '',
            userAgent: info.userAgent || '',
            referrer: info.referrer || '',
        };

        await Url.findOneAndUpdate(
            { shortCode: shortCode },
            {   $inc: { clicks: 1 },
                $push: { visitHistory: visitData }
            },
            { new: true }
        );

        return true;

    } catch (err) {
        console.error("Error updating click data:", err);
        return false;
    }
}

module.exports = update_click;