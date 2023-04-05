const router = require('express').Router();
const { User, Post, Comment, Like } = require('../models');
const withAuth = require('../utils/auth');




router.post('/users', async (req, res) => {

});

router.post('/login', async (req, res) => {

});

router.post('/posts', withAuth, async (req, res) => {

});


router.get('/posts', async (req, res) => {

});


router.post('/comments', withAuth, async (req, res) => {

});


router.post('/likes', withAuth, async (req, res) => {

});

module.exports = router;
