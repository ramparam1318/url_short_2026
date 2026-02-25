const { verifyToken } = require("./auth_jwt.js");
const { getUserSession } = require("./auth.js");

async function login_creation(req, res, next) {

    const cookies = req.cookies;
    const sessionId = cookies.sessionId;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!sessionId && !token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (sessionId) {
        const userId = getUserSession(sessionId);
        if (!userId) {
            return res.status(401).json({ error: 'Invalid session' });
        }
    }

    if (token) {
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    }

    next();
}

module.exports = { login_creation };