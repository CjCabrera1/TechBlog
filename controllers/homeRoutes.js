const express = require('express');
const router = express.Router();
const { Post, Comment, User } = require('../models');

// Get All Posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['content', 'created_at'],
          include: { model: User, attributes: ['username'] },
        },
      ],
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a Specific Post
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['content', 'created_at'],
          include: { model: User, attributes: ['username'] },
        },
      ],
    });
    if (!post) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a Comment to a Post
router.post('/posts/:id/comments', async (req, res) => {
  try {
    // Create a new comment and associate it with the specified post and user
    const newComment = await Comment.create({
      ...req.body,
      post_id: req.params.id,
      user_id: req.session.userId, // Assuming you're using user sessions
    });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
