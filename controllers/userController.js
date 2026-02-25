const User = require("../models/users.js").User;
const { setUserSession, getUserSession } = require("../service/auth.js");
const { generateSessionId } = require("../utils/generate_sessionid.js");
const { generateToken } = require("../service/auth_jwt.js");

async function handleUserSignup(req, res) {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        else {
            const newUser = new User({ username: username, email, password });
            const ret_save = await User.create(newUser);
            if (!ret_save) {
                return res.status(500).json({ error: 'Failed to create user' });
            }
            res.status(201).json({ message: 'User signed up successfully', username, email });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function handleUserSignin(req, res) {
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        const check_existing_sessionid = getUserSession(user.username);
        const check_existing_jwt = req.headers['authorization']?.split(' ')[1]; //added for jwt
        if (check_existing_sessionid || check_existing_jwt) { //added or condition for jwt
            if (check_existing_jwt) {
                res.cookie('sessionId', check_existing_sessionid, { httpOnly: true });
            }
            if (check_existing_jwt) {
                res.headers['Authorization'] = `Bearer ${check_existing_jwt}`; //added for jwt
            }
            return res.status(200).json({ message: 'User signed in successfully', email, sessionId: check_existing_sessionid });
        }
        else {
            const sessionId = generateSessionId();
            setUserSession(user.username, sessionId);
            res.cookie('sessionId', sessionId, { httpOnly: true });
            const jwtToken = generateToken(user.username); //added for jwt
            res.headers['Authorization'] = `Bearer ${jwtToken}`; //added for jwt
            res.status(200).json({ message: 'User signed in successfully', email, sessionId });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { handleUserSignup, handleUserSignin };