const router = require('express').Router();
const { User, Post, Comment, Like } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
 
});


router.get('/blogs', async (req, res) => {

});


router.get('/blogs/:id', async (req, res) => {

});


router.get('/new-post', withAuth, async (req, res) => {
 
});

module.exports = router;
