const router = require('express').Router();
const { BlogPost } = require('../../models');

// controllers/api/postRoutes.js
router.post('/', async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json({ data: newBlogPost });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(400).json({ error: 'Failed to create blog post', details: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ error: 'No blog post found with this id' });
      return;
    }

    res.status(200).json({ data: blogPostData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog post', details: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll();

    if (blogPostData.length === 0) {
      res.status(404).json({ error: 'No blog posts found' });
      return;
    }

    res.status(200).json({ data: blogPostData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve blog posts', details: error.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const updatedBlogPost = await BlogPost.update({
      title: req.body.title,
      description: req.body.description,
      public: req.body.public,
      author_id: req.body.author_id,
      date_created: req.body.date_created,
    },
    {
      where: { id: req.body.postId },
    });

    res.status(200).json({ data: updatedBlogPost });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update blog post', details: error.message });
  }
});

module.exports = router;
