const express = require('express');
const router = express.Router();
const { Users, Posts, Comments, Session } = require('../models');

// Homepage route
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.findAll({
      include: [
        { model: Users },
        { model: Comments, include: Users },
      ],
    });
    res.render('homepage', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Dashboard route
router.get('/dashboard', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const user = await User.findByPk(req.session.userId, {
        include: [Posts], // Corrected from [Post]
      });
      res.render('dashboard', { user });
    } else {
      // Redirect to the login page or display an error message
      res.redirect('/login');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// New Post Form route
router.get('/dashboard/new', (req, res) => {
  if (req.session.loggedIn) {
    res.render('newpost');
  } else {
    // Redirect to the login page or display an error message
    res.redirect('/login');
  }
});

module.exports = router;
