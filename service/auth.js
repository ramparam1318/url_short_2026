const map_user_id = new Map();

function setUserSession(userId, sessionId) {
    map_user_id.set(userId, sessionId);
}

function getUserSession(userId) {
    return map_user_id.get(userId);
}

module.exports = { setUserSession, getUserSession };