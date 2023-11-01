const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// User Registration
router.post('/signup', async (req, res) => {
    try {
        // Extract user information from the request body
        const { user_name, password } = req.body;

        // Check if the username is already in use
        const existingUser = await User.findOne({ where: { user_name } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already in use' });
        }

        // Create a new user in the database
        const newUser = await User.create({
            user_name,
            password,
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        // Log the error for debugging
        console.error(err);

        // Return an error response with status 500 (Internal Server Error)
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { user_name, password } = req.body;

        // Check if a user with the given username exists
        const userData = await User.findOne({ where: { user_name } });

        if (!userData || !userData.checkPassword(password)) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
