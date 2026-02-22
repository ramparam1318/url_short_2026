async function restrictCreation(req, res, next) {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const currentDate = new Date();
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
    const urlCount = await Url.countDocuments({
        createdBy: user._id,
        createdAt: { $gte: startOfDay, $lt: endOfDay },
    });
    if (urlCount >= 5) {
        return res.status(403).json({ error: 'URL creation limit reached for today' });
    }
    next();
}

module.exports = { restrictCreation };