const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json({ data: newComment, message: 'Comment created successfully' });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(400).json({ error: 'Failed to create comment', details: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll();

    if (comments.length === 0) {
      res.status(404).json({ error: 'No comments found' });
      return;
    }

    res.status(200).json({ data: comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to retrieve comments', details: error.message });
  }
});

module.exports = router;
