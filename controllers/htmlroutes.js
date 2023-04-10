const router = require('express').Router();
const { User, Post, Comment, Like } = require('../models');
const withAuth = require('../utils/auth');

// Route to render homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('home', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render individual blog page
router.get('/blogs/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render bloglist page
router.get('/blogs', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('blogList', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render new post page
router.get('/newpost', (req, res) => {
  if (req.session.logged_in) {
    res.render('newPost');
    return;
  }
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/blogs');
    return;
  }
  res.render('loggedIn');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/blogs');
    return;
  }
  res.render('signup');
});

module.exports = router;