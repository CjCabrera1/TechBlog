const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const data = await BlogPost.findAll({
      where: { public: true}, 
      include: [
        {
          model: User, 
          foreignKey: 'author_id',
          attributes: ['username']
        }
      ] 
      
    });
    
    const publicPosts = data.map(blogpost => blogpost.dataValues);
    console.log(publicPosts);
    res.render('homePage', {
      publicPosts,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const blogPostData = await User.findByPk(req.session.user_id, {
      include: [
        { 
          model: BlogPost 
        }, 
      ]
    });

    const data = blogPostData.get({ plain: true });
    const blogPosts = data.blogposts
    const username = blogPostData.dataValues.username
    res.render('profile', {
      blogPosts,
      username,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/create', withAuth, async (req, res) => {
  try {
    res.render('create', {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('landingPage');
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findOne({
      where: {
        id: req.params.id,
      },
    });

    const blogPost = blogPostData.get({ plain: true });
    console.log(blogPost);
    res.render('edit', { blogPost, logged_in: req.session.logged_in, user_id: req.session.user_id  });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { 
          model: Comment,
          include: [
            { 
              model: User,
              attributes: ['username']
            }, 
          ] 
        }, 
      ]    
    });

    const blogPost = blogPostData.get({ plain: true });

    res.render('post', { blogPost, logged_in: req.session.logged_in, user_id: req.session.user_id  });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;