async function login_creation(req, res, next) {

    const cookies = req.cookies;
    const sessionId = cookies.sessionId;
    if (!sessionId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
}

module.exports = { login_creation };