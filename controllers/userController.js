const User = require("../models/users.js").User;

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
        res.status(200).json({ message: 'User signed in successfully', email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { handleUserSignup, handleUserSignin };