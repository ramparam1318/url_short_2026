const jwt = require("jsonwebtoken");
const secretKey = "secret_hai"; // In production, use an environment variable

function generateToken(username) {
    return jwt.sign({ username }, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null;
    }
}

module.exports = { generateToken, verifyToken };