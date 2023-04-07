
const router = require('express').Router();
const { User, Post, Comment, Like } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
      const postData = await Post.findAll({
        include: [{ model: User }, { model: Comment }, { model: Like }],
      });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});


router.get('/blogs', async (req, res) => {
    try {
        const posts = await Post.findAll({
          include: [{ model: User }, { model: Comment }, { model: Like }],
          order: [['createdAt', 'DESC']],
        });
        res.render('blog-list', {
          posts,
          loggedIn: req.session.loggedIn,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});


router.get('/blogs/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
          include: [{ model: User }, { model: Comment, include: User }, { model: Like, include: User }],
        });
        res.render('blog-detail', {
          post,
          loggedIn: req.session.loggedIn,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});


router.get('/new-post', withAuth, async (req, res) => {
    try {
        res.render('new-post', {
          loggedIn: req.session.loggedIn,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    
});

module.exports = router;

